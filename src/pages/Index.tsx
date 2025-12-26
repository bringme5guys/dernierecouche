import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <title>
          Nettoyage de fin de chantier à Lille | Dernière Couche - Nettoyage
          professionnel
        </title>
        <meta
          name="description"
          content="Dernière Couche, entreprise spécialisée en nettoyage de fin de chantier à Lille et métropole lilloise. Nettoyage après travaux pour professionnels et particuliers. Devis gratuit."
        />
        <meta
          name="keywords"
          content="nettoyage fin de chantier Lille, nettoyage après travaux, entreprise nettoyage chantier Nord, nettoyage professionnel Lille"
        />
        <meta
          property="og:title"
          content="Dernière Couche - Nettoyage professionnel de fin de chantier à Lille"
        />
        <meta
          property="og:description"
          content="Spécialiste du nettoyage de fin de chantier à Lille. Livrez vos chantiers impeccables avec Dernière Couche."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://dernierecouche.fr" />
      </Helmet>

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
