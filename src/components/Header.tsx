import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoMagone from "@/assets/logo-magone.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Máquinas", href: "/maquinas" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card shadow-industrial">
      {/* Top bar */}
      <div className="bg-industrial-dark">
        <div className="container-industrial flex items-center justify-between py-2 text-sm text-primary-foreground">
          <div className="flex items-center gap-4">
            <a href="tel:+551135546399" className="flex items-center gap-1 hover:text-industrial-accent transition-colors">
              <Phone className="h-3 w-3" /> (11) 3554-6399
            </a>
            <a href="mailto:magone@magone.com.br" className="hidden sm:flex items-center gap-1 hover:text-industrial-accent transition-colors">
              <Mail className="h-3 w-3" /> magone@magone.com.br
            </a>
          </div>
          <a
            href="https://wa.me/5511996109016?text=Olá! Gostaria de saber mais sobre máquinas injetoras."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-semibold hover:text-industrial-accent transition-colors"
          >
            WhatsApp: (11) 99610-9016
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-industrial flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoMagone} alt="Magone - Máquinas Injetoras e Moldes" className="h-12 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 rounded-md font-heading text-sm font-semibold transition-colors ${
                location.pathname === link.href
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button variant="hero" size="lg" asChild className="ml-4">
            <a href="https://wa.me/5511996109016?text=Olá! Gostaria de solicitar um orçamento." target="_blank" rel="noopener noreferrer">
              Solicitar Orçamento
            </a>
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-border bg-card animate-fade-in">
          <div className="container-industrial py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-md font-heading text-sm font-semibold transition-colors ${
                  location.pathname === link.href
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="hero" size="lg" asChild className="mt-2">
              <a href="https://wa.me/5511997240711" target="_blank" rel="noopener noreferrer">
                Solicitar Orçamento
              </a>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
