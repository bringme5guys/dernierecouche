import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Droplets,
  LayoutGrid,
  Phone,
  SquareStack,
  Trash2,
  Wind,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import Seo from "@/components/Seo";
import { site } from "@/config/site";

const PATH = "/services/nettoyage-fin-de-chantier";

const TITLE =
  "Nettoyage de fin de chantier à Lille et dans le Nord | Dernière Couche";

const DESCRIPTION =
  "Nettoyage de fin de chantier à Lille et dans le Nord : évacuation des déchets, poussières fines, voile de ciment, vitrerie. Devis gratuit, intervention sous 48h en urgence.";

/** Le détail de la prestation, poste par poste. */
const prestations = [
  {
    icon: Trash2,
    title: "Déchets et gravats",
    body: "Cartons, chutes de matériaux, emballages, bâches et films de protection, gravats résiduels. Nous trions et évacuons en filière professionnelle. Le volume à sortir est souvent ce qui surprend le plus en fin de chantier.",
  },
  {
    icon: Wind,
    title: "Poussières fines",
    body: "Aspiration à filtration HEPA des sols, plinthes, radiateurs, grilles de ventilation, interrupteurs et recoins. La poussière de plâtre et de ciment se redépose pendant des jours : l'ordre des passages compte autant que le passage lui-même.",
  },
  {
    icon: SquareStack,
    title: "Sols et surfaces",
    body: "Retrait du voile de ciment et de la laitance, décapage, élimination des projections de peinture, d'enduit, de colle et de silicone. Le protocole change selon le revêtement : carrelage, parquet, béton ciré, vinyle ou résine ne se traitent pas de la même façon.",
  },
  {
    icon: LayoutGrid,
    title: "Vitrerie et menuiseries",
    body: "Grattage des étiquettes, projections et résidus de silicone, puis lavage des vitres, baies, châssis, rails et appuis. C'est le poste sur lequel une livraison se juge à l'œil nu.",
  },
  {
    icon: Droplets,
    title: "Sanitaires et cuisines",
    body: "Dépose des films de protection, détartrage, désinfection des points de contact, robinetterie et plans de travail. Les pièces d'eau sont les premières inspectées lors d'une réception.",
  },
  {
    icon: ClipboardCheck,
    title: "Finitions",
    body: "Poignées, interrupteurs, plinthes, intérieurs de placards, seuils de porte. Les détails que personne ne remarque quand ils sont faits, et que tout le monde voit quand ils ne le sont pas.",
  },
];

/** Trois prestations que les donneurs d'ordre confondent souvent. */
const distinctions = [
  {
    title: "Nettoyage de chantier",
    when: "Pendant les travaux",
    body: "Balayage et évacuation au fil des corps d'état, entretien de la base vie, dégagement des circulations. Il garde le chantier praticable et sûr, il ne remplace pas la prestation de livraison.",
  },
  {
    title: "Nettoyage de fin de chantier",
    when: "Avant la réception",
    body: "Le nettoyage de livraison, celui décrit sur cette page. Il intervient une fois tous les corps d'état sortis, pour que le bien soit remis prêt à habiter ou à exploiter.",
  },
  {
    title: "Remise en état",
    when: "Après coup",
    body: "Pour un bien resté inoccupé, un chantier ancien mal nettoyé, ou un logement rendu en mauvais état. L'encrassement est installé : le traitement est plus lourd qu'une fin de chantier classique.",
  },
];

/** Ce qui fait réellement varier un devis. */
const facteursPrix = [
  "La surface à traiter, et surtout le nombre de pièces et de niveaux",
  "Le type de chantier : une construction neuve ne s'encrasse pas comme une rénovation lourde",
  "Le niveau d'encrassement, qui dépend des corps d'état passés en dernier",
  "Le volume de déchets et de gravats à évacuer",
  "L'accès : étage, ascenseur disponible ou non, stationnement, horaires imposés",
  "Le délai, et notamment une intervention en urgence ou un samedi",
];

