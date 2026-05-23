import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const FeaturedMachines = () => {
  const { data: produtos = [], isLoading } = useQuery({
    queryKey: ["featured-produtos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("produtos")
        .select("id, nome, referencia, preco, situacao, imagens, marcas(nome)")
        .order("created_at", { ascending: false })
        .limit(8);
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="section-padding bg-muted" id="maquinas">
      <div className="container-industrial">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-industrial-accent font-heading uppercase tracking-wider">Catálogo</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
            Equipamentos em Destaque
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Confira alguns dos equipamentos usados disponíveis para venda. Injetoras, sopradoras, extrusoras e moldes das melhores marcas.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-xl bg-card border border-border animate-pulse">
                <div className="aspect-[4/3] bg-muted rounded-t-xl" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-5 bg-muted rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {produtos.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
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
                      <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">Sem imagem</div>
                    )}
                    {p.imagens && p.imagens.length > 1 && (
                      <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full font-heading">
                        {p.imagens.length} fotos
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex gap-2 flex-wrap mb-2">
                      {p.marcas?.nome && (
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary font-heading">
                          {p.marcas.nome}
                        </span>
                      )}
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold font-heading ${
                        p.situacao === "Novo" ? "bg-green-100 text-green-700"
                        : p.situacao === "Reformado" ? "bg-amber-100 text-amber-700"
                        : "bg-muted text-muted-foreground"
                      }`}>
                        {p.situacao}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-foreground text-sm line-clamp-2 mb-1">{p.nome}</h3>
                    {p.preco && (
                      <p className="text-sm font-semibold text-primary">
                        R$ {Number(p.preco).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                    )}
                  </div>
                </Link>
                <div className="px-4 pb-4">
                  <Button variant="hero" size="sm" className="w-full" asChild>
                    <a href={`https://wa.me/5511997240711?text=Olá! Tenho interesse: ${p.nome} (Ref: ${p.referencia})`} target="_blank" rel="noopener noreferrer">
                      Solicitar Cotação
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Button variant="outline" size="lg" asChild>
            <Link to="/maquinas">Ver todos os equipamentos</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedMachines;
