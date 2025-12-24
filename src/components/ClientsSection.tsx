import { Building2, Home, HardHat, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const clientTypes = [
  {
    icon: HardHat,
    title: "Artisans",
    description:
      "Maçons, plâtriers, peintres, électriciens... Livrez vos chantiers dans un état impeccable.",
  },
  {
    icon: Building2,
    title: "Entreprises de construction",
    description:
      "Nous intervenons sur vos chantiers de construction neuve ou rénovation lourde.",
  },
  {
    icon: Users,
    title: "Promoteurs immobiliers",
    description:
      "Préparation des logements pour les visites et remises de clés aux acquéreurs.",
  },
  {
    icon: Home,
    title: "Particuliers",
    description:
      "Après vos travaux de rénovation, profitez d'un logement propre et prêt à vivre.",
  },
];

const ClientsSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Nos clients
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Professionnels et particuliers nous font confiance
          </h2>
          <p className="text-muted-foreground text-lg">
            Que vous soyez un professionnel du bâtiment ou un particulier après
            des travaux, nous adaptons notre intervention à vos besoins.
          </p>
        </div>

        {/* Client Types Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clientTypes.map((client, index) => (
            <Card
              key={index}
              className="text-center border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 bg-card"
            >
              <CardContent className="p-6 lg:p-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <client.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  {client.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {client.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
