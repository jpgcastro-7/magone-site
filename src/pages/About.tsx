import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Shield, Award, Users } from "lucide-react";
import factoryImg from "@/assets/factory-floor.jpg";

const About = () => {
  return (
    <>
      <SEOHead
        title="Sobre a Magone"
        description="Conheça a Magone: desde 2000 anunciando e vendendo equipamentos usados para a indústria plástica. Remunerados somente no sucesso do negócio."
        canonical="/sobre"
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <img src={factoryImg} alt="Fábrica Magone" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-industrial-gradient opacity-90" />
          </div>
          <div className="container-industrial relative z-10 text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-foreground">Sobre a Magone</h1>
            <p className="text-primary-foreground/80 mt-4 text-lg max-w-2xl mx-auto">No mercado desde 2000, conectando você às melhores oportunidades de negócio</p>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-industrial">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">Quem Somos</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>A <strong className="text-foreground">MAGONE Máquinas & Sistemas</strong> atua no mercado desde 2000, sendo referência na divulgação e venda de equipamentos usados para plástico: injetoras, sopradoras, moinhos, moldes e equipamentos diversos.</p>
                  <p>Nossa missão é promover assistência e suporte completo tanto aos clientes compradores quanto aos clientes vendedores de máquinas e sistemas. Atuamos na negociação com mais de <strong className="text-foreground">3 mil clientes em todo o Brasil</strong>, por meio de sólidas parcerias construídas ao longo de décadas.</p>
                  <p>Prestamos consultoria focada em redução de custos, melhorias operacionais e aumento de produtividade, com assessoria técnica detalhada. <strong className="text-foreground">Somos remunerados apenas no sucesso do negócio</strong>, sem gerar nenhum custo para o cliente.</p>
                  <p>Nossa meta é a satisfação garantida do cliente.</p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <img src={factoryImg} alt="Instalações industriais Magone" className="rounded-xl shadow-industrial-elevated" loading="lazy" />
              </motion.div>
            </div>

            <div className="grid sm:grid-cols-3 gap-8 mt-20">
              {[
                { icon: Shield, title: "Confiança", desc: "No mercado desde 2000, com mais de 3 mil clientes em todo o Brasil." },
                { icon: Award, title: "Qualidade", desc: "Máquinas com especificações técnicas detalhadas e garantia de procedência." },
                { icon: Users, title: "Sem custo inicial", desc: "Somos remunerados apenas no sucesso do negócio, sem custo para o cliente." },
              ].map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-industrial-accent/10 text-industrial-accent">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </motion.div>
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

export default About;
