import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Search, ChevronDown, ChevronRight } from "lucide-react";

const MENU = [
  { label: "Equipamentos Diversos", dept: "Equipamentos Diversos" },
  { label: "Extrusoras", dept: "Extrusoras" },
  { label: "Fabricação de Moldes", dept: "Fabricação de Moldes" },
  {
    label: "Injetoras",
    children: [
      { label: "Injetoras para Plástico", dept: "Injetoras para Plástico" },
      { label: "Injetoras para Zamak e Alumínio", dept: "Injetoras para Zamak e Alumínio" },
    ],
  },
  {
    label: "Moldes",
    children: [
      { label: "Moldes Brinquedos", dept: "Moldes Brinquedos" },
      { label: "Moldes Industriais", dept: "Moldes Industriais" },
      { label: "Moldes Utilidades Domésticas", dept: "Moldes Utilidades Domésticas" },
    ],
  },
  { label: "Negócios & Oportunidades", dept: "Negócios e Oportunidades" },
  { label: "Sopradoras", dept: "Sopradoras" },
];

const Machines = () => {
  const [searchParams] = useSearchParams();
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string[]>(["Injetoras", "Moldes"]);

  useEffect(() => {
    const dept = searchParams.get("dept");
    setSelectedDept(dept || null);
  }, [searchParams]);

  const { data: produtos = [], isLoading } = useQuery({
    queryKey: ["produtos-publicos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("produtos")
        .select("*, departamentos(nome), marcas(nome)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filtered = produtos.filter((p) => {
    const matchDept = !selectedDept || p.departamentos?.nome === selectedDept;
    const matchSearch =
      !search ||
      p.nome.toLowerCase().includes(search.toLowerCase()) ||
      p.referencia.toLowerCase().includes(search.toLowerCase()) ||
      p.marcas?.nome?.toLowerCase().includes(search.toLowerCase());
    return matchDept && matchSearch;
  });

  const toggleExpand = (label: string) => {
    setExpanded((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  return (
    <>
      <SEOHead
        title="Catálogo de Máquinas Injetoras e Equipamentos"
        description="Confira nosso catálogo de equipamentos usados: injetoras, sopradoras, extrusoras e moldes das melhores marcas. Solicite cotação!"
        canonical="/maquinas"
      />
      <Header />
      <main>
        <section className="bg-industrial-gradient py-16">
          <div className="container-industrial text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-foreground">Catálogo de Máquinas</h1>
            <p className="text-primary-foreground/80 mt-4 text-lg">Encontre a máquina ideal para sua indústria</p>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-industrial">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* Sidebar */}
              <aside className="lg:w-56 shrink-0">
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="bg-primary px-4 py-3">
                    <span className="font-heading font-bold text-primary-foreground text-sm uppercase tracking-wider">Categorias</span>
                  </div>
                  <nav className="py-2">
                    <button
                      onClick={() => setSelectedDept(null)}
                      className={`w-full text-left px-4 py-2 text-sm font-semibold transition-colors ${
                        selectedDept === null ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                      }`}
                    >
                      Todos os Produtos
                    </button>
                    {MENU.map((item) =>
                      item.children ? (
                        <div key={item.label}>
                          <button
                            onClick={() => toggleExpand(item.label)}
                            className="w-full flex items-center justify-between px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                          >
                            {item.label}
                            {expanded.includes(item.label) ? (
                              <ChevronDown className="h-3.5 w-3.5" />
                            ) : (
                              <ChevronRight className="h-3.5 w-3.5" />
                            )}
                          </button>
                          {expanded.includes(item.label) && (
                            <div className="bg-muted/40">
                              {item.children.map((child) => (
                                <button
                                  key={child.dept}
                                  onClick={() => setSelectedDept(child.dept)}
                                  className={`w-full text-left pl-7 pr-4 py-2 text-sm transition-colors ${
                                    selectedDept === child.dept
                                      ? "bg-primary/10 text-primary font-semibold"
                                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                  }`}
                                >
                                  {child.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <button
                          key={item.dept}
                          onClick={() => setSelectedDept(item.dept!)}
                          className={`w-full text-left px-4 py-2 text-sm font-semibold transition-colors ${
                            selectedDept === item.dept
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-muted"
                          }`}
                        >
                          {item.label}
                        </button>
                      )
                    )}
                  </nav>
                </div>
              </aside>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome, referência ou marca..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>

                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="rounded-xl bg-card border border-border animate-pulse">
                        <div className="aspect-[4/3] bg-muted rounded-t-xl" />
                        <div className="p-5 space-y-3">
                          <div className="h-4 bg-muted rounded w-1/3" />
                          <div className="h-5 bg-muted rounded w-3/4" />
                          <div className="h-4 bg-muted rounded w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="text-center py-20 text-muted-foreground">
                    <p className="text-lg">Nenhum produto encontrado.</p>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground mb-4">{filtered.length} produto(s) encontrado(s)</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                      <AnimatePresence>
                        {filtered.map((p, i) => (
                          <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: i * 0.03 }}
                            className="group rounded-xl bg-card overflow-hidden shadow-industrial hover:shadow-industrial-elevated transition-all border border-border"
                          >
                            <Link to={`/maquinas/${p.id}`} className="block">
                              <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                                {p.imagens && p.imagens.length > 0 ? (
                                  <img
                                    src={p.imagens[0]}
                                    alt={p.nome}
                                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                  />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">
                                    Sem imagem
                                  </div>
                                )}
                                {p.imagens && p.imagens.length > 1 && (
                                  <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full font-heading">
                                    {p.imagens.length} fotos
                                  </span>
                                )}
                              </div>
                              <div className="p-5">
                                <div className="flex gap-2 flex-wrap mb-2">
                                  {p.marcas?.nome && (
                                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary font-heading">
                                      {p.marcas.nome}
                                    </span>
                                  )}
                                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold font-heading ${
                                    p.situacao === "Novo"
                                      ? "bg-green-100 text-green-700"
                                      : p.situacao === "Reformado"
                                      ? "bg-amber-100 text-amber-700"
                                      : "bg-muted text-muted-foreground"
                                  }`}>
                                    {p.situacao}
                                  </span>
                                </div>
                                <h3 className="font-heading font-bold text-foreground mb-1 line-clamp-2">{p.nome}</h3>
                                <p className="text-xs text-muted-foreground mb-1">Ref: {p.referencia}</p>
                                {p.preco && (
                                  <p className="text-sm font-semibold text-primary mb-3">
                                    R$ {Number(p.preco).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                  </p>
                                )}
                              </div>
                            </Link>
                            <div className="px-5 pb-5">
                              <Button variant="hero" size="sm" className="w-full" asChild>
                                <a
                                  href={`https://wa.me/5511997240711?text=Olá! Tenho interesse no produto: ${p.nome} (Ref: ${p.referencia})`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Solicitar Cotação
                                </a>
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
};

export default Machines;
