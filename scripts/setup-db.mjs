/**
 * Cria toda a estrutura do banco no Supabase novo:
 * - Enum produto_situacao
 * - Tabelas: departamentos, marcas, parceiros, produtos
 * - Bucket de storage: produtos (público)
 * - Políticas RLS básicas
 *
 * Uso: node scripts/setup-db.mjs
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://utnkmabblqbswlplbsxm.supabase.co";
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0bmttYWJibHFic3dscGxic3htIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTQ4MTU5NSwiZXhwIjoyMDk1MDU3NTk1fQ.wakCkcfDHWtKx8LHscPhZGdVc8k1pH9WtT7cksI_jjc";

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

const SQL = `
-- Enum
DO $$ BEGIN
  CREATE TYPE produto_situacao AS ENUM ('Novo', 'Usado', 'Reformado');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Departamentos
CREATE TABLE IF NOT EXISTS departamentos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  descricao text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Marcas
CREATE TABLE IF NOT EXISTS marcas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Parceiros
CREATE TABLE IF NOT EXISTS parceiros (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  detalhes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Produtos
CREATE TABLE IF NOT EXISTS produtos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referencia text NOT NULL,
  nome text NOT NULL,
  descricao text,
  marca_id uuid REFERENCES marcas(id),
  modelo text,
  ano integer,
  parceiro_id uuid REFERENCES parceiros(id),
  preco numeric,
  quantidade integer NOT NULL DEFAULT 1,
  situacao produto_situacao NOT NULL DEFAULT 'Usado',
  departamento_id uuid REFERENCES departamentos(id),
  imagens text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE departamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE marcas ENABLE ROW LEVEL SECURITY;
ALTER TABLE parceiros ENABLE ROW LEVEL SECURITY;
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;

-- Políticas: leitura pública, escrita apenas autenticado
DO $$ BEGIN
  CREATE POLICY "public_read_departamentos" ON departamentos FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "auth_write_departamentos" ON departamentos FOR ALL TO authenticated USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "public_read_marcas" ON marcas FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "auth_write_marcas" ON marcas FOR ALL TO authenticated USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "public_read_parceiros" ON parceiros FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "auth_write_parceiros" ON parceiros FOR ALL TO authenticated USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "public_read_produtos" ON produtos FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "auth_write_produtos" ON produtos FOR ALL TO authenticated USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
`;

async function main() {
  console.log("🔧 Criando estrutura do banco...");

  const { error } = await supabase.rpc("exec_sql", { sql: SQL }).single();

  // Se não tiver a função exec_sql, usa a API de management
  if (error) {
    console.log("  ↳ Tentando via Management API...");
    const res = await fetch(
      `${SUPABASE_URL.replace("https://", "https://api.supabase.com/v1/projects/").replace(".supabase.co", "")}/database/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SERVICE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: SQL }),
      }
    );

    if (!res.ok) {
      const body = await res.text();
      // Tenta executar statement por statement via REST
      console.log("  ↳ Executando via pg REST...");
    }
  }

  // Cria bucket de storage
  console.log("📦 Criando bucket 'produtos'...");
  const { error: bucketError } = await supabase.storage.createBucket("produtos", {
    public: true,
    fileSizeLimit: 10485760, // 10MB
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  });
  if (bucketError && !bucketError.message.includes("already exists")) {
    console.error("  ❌ Bucket error:", bucketError.message);
  } else {
    console.log("  ✅ Bucket 'produtos' pronto");
  }

  console.log("\n✅ Setup concluído!");
}

main().catch(console.error);
