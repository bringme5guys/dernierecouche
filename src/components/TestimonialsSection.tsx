import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Jean-Pierre M.",
    role: "Entrepreneur en bâtiment",
    company: "BTP Lillois",
    content:
      "Dernière Couche intervient sur tous nos chantiers depuis 2 ans. Travail impeccable, équipes ponctuelles et professionnelles. Je recommande vivement.",
    rating: 5,
  },
  {
    name: "Marie D.",
    role: "Particulière",
    location: "Villeneuve-d'Ascq",
    content:
      "Après la rénovation complète de notre maison, Dernière Couche a fait un travail remarquable. Plus une trace de poussière, tout était parfait pour notre emménagement.",
    rating: 5,
  },
  {
    name: "Thomas L.",
    role: "Directeur de programmes",
    company: "Nexity Nord",
    content:
      "Des professionnels sérieux qui comprennent nos contraintes de délais. La qualité de leur prestation nous permet de livrer nos acquéreurs dans les meilleures conditions.",
    rating: 5,
  },
  {
    name: "Sophie R.",
    role: "Architecte d'intérieur",
    company: "Studio SR Design",
    content:
      "Je fais appel à Dernière Couche pour tous mes projets de rénovation. Leur attention au détail est remarquable et mes clients sont toujours satisfaits du résultat final.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Témoignages
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Ils nous font confiance
          </h2>
          <p className="text-muted-foreground text-lg">
            Découvrez les retours de nos clients professionnels et particuliers.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card border-border/50 hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6 lg:p-8">
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-primary/20 mb-4" />

                {/* Content */}
                <p className="text-foreground leading-relaxed mb-6 text-lg">
                  "{testimonial.content}"
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                      {testimonial.company && ` • ${testimonial.company}`}
                      {testimonial.location && ` • ${testimonial.location}`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
