import Seo from "@/components/Seo";
import { site, localBusinessJsonLd } from "@/config/site";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import GallerySection from "@/components/GallerySection";
import ClientsSection from "@/components/ClientsSection";
import WhyUsSection from "@/components/WhyUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CoverageSection from "@/components/CoverageSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Seo
        title={`Nettoyage de fin de chantier à Lille | ${site.name}`}
        description={site.description}
        path="/"
        jsonLd={localBusinessJsonLd}
      />

      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <ServicesSection />
          <GallerySection />
          <ClientsSection />
          <WhyUsSection />
          <TestimonialsSection />
          <CoverageSection />
          <FAQSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
