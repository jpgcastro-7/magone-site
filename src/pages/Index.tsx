import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import HeroSection from "@/components/HeroSection";
import MachineSearch from "@/components/MachineSearch";
import FeaturedMachines from "@/components/FeaturedMachines";
import ServicesSection from "@/components/ServicesSection";
import BrandsSection from "@/components/BrandsSection";
import DifferentialsSection from "@/components/DifferentialsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  return (
    <>
      <SEOHead
        title="Compra e Venda de Máquinas Injetoras para Plástico"
        description="Magone: compra e venda de máquinas injetoras novas e usadas, fabricação de moldes e equipamentos industriais para plástico. +30 anos de experiência. Solicite um orçamento!"
        canonical="/"
      />

      {/* JSON-LD Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Magone",
        "url": "https://www.magone.com.br",
        "description": "Compra e venda de máquinas injetoras, fabricação de moldes e equipamentos industriais para plástico.",
        "telephone": ["+551135546399", "+5511997240711", "+5511996109016"],
        "email": "magone@magone.com.br",
        "address": { "@type": "PostalAddress", "addressLocality": "São Paulo", "addressRegion": "SP", "addressCountry": "BR" },
        "sameAs": [],
        "areaServed": "BR"
      })}} />

      <Header />
      <main>
        <HeroSection />
        <MachineSearch />
        <FeaturedMachines />
        <ServicesSection />
        <BrandsSection />
        <DifferentialsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
};

export default Index;
