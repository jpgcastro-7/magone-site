import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

const OndeEstamos = () => {
  return (
    <>
      <SEOHead
        title="Onde Estamos - Magone Máquinas & Sistemas"
        description="Encontre a Magone em São Paulo. Rua Patápio Silva, 155 - Conjunto 122, Jardim das Bandeiras. Tel: (11) 3554-6399."
        canonical="/onde-estamos"
      />
      <Header />
      <main>
        <section className="bg-industrial-gradient py-24">
          <div className="container-industrial text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-black text-primary-foreground">Onde Estamos</h1>
            <p className="text-primary-foreground/80 mt-4 text-lg max-w-2xl mx-auto">
              Visite-nos em São Paulo ou entre em contato pelos nossos canais de atendimento
            </p>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-industrial">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Informações de contato */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Informações de Contato</h2>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Endereço</p>
                        <p className="text-muted-foreground mt-1">
                          Rua Patápio Silva, 155 - Conjunto 122<br />
                          CEP: 05436-010 - Jardim das Bandeiras<br />
                          São Paulo - SP
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Telefones</p>
                        <div className="text-muted-foreground mt-1 space-y-1">
                          <p><a href="tel:+551135546399" className="hover:text-primary transition-colors">(11) 3554-6399</a></p>
                          <p><a href="tel:+5511996209016" className="hover:text-primary transition-colors">(11) 9.9620-9016</a></p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <MessageCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">WhatsApp</p>
                        <p className="text-muted-foreground mt-1">
                          <a href="https://wa.me/5511997240711" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                            (11) 9.9724-0711
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">E-mail</p>
                        <p className="text-muted-foreground mt-1">
                          <a href="mailto:magone@magone.com.br" className="hover:text-primary transition-colors">
                            magone@magone.com.br
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Mapa */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden shadow-industrial-elevated border border-border"
              >
                <iframe
                  title="Localização Magone"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197!2d-46.7012!3d-23.5656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zUnVhIFBhdMOhcGlvIFNpbHZhLCAxNTUgLSBKYXJkaW0gZGFzIEJhbmRlaXJhcywgU8OjbyBQYXVsbyAtIFNQ!5e0!3m2!1spt-BR!2sbr!4v1"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
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

export default OndeEstamos;
