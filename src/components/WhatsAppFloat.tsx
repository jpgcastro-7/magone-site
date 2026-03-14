import { MessageCircle } from "lucide-react";

const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/5511997240711?text=Olá! Gostaria de saber mais sobre máquinas injetoras."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-industrial-success px-5 py-3 text-primary-foreground font-heading font-bold shadow-lg transition-all hover:scale-110 hover:shadow-xl"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
};

export default WhatsAppFloat;
