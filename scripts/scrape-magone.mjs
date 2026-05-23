/**
 * Scraper do site magone.com.br
 * Extrai todos os produtos (nome, referência, marca, modelo, ano, preço, descrição, imagens)
 * e faz upload automático para o Supabase (Storage + tabela produtos).
 *
 * Uso:
 *   node scripts/scrape-magone.mjs
 *
 * Pré-requisitos:
 *   npm install node-fetch cheerio @supabase/supabase-js
 *
 * Configure as variáveis de ambiente antes de rodar:
 *   SUPABASE_URL=https://xxxx.supabase.co
 *   SUPABASE_SERVICE_KEY=seu-service-role-key
 */

import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const BASE_URL = "https://www.magone.com.br";

const CATEGORIES = [
  { slug: "injetoras-para-plastico", departamento: "Injetoras para Plástico" },
  { slug: "injetoras-para-zamak-e-aluminio", departamento: "Injetoras para Zamak e Alumínio" },
  { slug: "moldes-brinquedos", departamento: "Moldes Brinquedos" },
  { slug: "moldes-industriais", departamento: "Moldes Industriais" },
  { slug: "moldes-utilidades-domesticas", departamento: "Moldes Utilidades Domésticas" },
  { slug: "sopradoras", departamento: "Sopradoras" },
  { slug: "extrusoras", departamento: "Extrusoras" },
  { slug: "equipamentos-diversos", departamento: "Equipamentos Diversos" },
  { slug: "promocoes", departamento: "Promoções" },
  { slug: "negocios-e-oportunidades", departamento: "Negócios e Oportunidades" },
];

const SUPABASE_URL = "https://utnkmabblqbswlplbsxm.supabase.co";
const SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0bmttYWJibHFic3dscGxic3htIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTQ4MTU5NSwiZXhwIjoyMDk1MDU3NTk1fQ.wakCkcfDHWtKx8LHscPhZGdVc8k1pH9WtT7cksI_jjc";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; scraper/1.0)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} para ${url}`);
  return res.text();
}

/** Retorna todos os product_ids de uma página de listagem */
function extractProductIds(html) {
  const $ = cheerio.load(html);
  const ids = [];
  $("a[href*='product_id=']").each((_, el) => {
    const href = $(el).attr("href") || "";
    const match = href.match(/product_id=(\d+)/);
    if (match && !ids.includes(match[1])) ids.push(match[1]);
  });
  return ids;
}

/** Conta o total de páginas de uma categoria */
function extractTotalPages(html) {
  const $ = cheerio.load(html);
  const paginationText = $(".pagination-results, [class*='result']").text();
  const match = paginationText.match(/(\d+)\s+página/i) || paginationText.match(/of\s+(\d+)/i);
  // Tenta pegar o último link de página
  let maxPage = 1;
  $("ul.pagination a[href*='page=']").each((_, el) => {
    const href = $(el).attr("href") || "";
    const m = href.match(/page=(\d+)/);
    if (m) maxPage = Math.max(maxPage, parseInt(m[1]));
  });
  return maxPage;
}

/** Extrai os dados completos de um produto */
function extractProductData(html, productId, departamento) {
  const $ = cheerio.load(html);

  const nome = $("h1").first().text().trim();
  const descricao = $("#tab-description").text().trim() || $(".product-description").text().trim();

  // Referência
  let referencia = "";
  $("li, .list-unstyled li").each((_, el) => {
    const text = $(el).text();
    if (text.toLowerCase().includes("referência") || text.toLowerCase().includes("referencia")) {
      referencia = text.replace(/referência:?/i, "").trim();
    }
  });

  // Preço
  let preco = null;
  const precoText = $(".price-new, .price, [class*='price']").first().text();
  const precoMatch = precoText.replace(/\./g, "").replace(",", ".").match(/([\d.]+)/);
  if (precoMatch) preco = parseFloat(precoMatch[1]);

  // Modelo, Marca, Ano, Situação via atributos da tabela ou lista
  let modelo = "", marca = "", ano = null, situacao = "Usado";
  $("table tr, .list-unstyled li, ul li").each((_, el) => {
    const text = $(el).text().toLowerCase();
    const rawText = $(el).text();
    if (text.includes("modelo")) modelo = rawText.replace(/modelo:?/i, "").trim();
    if (text.includes("marca")) marca = rawText.replace(/marca:?/i, "").trim();
    if (text.includes("ano")) {
      const anoMatch = rawText.match(/\b(19|20)\d{2}\b/);
      if (anoMatch) ano = parseInt(anoMatch[0]);
    }
    if (text.includes("novo")) situacao = "Novo";
    if (text.includes("reformado")) situacao = "Reformado";
  });

  // Imagens — pega todas as URLs únicas de imagem do produto
  const imagens = [];
  $("a[data-fancybox], img[src*='/image/cache/catalog']").each((_, el) => {
    const src = $(el).attr("href") || $(el).attr("src") || "";
    if (src.includes("/image/cache/catalog") && !imagens.includes(src)) {
      // Prefere versão 500x500
      imagens.push(src.startsWith("http") ? src : BASE_URL + src);
    }
  });

  return { productId, nome, referencia, descricao, modelo, marca, ano, preco, situacao, departamento, imagens };
}

