import { MapPin, CheckCircle2 } from "lucide-react";

const cities = [
  "Lille",
  "Roubaix",
  "Tourcoing",
  "Villeneuve-d'Ascq",
  "Marcq-en-Barœul",
  "Lambersart",
  "Wasquehal",
  "Croix",
  "Hem",
  "La Madeleine",
  "Mons-en-Barœul",
  "Mouvaux",
  "Wattrelos",
  "Loos",
  "Hellemmes",
  "Faches-Thumesnil",
  "Ronchin",
  "Seclin",
  "Lesquin",
  "Wattignies",
];

const CoverageSection = () => {
  return (
    <section id="coverage" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              Zone d'intervention
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Lille et toute la métropole lilloise
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Nous intervenons sur l'ensemble de la Métropole Européenne de
              Lille (MEL). Notre équipe se déplace rapidement pour répondre à
              vos besoins de nettoyage de fin de chantier.
            </p>

            {/* Cities Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {cities.slice(0, 12).map((city, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-foreground"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal flex-shrink-0" />
                  <span className="text-sm">{city}</span>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground text-sm mt-6">
              Et plus de 90 autres communes de la MEL...
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-muted to-muted/50 border border-border overflow-hidden">
              {/* Stylized Map Background */}
              <div className="absolute inset-0 opacity-20">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--primary)) 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                  }}
                />
              </div>

              {/* Center Pin */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Pulse Animation */}
                  <div className="absolute inset-0 -m-8 rounded-full bg-teal/20 animate-ping" />
                  <div className="absolute inset-0 -m-4 rounded-full bg-teal/30" />

                  {/* Pin */}
                  <div className="relative w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <MapPin className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
              </div>

              {/* City Labels */}
              <div className="absolute top-1/4 left-1/4 px-3 py-1.5 bg-card rounded-full shadow-md text-xs font-medium text-foreground">
                Roubaix
              </div>
              <div className="absolute top-1/3 right-1/4 px-3 py-1.5 bg-card rounded-full shadow-md text-xs font-medium text-foreground">
                Tourcoing
              </div>
              <div className="absolute bottom-1/3 left-1/3 px-3 py-1.5 bg-card rounded-full shadow-md text-xs font-medium text-foreground">
                Villeneuve
              </div>
              <div className="absolute bottom-1/4 right-1/3 px-3 py-1.5 bg-primary text-primary-foreground rounded-full shadow-md text-xs font-medium">
                Lille
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageSection;
