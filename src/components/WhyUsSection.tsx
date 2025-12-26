import { Clock, Award, Wrench, Shield, ThumbsUp, Zap } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Délais respectés",
    description: "Nous nous engageons sur des délais précis pour ne pas retarder vos livraisons.",
  },
  {
    icon: Award,
    title: "Expertise spécialisée",
    description: "Spécialistes exclusifs du nettoyage de fin de chantier depuis des années.",
  },
  {
    icon: Wrench,
    title: "Équipement professionnel",
    description: "Machines et produits de qualité professionnelle pour un résultat optimal.",
  },
  {
    icon: Shield,
    title: "Entreprise assurée",
    description: "RC Pro et garanties complètes pour intervenir en toute sérénité.",
  },
  {
    icon: ThumbsUp,
    title: "Satisfaction garantie",
    description: "Nous repassons gratuitement si le résultat ne vous satisfait pas.",
  },
  {
    icon: Zap,
    title: "Réactivité",
    description: "Intervention rapide sous 48h pour les demandes urgentes.",
  },
];

const WhyUsSection = () => {
  return (
    <section id="why-us" className="section-padding gradient-navy text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-white/90 text-sm font-medium rounded-full mb-4">
            Pourquoi Dernière Couche
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            La garantie d'un travail bien fait
          </h2>
          <p className="text-white/70 text-lg">
            Nous mettons notre expertise et notre rigueur au service de votre
            satisfaction.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-teal/20 flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-6 h-6 text-teal" />
              </div>
              <div>
                <h3 className="text-lg font-display font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
