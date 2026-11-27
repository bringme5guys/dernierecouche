import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  const { hash } = useLocation();

  // Arrivée depuis une autre page avec une ancre : on rejoint la section.
  useEffect(() => {
    if (!hash) return;
    document
      .getElementById(hash.slice(1))
      ?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return (
    <>
      <Seo
        title={`Société de nettoyage à Lille et dans le Nord | ${site.name}`}
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