const etapes = [
  {
    step: "1",
    title: "Vous décrivez le chantier",
    body: "Type de travaux, surface approximative, adresse et date de livraison visée. Quelques photos suffisent souvent à cadrer le besoin.",
  },
  {
    step: "2",
    title: "Nous évaluons",
    body: "Visite sur place quand le chantier le justifie, sinon sur la base de vos éléments. C'est à ce moment que se décident le nombre d'intervenants et la durée.",
  },
  {
    step: "3",
    title: "Devis gratuit",
    body: "Un prix ferme, le détail des postes couverts et la date d'intervention. Sans engagement.",
  },
  {
    step: "4",
    title: "Intervention et contrôle",
    body: "Nos équipes interviennent, puis nous passons en revue le résultat avec vous. Si un point ne va pas, nous repassons gratuitement sous 48 heures.",
  },
];

const clients = [
  "Entreprises générales du bâtiment",
  "Promoteurs et maîtres d'ouvrage",
  "Artisans et corps d'état techniques",
  "Architectes et maîtres d'œuvre",
  "Syndics, bailleurs et agences",
  "Particuliers en fin de rénovation",
];

const faq = [
  {
    q: "L'eau et l'électricité doivent-elles être raccordées ?",
    a: "C'est préférable et cela change la méthode. Sans alimentation sur place, nous intervenons avec notre propre matériel et notre réserve d'eau, mais le rendement baisse et la prestation est plus longue. Signalez-le dès la demande de devis : cela évite une mauvaise surprise le jour J.",
  },
  {
    q: "Qui évacue les déchets, vous ou nous ?",
    a: "Nous. Le tri et l'évacuation en filière professionnelle font partie de la prestation. Si le chantier a laissé un volume important de gravats, il est chiffré à part car il relève de la benne, pas du nettoyage.",
  },
  {
    q: "Pouvez-vous intervenir par lots ou par étages ?",
    a: "Oui, c'est même la norme sur les opérations livrées par tranches. Nous calons le phasage sur votre planning de réception plutôt que l'inverse.",
  },
  {
    q: "Et si un corps d'état repasse après notre intervention ?",
    a: "Cela arrive, et c'est précisément pourquoi le nettoyage de livraison se programme après la dernière intervention. Si une reprise ponctuelle salit à nouveau une zone déjà traitée, nous revenons sur cette zone : la retouche se chiffre à la zone, pas au chantier entier.",
  },
  {
    q: "Intervenez-vous le samedi ou en urgence ?",
    a: "Oui. Nous intervenons le samedi et proposons une intervention rapide sous 48 heures pour les demandes urgentes. Des frais supplémentaires peuvent s'appliquer sur ces créneaux.",
  },
  {
    q: "Combien de temps faut-il prévoir ?",
    a: "Comptez en moyenne une journée pour un appartement de 60 à 80 m², et deux à trois jours pour une maison individuelle. Nous adaptons la taille de l'équipe quand la date de livraison l'impose.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Nettoyage de fin de chantier",
  serviceType: "Nettoyage de fin de chantier",
  description: DESCRIPTION,
  url: `${site.url}${PATH}`,
  provider: {
    "@type": "CleaningService",
    name: site.name,
    url: site.url,
    telephone: site.phone.display,
    areaServed: site.area.cities.map((name) => ({ "@type": "City", name })),
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Nord, Hauts-de-France",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Postes couverts",
    itemListElement: prestations.map((p) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: p.title },
    })),
  },
};