/** Faz upload de uma imagem para o Supabase Storage e retorna a URL pública */
async function uploadImage(imageUrl, referencia, idx) {
  try {
    const res = await fetch(imageUrl);
    if (!res.ok) return null;
    const buffer = Buffer.from(await res.arrayBuffer());
    const ext = imageUrl.split(".").pop().split("?")[0] || "jpg";
    const path = `migrado/${referencia.replace(/\//g, "-")}_${idx}.${ext}`;
    const { error } = await supabase.storage.from("produtos").upload(path, buffer, {
      contentType: `image/${ext === "jpg" ? "jpeg" : ext}`,
      upsert: true,
    });
    if (error) { console.warn(`  ⚠️  Storage error: ${error.message}`); return null; }
    const { data } = supabase.storage.from("produtos").getPublicUrl(path);
    return data.publicUrl;
  } catch (e) {
    console.warn(`  ⚠️  Falha ao fazer upload de imagem: ${e.message}`);
    return null;
  }
}

/** Garante que um departamento existe e retorna seu ID */
const deptCache = {};
async function getOrCreateDepartamento(nome) {
  if (deptCache[nome]) return deptCache[nome];
  let { data } = await supabase.from("departamentos").select("id").eq("nome", nome).single();
  if (!data) {
    const { data: created } = await supabase.from("departamentos").insert({ nome }).select("id").single();
    data = created;
  }
  deptCache[nome] = data?.id;
  return data?.id;
}

/** Garante que uma marca existe e retorna seu ID */
const marcaCache = {};
async function getOrCreateMarca(nome) {
  if (!nome) return null;
  if (marcaCache[nome]) return marcaCache[nome];
  let { data } = await supabase.from("marcas").select("id").eq("nome", nome).single();
  if (!data) {
    const { data: created } = await supabase.from("marcas").insert({ nome }).select("id").single();
    data = created;
  }
  marcaCache[nome] = data?.id;
  return data?.id;
}

async function main() {
  const log = [];
  let totalSalvos = 0;

  for (const cat of CATEGORIES) {
    console.log(`\n📂 Categoria: ${cat.departamento}`);
    const firstPageUrl = `${BASE_URL}/${cat.slug}`;

    let firstHtml;
    try {
      firstHtml = await fetchHtml(firstPageUrl);
    } catch (e) {
      console.warn(`  ⚠️  Falha ao carregar ${firstPageUrl}: ${e.message}`);
      continue;
    }

    const totalPages = extractTotalPages(firstHtml);
    console.log(`   ${totalPages} página(s)`);

    const allProductIds = [];

    for (let page = 1; page <= totalPages; page++) {
      const url = page === 1 ? firstPageUrl : `${firstPageUrl}?page=${page}`;
      const html = page === 1 ? firstHtml : await fetchHtml(url);
      const ids = extractProductIds(html);
      allProductIds.push(...ids);
      await sleep(500);
    }

    const uniqueIds = [...new Set(allProductIds)];
    console.log(`   ${uniqueIds.length} produtos encontrados`);

    for (const productId of uniqueIds) {
      const productUrl = `${BASE_URL}/${cat.slug}?product_id=${productId}`;
      try {
        const html = await fetchHtml(productUrl);
        const produto = extractProductData(html, productId, cat.departamento);

        if (!produto.nome) { console.warn(`  ⚠️  Produto ${productId} sem nome, pulando.`); continue; }

        process.stdout.write(`  📦 ${produto.nome} — fazendo upload de ${produto.imagens.length} imagem(ns)...`);

        // Upload de imagens
        const imagensUrls = [];
        for (let i = 0; i < produto.imagens.length; i++) {
          const url = await uploadImage(produto.imagens[i], produto.referencia || productId, i + 1);
          if (url) imagensUrls.push(url);
          await sleep(200);
        }

        const departamento_id = await getOrCreateDepartamento(cat.departamento);
        const marca_id = await getOrCreateMarca(produto.marca);

        const payload = {
          referencia: produto.referencia || productId,
          nome: produto.nome,
          descricao: produto.descricao || null,
          marca_id,
          modelo: produto.modelo || null,
          ano: produto.ano,
          preco: produto.preco,
          quantidade: 1,
          situacao: produto.situacao,
          departamento_id,
          imagens: imagensUrls,
        };

        const { error } = await supabase.from("produtos").insert(payload);
        if (error) {
          console.log(` ❌ ${error.message}`);
          log.push({ ...payload, erro: error.message });
        } else {
          console.log(` ✅ ${imagensUrls.length} imagem(ns) salvas`);
          totalSalvos++;
        }

        await sleep(600);
      } catch (e) {
        console.warn(`\n  ⚠️  Erro no produto ${productId}: ${e.message}`);
      }
    }
  }

  console.log(`\n✅ Concluído! ${totalSalvos} produtos importados.`);
  if (log.length > 0) {
    fs.writeFileSync("scripts/erros-scraping.json", JSON.stringify(log, null, 2));
    console.log(`⚠️  ${log.length} erros salvos em scripts/erros-scraping.json`);
  }
}

main().catch(console.error);
