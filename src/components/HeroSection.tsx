import { ArrowDown, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const highlights = [
    "Équipes qualifiées",
    "Délais respectés",
    "Matériel professionnel",
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center gradient-hero pt-20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-8 animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            Nettoyage professionnel pour les entreprises
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
            Société de nettoyage
            <br />
            <span className="text-teal">pour les professionnels</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 animate-fade-in opacity-0" style={{ animationDelay: "0.3s" }}>
            Du chantier à la livraison, des parties communes à l'entrepôt.
            Nous intervenons à Lille et dans tout le Nord pour les entreprises,
            les syndics et les maîtres d'ouvrage.
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10 animate-fade-in opacity-0" style={{ animationDelay: "0.4s" }}>
            {highlights.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-white/90"
              >
                <CheckCircle2 className="w-5 h-5 text-teal" />
                <span className="text-sm md:text-base font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in opacity-0" style={{ animationDelay: "0.5s" }}>
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-teal hover:bg-teal/90 text-white px-8 py-6 text-lg"
            >
              Demander un devis gratuit
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToServices}
              className="bg-white text-navy border-white hover:bg-white/90 px-8 py-6 text-lg"
            >
              Découvrir nos services
            </Button>
          </div>

          {/* Location */}
          <p className="text-white/60 text-sm mt-10 animate-fade-in opacity-0" style={{ animationDelay: "0.6s" }}>
            {site.area.label}
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown className="w-6 h-6" />
      </button>
    </section>
  );
};

export default HeroSection;