const NettoyageFinDeChantier = () => (
  <>
    <Seo title={TITLE} description={DESCRIPTION} path={PATH} jsonLd={jsonLd} />

    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero */}
        <section className="gradient-hero pt-32 pb-20 md:pt-40 md:pb-28 text-white">
          <div className="container-narrow">
            <p className="inline-block px-4 py-1.5 bg-white/10 text-white/90 text-sm font-medium rounded-full mb-6">
              Nettoyage de livraison
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-balance">
              Nettoyage de fin de chantier à Lille et dans le Nord
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mb-8 leading-relaxed">
              La dernière étape avant la réception, et celle sur laquelle votre
              travail est jugé. Nous reprenons le chantier une fois les corps
              d'état sortis et le rendons prêt à livrer : déchets évacués,
              poussières fines traitées, sols décapés, vitrerie faite.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Demander un devis gratuit
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <a href={site.phone.href}>
                  <Phone className="w-4 h-4 mr-2" />
                  {site.phone.display}
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Ce que comprend la prestation */}
        <section className="section-padding">
          <div className="container-narrow">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Ce que comprend un nettoyage de fin de chantier
            </h2>
            <p className="text-muted-foreground text-lg mb-12 max-w-3xl">
              Six postes, traités dans un ordre précis. Nettoyer les vitres
              avant d'avoir aspiré les poussières fines, c'est les refaire deux
              fois.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {prestations.map((p) => (
                <Card key={p.title} className="border-border">
                  <CardContent className="p-6">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <p.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      {p.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {p.body}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trois prestations à ne pas confondre */}
        <section className="section-padding bg-muted/50">
          <div className="container-narrow">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Trois prestations que l'on confond
            </h2>
            <p className="text-muted-foreground text-lg mb-12 max-w-3xl">
              Les devis se comparent mal parce que les mots ne désignent pas la
              même chose d'une entreprise à l'autre. Voici comment nous les
              employons.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {distinctions.map((d) => (
                <div
                  key={d.title}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <p className="text-sm font-medium text-accent mb-2">
                    {d.when}
                  </p>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {d.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {d.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quand intervenir */}
        <section className="section-padding">
          <div className="container-narrow max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              À quel moment nous faire intervenir
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Après le passage du dernier corps d'état, et avant la réception ou
              l'état des lieux. C'est la fenêtre où le nettoyage tient : trop
              tôt, il sera à refaire ; trop tard, il retarde votre livraison.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              L'erreur la plus fréquente consiste à programmer le nettoyage
              avant la pose des sols souples ou la dépose des protections. Le
              second passage coûte alors plus cher que l'économie espérée sur le
              premier.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Prévenez-nous dès que votre date de réception se précise, même si
              elle peut encore bouger. Réserver un créneau et le décaler est
              simple ; trouver une équipe disponible à trois jours l'est
              beaucoup moins.
            </p>
          </div>
        </section>

        {/* Prix */}
        <section className="section-padding bg-muted/50">
          <div className="container-narrow">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Ce qui fait le prix
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-3xl">
              Nous n'affichons pas de tarif au mètre carré, parce qu'un prix
              annoncé sans avoir vu le chantier se révise toujours à la hausse.
              Voici ce que nous regardons pour chiffrer.
            </p>

            <ul className="space-y-4 max-w-3xl">
              {facteursPrix.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <span className="text-foreground leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Déroulé */}
        <section className="section-padding">
          <div className="container-narrow">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-12">
              Comment ça se passe
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {etapes.map((e) => (
                <div key={e.step}>
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-bold mb-4">
                    {e.step}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {e.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {e.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pour qui */}
        <section className="section-padding gradient-navy text-white">
          <div className="container-narrow">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Pour qui nous intervenons
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-3xl">
              Sur de la construction neuve comme sur de la rénovation, du studio
              à l'opération livrée par tranches.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {clients.map((c) => (
                <div
                  key={c}
                  className="flex items-start gap-3 bg-white/5 rounded-lg p-4"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding">
          <div className="container-narrow max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-10">
              Questions fréquentes
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faq.map((item, i) => (
                <AccordionItem
                  key={item.q}
                  value={`q-${i}`}
                  className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left text-foreground font-medium hover:no-underline py-5">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Zone */}
        <section className="section-padding bg-muted/50">
          <div className="container-narrow max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Où nous intervenons
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Lille et toute la métropole lilloise, ainsi que le reste du
              département du Nord. Nous intervenons régulièrement à{" "}
              {site.area.cities.slice(1, 8).join(", ")} et dans les communes
              voisines.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Pour un chantier situé en dehors de cette zone, demandez-nous :
              selon le volume et la date, le déplacement se justifie souvent.
            </p>
          </div>
        </section>

        <ContactSection />
      </main>

      <Footer />
    </div>
  </>
);

export default NettoyageFinDeChantier;
