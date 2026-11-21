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
    "Dernière Couche, entreprise spécialisée en nettoyage de fin de chantier à Lille et dans la métropole lilloise. Nettoyage après travaux pour professionnels et particuliers. Devis gratuit.",

  /** TODO: numéro réel. Placeholder hérité du template Finalis. */
  phone: {
    display: "03 00 00 00 00",
    href: "tel:+33300000000",
  },

  /** TODO: boîte réelle. Aucun enregistrement MX n'existe encore sur le domaine. */
  email: "contact@dernierecouche.com",

  area: {
    label: "Lille et métropole lilloise",
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
};
