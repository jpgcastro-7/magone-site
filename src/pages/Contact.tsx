import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SEOHead from "@/components/SEOHead";
import ContactForm from "@/components/ContactForm";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <>
      <SEOHead
        title="Contato - Solicite um Orçamento"
        description="Entre em contato com a Magone. Solicite orçamento de máquinas injetoras, moldes e equipamentos industriais. Telefone, WhatsApp e e-mail."
        canonical="/contato"
      />
      <Header />
      <main>
        <section className="bg-industrial-gradient py-24">
          <div className="container-industrial text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-foreground">Entre em Contato</h1>
            <p className="text-primary-foreground/80 mt-4 text-lg">Solicite um orçamento ou tire suas dúvidas</p>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-industrial">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Form */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Envie sua Mensagem</h2>
                <div className="bg-card rounded-xl p-8 shadow-industrial">
                  <ContactForm />
                </div>
              </motion.div>

              {/* Info */}
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Informações de Contato</h2>
                <div className="space-y-6">
                  {[
                    { icon: Phone, title: "Telefones", lines: ["(11) 3554-6399", "(11) 99724-0711", "(11) 99610-9016 (WhatsApp)"] },
                    { icon: Mail, title: "E-mail", lines: ["magone@magone.com.br"] },
                    { icon: MapPin, title: "Localização", lines: ["São Paulo, SP - Brasil"] },
                    { icon: Clock, title: "Horário de Atendimento", lines: ["Seg a Sex: 8h às 18h", "Sáb: 8h às 12h"] },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-industrial-accent/10 text-industrial-accent">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-foreground">{item.title}</h3>
                        {item.lines.map((line) => (
                          <p key={line} className="text-muted-foreground text-sm">{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map */}
                <div className="mt-10 rounded-xl overflow-hidden shadow-industrial h-64 bg-muted flex items-center justify-center">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467692.0488551706!2d-46.92495865!3d-23.6820635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce448183a461d1%3A0x9ba94b08ff335bae!2sS%C3%A3o%20Paulo%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização Magone em São Paulo"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
};

export default Contact;
