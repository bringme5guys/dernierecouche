import {
  ArrowRight,
  Building2,
  HardHat,
  ShieldAlert,
  Sparkles,
  Warehouse,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { metiers } from "@/config/site";

/** Une icône par métier, repérée par son identifiant. */
const icons: Record<string, typeof HardHat> = {
  "nettoyage-de-chantier": HardHat,
  "nettoyage-fin-de-chantier": Sparkles,
  "parties-communes": Building2,
  "nettoyages-complexes": ShieldAlert,
  "entrepots-locaux-industriels": Warehouse,
};

const ServicesSection = () => (
  <section id="services" className="section-padding bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
          Nos métiers
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
          Cinq métiers, un seul interlocuteur
        </h2>
        <p className="text-muted-foreground text-lg">
          Du chantier en cours à l'entretien à l'année, nous couvrons la
          propreté de vos locaux et de vos opérations. Chaque métier a ses
          méthodes, son matériel et ses équipes.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {metiers.map((metier) => {
          const Icon = icons[metier.slug] ?? Sparkles;

          const body = (
            <CardContent className="p-6 lg:p-8 h-full flex flex-col">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                {metier.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed flex-1">
                {metier.description}
              </p>
              {metier.path ? (
                <span className="mt-5 inline-flex items-center gap-2 text-primary font-medium">
                  En savoir plus
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              ) : null}
            </CardContent>
          );

          const className =
            "group border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 bg-card h-full";

          return metier.path ? (
            <Link key={metier.slug} to={metier.path} className="h-full">
              <Card className={className}>{body}</Card>
            </Link>
          ) : (
            <Card key={metier.slug} className={className}>
              {body}
            </Card>
          );
        })}
      </div>
    </div>
  </section>
);

export default ServicesSection;
