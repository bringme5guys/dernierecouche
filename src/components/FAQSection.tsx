import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quand intervenir pour un nettoyage de fin de chantier ?",
    answer:
      "Nous intervenons une fois que tous les travaux sont terminés : peinture sèche, sols posés, sanitaires installés. C'est la dernière étape avant la livraison ou l'emménagement. Idéalement, prévoyez notre intervention 2 à 3 jours avant la date de remise des clés.",
  },
  {
    question: "Comment est calculé le prix d'une prestation ?",
    answer:
      "Le tarif dépend de plusieurs facteurs : la surface à nettoyer, le type de chantier (neuf ou rénovation), l'état de propreté initial et les prestations demandées. Nous réalisons un devis gratuit après visite ou sur photos pour vous proposer un prix juste et transparent.",
  },
  {
    question: "Combien de temps dure une intervention ?",
    answer:
      "La durée varie selon la surface et l'état du chantier. En moyenne, comptez une journée pour un appartement de 60 à 80m², et 2 à 3 jours pour une maison individuelle. Nous adaptons notre équipe pour respecter vos délais.",
  },
  {
    question: "Quels produits et équipements utilisez-vous ?",
    answer:
      "Nous utilisons du matériel professionnel : autolaveuses, monobrosses, aspirateurs industriels, nettoyeurs vapeur. Nos produits sont efficaces et respectueux des surfaces. Nous adaptons notre équipement au type de sols et de finitions de votre chantier.",
  },
  {
    question: "Intervenez-vous le week-end ou en urgence ?",
    answer:
      "Oui, nous pouvons intervenir le samedi et proposons un service d'intervention rapide sous 48h pour les demandes urgentes. Des frais supplémentaires peuvent s'appliquer pour ces prestations.",
  },
  {
    question: "Que faire si le résultat ne me satisfait pas ?",
    answer:
      "Votre satisfaction est notre priorité. Si vous constatez un oubli ou un défaut, nous repassons gratuitement dans les 48h pour corriger. Nous vous accompagnons jusqu'à la livraison parfaite de votre chantier.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="section-padding bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Questions fréquentes
          </h2>
          <p className="text-muted-foreground text-lg">
            Tout ce que vous devez savoir sur nos prestations de nettoyage de
            fin de chantier.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left text-foreground font-medium hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
