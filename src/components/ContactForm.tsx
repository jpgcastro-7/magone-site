import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-1 font-heading">Nome *</label>
          <Input id="name" name="name" required placeholder="Seu nome completo" />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-foreground mb-1 font-heading">Empresa</label>
          <Input id="company" name="company" placeholder="Nome da empresa" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-1 font-heading">E-mail *</label>
          <Input id="email" name="email" type="email" required placeholder="seu@email.com" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-1 font-heading">Telefone *</label>
          <Input id="phone" name="phone" required placeholder="(11) 99999-9999" />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-1 font-heading">Assunto</label>
        <Input id="subject" name="subject" placeholder="Ex: Orçamento de injetora 200 ton" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-1 font-heading">Mensagem *</label>
        <Textarea id="message" name="message" required rows={5} placeholder="Descreva o que você precisa..." />
      </div>
      <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
        {loading ? "Enviando..." : "Enviar Mensagem"}
      </Button>
    </form>
  );
};

export default ContactForm;
