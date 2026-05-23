import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight, ArrowLeft, MessageCircle } from "lucide-react";

const MachineDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const { data: produto, isLoading } = useQuery({
    queryKey: ["produto", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("produtos")
        .select("*, departamentos(nome), marcas(nome), parceiros(nome)")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const imagens = produto?.imagens ?? [];

  const prev = () => setActiveImg((i) => (i === 0 ? imagens.length - 1 : i - 1));
  const next = () => setActiveImg((i) => (i === imagens.length - 1 ? 0 : i + 1));

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="section-padding bg-background">
          <div className="container-industrial max-w-5xl">
            <div className="grid md:grid-cols-2 gap-10 animate-pulse">
              <div className="aspect-[4/3] bg-muted rounded-xl" />
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="h-4 bg-muted rounded w-1/3" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!produto) {
    return (
      <>
        <Header />
        <main className="section-padding bg-background text-center">
          <p className="text-muted-foreground">Produto não encontrado.</p>
          <Button onClick={() => navigate("/maquinas")} className="mt-4">Voltar ao catálogo</Button>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEOHead
        title={`${produto.nome} - Magone`}
        description={produto.descricao ?? `${produto.nome} — Ref: ${produto.referencia}`}
        canonical={`/maquinas/${produto.id}`}
      />
      <Header />
      <main className="section-padding bg-background">
        <div className="container-industrial max-w-5xl">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar ao catálogo
          </button>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Galeria */}
            <div className="space-y-3">
              {/* Imagem principal */}
              <div
                className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted cursor-zoom-in border border-border"
                onClick={() => imagens.length > 0 && setLightbox(true)}
              >
                {imagens.length > 0 ? (
                  <img
                    src={imagens[activeImg]}
                    alt={`${produto.nome} - foto ${activeImg + 1}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-muted-foreground">Sem imagem</div>
                )}
                {imagens.length > 1 && (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors">
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <span className="absolute bottom-2 right-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                      {activeImg + 1} / {imagens.length}
                    </span>
                  </>
                )}
              </div>

              {/* Miniaturas */}
              {imagens.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                  {imagens.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`h-16 w-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                        i === activeImg ? "border-primary shadow-md" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <img src={url} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Informações */}
            <div className="space-y-5">
              <div>
                {produto.departamentos?.nome && (
                  <span className="text-xs font-semibold text-industrial-accent uppercase tracking-wider">
                    {produto.departamentos.nome}
                  </span>
                )}
                <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-1">{produto.nome}</h1>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className={`rounded-full px-3 py-1 text-sm font-semibold font-heading ${
                  produto.situacao === "Novo"
                    ? "bg-green-100 text-green-700"
                    : produto.situacao === "Reformado"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {produto.situacao}
                </span>
                {produto.marcas?.nome && (
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary font-heading">
                    {produto.marcas.nome}
                  </span>
                )}
              </div>

              {produto.preco && (
                <p className="text-2xl font-bold text-primary font-heading">
                  R$ {Number(produto.preco).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              )}

              <table className="w-full text-sm border-collapse">
                <tbody>
                  {[
                    { label: "Referência", value: produto.referencia },
                    { label: "Modelo", value: produto.modelo },
                    { label: "Marca", value: produto.marcas?.nome },
                    { label: "Ano", value: produto.ano },
                    { label: "Quantidade", value: produto.quantidade },
                    { label: "Parceiro", value: produto.parceiros?.nome },
                  ]
                    .filter((r) => r.value)
                    .map((row) => (
                      <tr key={row.label} className="border-b border-border">
                        <td className="py-2 pr-4 font-semibold text-foreground w-32">{row.label}</td>
                        <td className="py-2 text-muted-foreground">{String(row.value)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {produto.descricao && (
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-2">Descrição</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{produto.descricao}</p>
                </div>
              )}

              <div className="flex flex-col gap-3 pt-2">
                <Button variant="hero" size="lg" asChild className="w-full">
                  <a
                    href={`https://wa.me/5511997240711?text=Olá! Tenho interesse no produto: ${produto.nome} (Ref: ${produto.referencia})`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" /> Solicitar via WhatsApp
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild className="w-full">
                  <a href={`mailto:magone@magone.com.br?subject=Interesse: ${produto.nome}&body=Ref: ${produto.referencia}`}>
                    Solicitar por E-mail
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox */}
      {lightbox && imagens.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-colors">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <img
            src={imagens[activeImg]}
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-colors">
            <ChevronRight className="h-6 w-6" />
          </button>
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm">
            {activeImg + 1} / {imagens.length} — clique fora para fechar
          </span>
        </div>
      )}

      <Footer />
      <WhatsAppFloat />
    </>
  );
};

export default MachineDetail;
