/**
 * Source unique de vérité pour la marque, les coordonnées et le domaine.
 *
 * ⚠️ Les valeurs marquées TODO sont des placeholders hérités du template.
 * Elles sont affichées en production : à remplacer avant toute campagne.
 */
export const site = {
  name: "Dernière Couche",
  tagline: "Nettoyage professionnel de fin de chantier",
  domain: "dernierecouche.com",
  url: "https://dernierecouche.com",

  description:
    "Dernière Couche, société de nettoyage pour les professionnels à Lille et dans le Nord : chantier et fin de chantier, parties communes et syndic, nettoyages complexes, entrepôts et locaux industriels. Devis gratuit.",

  /** TODO: numéro réel. Placeholder hérité du template Finalis. */
  phone: {
    display: "03 00 00 00 00",
    href: "tel:+33300000000",
  },

  /** TODO: boîte réelle. Aucun enregistrement MX n'existe encore sur le domaine. */
  email: "contact@dernierecouche.com",

  area: {
    label: "Lille, métropole et tout le Nord",
    city: "Lille",
    region: "Hauts-de-France",
    postalCode: "59000",
    country: "FR",
    cities: [
      "Lille",
      "Roubaix",
      "Tourcoing",
      "Villeneuve-d'Ascq",
      "Lambersart",
      "Lesquin",
      "Loos",
      "Croix",
      "Hem",
      "Mouvaux",
      "Ronchin",
      "Seclin",
      "Wasquehal",
      "Wattignies",
      "Wattrelos",
      "Hellemmes",
    ],
  },
} as const;


/**
 * Les cinq métiers de l'entreprise, dans l'ordre d'affichage.
 * `path` reste nul tant que la page dédiée n'existe pas : la carte est
 * alors affichée sans lien plutôt que de pointer vers une page absente.
 */
export const metiers = [
  {
    slug: "nettoyage-de-chantier",
    title: "Nettoyage de chantier",
    description:
      "Pendant les travaux : circulations dégagées, base vie entretenue, déchets évacués au fil des corps d'état. Le chantier reste praticable et sûr.",
    path: null,
  },
  {
    slug: "nettoyage-fin-de-chantier",
    title: "Nettoyage de fin de chantier",
    description:
      "À la livraison : déchets et gravats, poussières fines, voile de ciment, vitrerie. Le bien rendu prêt à recevoir son occupant.",
    path: "/services/nettoyage-fin-de-chantier",
  },
  {
    slug: "parties-communes",
    title: "Parties communes et syndic",
    description:
      "Entretien régulier des halls, circulations, escaliers et locaux techniques. Contrats à l'année pour syndics, bailleurs et gestionnaires.",
    path: null,
  },
  {
    slug: "nettoyages-complexes",
    title: "Nettoyages complexes",
    description:
      "Insalubrité, syndrome de Diogène, après sinistre, dégât des eaux ou incendie. Des interventions lourdes, menées avec discrétion.",
    path: null,
  },
  {
    slug: "entrepots-locaux-industriels",
    title: "Entrepôts et locaux industriels",
    description:
      "Sols, quais, rayonnages et zones de production. Intervention calée sur vos horaires pour ne pas arrêter l'exploitation.",
    path: null,
  },
] as const;

/** Données structurées LocalBusiness pour le référencement local. */
export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "CleaningService",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phone.display,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.area.city,
    addressRegion: site.area.region,
    postalCode: site.area.postalCode,
    addressCountry: site.area.country,
  },
  areaServed: site.area.cities.map((name) => ({ "@type": "City", name })),
  priceRange: "€€",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Nos métiers",
    itemListElement: metiers.map((m) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: m.title },
    })),
  },
};
