import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-industrial.jpg";
import moldImg from "@/assets/mold-manufacturing.jpg";
import factoryImg from "@/assets/factory-floor.jpg";

const posts = [
  {
    slug: "como-escolher-maquina-injetora",
    title: "Como Escolher uma Máquina Injetora: Guia Completo",
    excerpt: "Descubra os principais fatores para escolher a máquina injetora ideal para sua produção. Tonelagem, tipo de acionamento, marca e muito mais.",
    image: heroImg,
    date: "2026-03-10",
    category: "Guias",
  },
  {
    slug: "diferenca-injetoras-hidraulicas-eletricas",
    title: "Diferença entre Injetoras Hidráulicas e Elétricas",
    excerpt: "Entenda as vantagens e desvantagens de cada tipo de injetora e descubra qual é a melhor opção para sua indústria.",
    image: moldImg,
    date: "2026-03-05",
    category: "Tecnologia",
  },
  {
    slug: "guia-moldes-injecao-plastica",
    title: "Guia de Moldes para Injeção Plástica",
    excerpt: "Tudo sobre moldes para injeção plástica: tipos, materiais, processos de fabricação e cuidados essenciais para durabilidade.",
    image: factoryImg,
    date: "2026-02-28",
    category: "Moldes",
  },
  {
    slug: "maquinas-usadas-vale-a-pena",
    title: "Máquinas Injetoras Usadas: Vale a Pena?",
    excerpt: "Análise completa sobre as vantagens de adquirir máquinas injetoras usadas e revisadas. Economia sem abrir mão da qualidade.",
    image: heroImg,
    date: "2026-02-20",
    category: "Mercado",
  },
];

const Blog = () => {
  return (
    <>
      <SEOHead
        title="Blog Industrial - Artigos sobre Máquinas Injetoras e Moldes"
        description="Blog da Magone com artigos sobre máquinas injetoras, fabricação de moldes, dicas e guias para a indústria de transformação plástica."
        canonical="/blog"
      />
      <Header />
      <main>
        <section className="bg-industrial-gradient py-24">
          <div className="container-industrial text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-foreground">Blog Industrial</h1>
            <p className="text-primary-foreground/80 mt-4 text-lg">Artigos, guias e novidades do setor de máquinas injetoras e plásticos</p>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-industrial">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group rounded-xl bg-card overflow-hidden shadow-industrial hover:shadow-industrial-elevated transition-all"
                >
                  <Link to={`/blog/${post.slug}`}>
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={post.image} alt={post.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="rounded-full bg-industrial-accent/10 px-3 py-1 text-xs font-semibold text-industrial-accent font-heading">{post.category}</span>
                        <span className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString("pt-BR")}</span>
                      </div>
                      <h2 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-industrial-accent transition-colors">{post.title}</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
};

export default Blog;
