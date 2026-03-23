import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-industrial-dark text-primary-foreground">
      <div className="container-industrial py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">Magone</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4">
              Há mais de 20 anos conectando você às melhores oportunidades de negócio no mercado de máquinas injetoras, moldes e equipamentos industriais para plástico.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "Sobre a Empresa", href: "/sobre" },
                { label: "Serviços", href: "/servicos" },
                { label: "Máquinas", href: "/maquinas" },
                { label: "Blog", href: "/blog" },
                { label: "Contato", href: "/contato" },
              ].map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-primary-foreground/70 hover:text-industrial-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm">
              {[
                "Compra e Venda de Injetoras",
                "Injetoras para Plástico",
                "Injetoras para Zamak",
                "Fabricação de Moldes",
                "Sopradoras",
                "Extrusoras",
                "Equipamentos Industriais",
              ].map((s) => (
                <li key={s} className="text-primary-foreground/70">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-industrial-accent" />
                <div>
                  <a href="tel:+551135546399" className="text-primary-foreground/70 hover:text-industrial-accent transition-colors block">(11) 3554-6399</a>
                  <a href="tel:+5511996109016" className="text-primary-foreground/70 hover:text-industrial-accent transition-colors block">(11) 9.9610-9016</a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-industrial-accent" />
                <a href="mailto:magone@magone.com.br" className="text-primary-foreground/70 hover:text-industrial-accent transition-colors">magone@magone.com.br</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-industrial-accent" />
                <span className="text-primary-foreground/70">São Paulo, SP - Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} Magone - Máquinas Injetoras e Equipamentos Industriais. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
