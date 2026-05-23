import { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoMagone from "@/assets/logo-magone.png";

const machineCategories = [
  { label: "Todos os Produtos", dept: null },
  { label: "Equipamentos Diversos", dept: "Equipamentos Diversos" },
  { label: "Extrusoras", dept: "Extrusoras" },
  { label: "Fabricação de Moldes", dept: "Fabricação de Moldes" },
  { label: "Injetoras para Plástico", dept: "Injetoras para Plástico", parent: "Injetoras" },
  { label: "Injetoras para Zamak e Alumínio", dept: "Injetoras para Zamak e Alumínio", parent: "Injetoras" },
  { label: "Moldes Brinquedos", dept: "Moldes Brinquedos", parent: "Moldes" },
  { label: "Moldes Industriais", dept: "Moldes Industriais", parent: "Moldes" },
  { label: "Moldes Utilidades Domésticas", dept: "Moldes Utilidades Domésticas", parent: "Moldes" },
  { label: "Negócios & Oportunidades", dept: "Negócios e Oportunidades" },
  { label: "Sopradoras", dept: "Sopradoras" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Onde Estamos", href: "/onde-estamos" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [maquinasOpen, setMaquinasOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const goToMachines = (dept: string | null) => {
    setMaquinasOpen(false);
    setMobileOpen(false);
    if (dept) {
      navigate(`/maquinas?dept=${encodeURIComponent(dept)}`);
    } else {
      navigate("/maquinas");
    }
  };

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
            href="https://wa.me/5511997240711?text=Olá! Gostaria de saber mais sobre máquinas injetoras."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-semibold hover:text-industrial-accent transition-colors"
          >
            WhatsApp: (11) 99724-0711
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-industrial flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoMagone} alt="Magone - Máquinas & Sistemas" className="h-16 md:h-20 w-auto" />
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

          {/* Máquinas dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setMaquinasOpen((v) => !v)}
              onBlur={() => setTimeout(() => setMaquinasOpen(false), 150)}
              className={`flex items-center gap-1 px-4 py-2 rounded-md font-heading text-sm font-semibold transition-colors ${
                location.pathname === "/maquinas"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              Máquinas <ChevronDown className={`h-3.5 w-3.5 transition-transform ${maquinasOpen ? "rotate-180" : ""}`} />
            </button>

            {maquinasOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-card border border-border rounded-xl shadow-industrial-elevated z-50 py-1 overflow-hidden">
                {machineCategories.map((cat) => (
                  <button
                    key={cat.label}
                    onMouseDown={() => goToMachines(cat.dept)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-muted ${
                      cat.parent ? "pl-7 text-muted-foreground hover:text-foreground" : "font-semibold text-foreground"
                    }`}
                  >
                    {cat.parent && <span className="text-muted-foreground mr-1">›</span>}
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button variant="hero" size="lg" asChild className="ml-4">
            <a href="https://wa.me/5511997240711?text=Olá! Gostaria de solicitar um orçamento." target="_blank" rel="noopener noreferrer">
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
          <div className="container-industrial py-4 flex flex-col gap-1">
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

            {/* Máquinas expandível no mobile */}
            <div>
              <button
                onClick={() => setMobileExpanded((v) => !v)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-md font-heading text-sm font-semibold transition-colors ${
                  location.pathname === "/maquinas" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                }`}
              >
                Máquinas
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${mobileExpanded ? "rotate-180" : ""}`} />
              </button>
              {mobileExpanded && (
                <div className="ml-4 border-l-2 border-border pl-2 mt-1 flex flex-col gap-0.5">
                  {machineCategories.map((cat) => (
                    <button
                      key={cat.label}
                      onClick={() => goToMachines(cat.dept)}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors hover:bg-muted ${
                        cat.parent ? "text-muted-foreground pl-5" : "font-semibold text-foreground"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

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
