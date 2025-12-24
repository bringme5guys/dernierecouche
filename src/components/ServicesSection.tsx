import {
  Sparkles,
  Wind,
  SquareStack,
  LayoutGrid,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Sparkles,
    title: "Nettoyage complet",
    description:
      "Nettoyage intégral de tous les espaces : pièces, couloirs, escaliers, caves et combles.",
  },
  {
    icon: Wind,
    title: "Dépoussiérage fin",
    description:
      "Élimination complète de la poussière de chantier sur toutes les surfaces, y compris les recoins difficiles.",
  },
  {
    icon: SquareStack,
    title: "Nettoyage des sols",
    description:
      "Lavage et lustrage de tous types de sols : carrelage, parquet, béton ciré, moquette.",
  },
  {
    icon: LayoutGrid,
    title: "Vitres et menuiseries",
    description:
      "Nettoyage intérieur et extérieur des fenêtres, baies vitrées et encadrements de portes.",
  },
  {
    icon: ShieldCheck,
    title: "Désinfection",
    description:
      "Désinfection des sanitaires, cuisines et points de contact pour un environnement sain.",
  },
  {
    icon: Trash2,
    title: "Évacuation déchets",
    description:
      "Enlèvement et évacuation des derniers déchets de chantier et emballages.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Nos services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Un nettoyage complet pour une livraison parfaite
          </h2>
          <p className="text-muted-foreground text-lg">
            Nous prenons en charge l'intégralité du nettoyage de fin de chantier
            pour que vous puissiez livrer ou emménager dans des conditions
            impeccables.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 bg-card"
            >
              <CardContent className="p-6 lg:p-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
