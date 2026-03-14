import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SEOHead from "@/components/SEOHead";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import moldImg from "@/assets/mold-manufacturing.jpg";
import heroImg from "@/assets/hero-industrial.jpg";

const serviceData: Record<string, { title: string; h1: string; description: string; metaDesc: string; benefits: string[]; image: string }> = {
  "compra-venda-injetoras": {
    title: "Compra e Venda de Máquinas Injetoras",
    h1: "Compra e Venda de Máquinas Injetoras",
    description: "A Magone é especialista em compra e venda de máquinas injetoras novas e usadas. Com mais de 30 anos de experiência no mercado, oferecemos as melhores marcas com garantia de procedência e funcionamento. Realizamos avaliação técnica completa, negociação transparente e logística para todo o Brasil. Se você precisa comprar uma injetora ou vender equipamentos ociosos, somos a melhor opção do mercado.",
    metaDesc: "Compra e venda de máquinas injetoras novas e usadas. Melhores marcas: Engel, Haitian, Romi, Borche. +30 anos de experiência. Solicite orçamento!",
    benefits: ["Máquinas revisadas com garantia", "Melhores marcas mundiais", "Avaliação técnica completa", "Logística para todo o Brasil", "Condições de pagamento flexíveis", "Suporte pós-venda"],
    image: heroImg,
  },
  "injetoras-plastico": {
    title: "Injetoras para Plástico",
    h1: "Injetoras para Plástico",
    description: "Fornecemos injetoras de plástico de alta performance para produção de peças plásticas com máxima precisão e eficiência. Trabalhamos com máquinas hidráulicas, elétricas e híbridas das principais marcas do mercado. Nossas injetoras atendem desde pequenas produções até linhas industriais de grande escala.",
    metaDesc: "Injetoras para plástico de alta performance. Máquinas hidráulicas, elétricas e híbridas. Melhores marcas com garantia. Solicite orçamento!",
    benefits: ["Injetoras hidráulicas e elétricas", "Alta precisão dimensional", "Economia de energia", "Versatilidade de materiais", "Manutenção facilitada", "Controle avançado de processo"],
    image: heroImg,
  },
  "injetoras-zamak-aluminio": {
    title: "Injetoras para Zamak e Alumínio",
    h1: "Injetoras para Zamak e Alumínio",
    description: "Máquinas injetoras especializadas para fundição de zamak e alumínio sob pressão. Equipamentos de alta qualidade para produção de peças metálicas com acabamento superior e repetibilidade dimensional. Ideais para indústrias automotivas, eletroeletrônicas e de utilidades domésticas.",
    metaDesc: "Injetoras para zamak e alumínio. Máquinas para fundição sob pressão com alta qualidade. Solicite orçamento!",
    benefits: ["Fundição de alta precisão", "Acabamento superior", "Alta produtividade", "Longa vida útil", "Baixo custo operacional", "Peças com excelente resistência"],
    image: moldImg,
  },
  "fabricacao-moldes": {
    title: "Fabricação de Moldes para Injeção Plástica",
    h1: "Fabricação de Moldes para Injeção Plástica",
    description: "Projetamos e fabricamos moldes para injeção plástica com alta precisão dimensional e qualidade superior. Utilizamos tecnologia CNC de última geração e softwares avançados de projeto para garantir a perfeita reprodução das peças. Atendemos diversos segmentos industriais com soluções sob medida.",
    metaDesc: "Fabricação de moldes para injeção plástica. Projeto e execução com tecnologia CNC. Alta precisão dimensional. Solicite orçamento!",
    benefits: ["Projeto 3D avançado", "Usinagem CNC de precisão", "Materiais de alta qualidade", "Prazos competitivos", "Testes e ajustes inclusos", "Manutenção preventiva"],
    image: moldImg,
  },
  "sopradoras": {
    title: "Sopradoras Industriais",
    h1: "Sopradoras para Indústria Plástica",
    description: "Máquinas sopradoras para fabricação de embalagens plásticas, frascos, galões e recipientes. Oferecemos sopradoras de extrusão e injeção-sopro das melhores marcas, com capacidades variadas para atender desde pequenas até grandes produções.",
    metaDesc: "Sopradoras industriais para fabricação de embalagens plásticas. Máquinas novas e usadas. Solicite orçamento!",
    benefits: ["Alta velocidade de produção", "Versatilidade de volumes", "Baixo consumo energético", "Troca rápida de moldes", "Controle preciso de espessura", "Produção contínua"],
    image: heroImg,
  },
  "extrusoras": {
    title: "Extrusoras Industriais",
    h1: "Extrusoras para Indústria Plástica",
    description: "Extrusoras para produção contínua de perfis, tubos, chapas, filmes e diversos produtos plásticos. Trabalhamos com extrusoras mono-rosca e dupla-rosca para diferentes aplicações industriais.",
    metaDesc: "Extrusoras industriais para perfis, tubos e chapas plásticas. Máquinas novas e usadas com garantia. Solicite orçamento!",
    benefits: ["Produção contínua", "Versatilidade de produtos", "Alta eficiência energética", "Controle preciso de temperatura", "Fácil operação", "Baixa manutenção"],
    image: moldImg,
  },
  "equipamentos-industriais": {
    title: "Equipamentos Industriais para Plástico",
    h1: "Equipamentos Industriais Diversos",
    description: "Fornecemos uma ampla linha de equipamentos periféricos e auxiliares para a indústria de transformação plástica: moinhos, secadores, dosadores, esteiras, robôs, termorreguladores, chillers e muito mais.",
    metaDesc: "Equipamentos industriais para plástico: moinhos, secadores, dosadores, robôs e periféricos. Solicite orçamento!",
    benefits: ["Linha completa de periféricos", "Melhores marcas", "Assistência técnica", "Instalação inclusa", "Treinamento operacional", "Peças de reposição"],
    image: heroImg,
  },
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = serviceData[slug || ""] || serviceData["compra-venda-injetoras"];

  return (
    <>
      <SEOHead title={service.title} description={service.metaDesc} canonical={`/servicos/${slug}`} />
      <Header />
      <main>
        <section className="bg-industrial-gradient py-24">
          <div className="container-industrial text-center">
            <h1 className="font-heading text-3xl md:text-5xl font-black text-primary-foreground">{service.h1}</h1>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-industrial">
            <div className="grid lg:grid-cols-2 gap-16">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <img src={service.image} alt={service.title} className="rounded-xl shadow-industrial-elevated w-full" loading="lazy" />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Descrição do Serviço</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">{service.description}</p>

                <h3 className="font-heading text-xl font-bold text-foreground mb-4">Benefícios</h3>
                <ul className="space-y-3">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-foreground">
                      <span className="h-2 w-2 rounded-full bg-industrial-accent shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex gap-4">
                  <Button variant="hero" size="lg" asChild>
                    <a href="/contato">Solicitar Orçamento</a>
                  </Button>
                  <Button variant="whatsapp" size="lg" asChild>
                    <a href="https://wa.me/5511997240711" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-muted">
          <div className="container-industrial max-w-2xl">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6 text-center">Solicite um Orçamento</h2>
            <div className="bg-card rounded-xl p-8 shadow-industrial">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
};

export default ServiceDetail;
