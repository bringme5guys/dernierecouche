import { Head } from "vite-react-ssg";
import { site } from "@/config/site";

type SeoProps = {
  /** Titre complet de l'onglet et des partages. */
  title: string;
  description: string;
  /** Chemin de la page, racine comprise : "/" ou "/services/...". */
  path: string;
  /** Image de partage, chemin absolu depuis la racine du site. */
  image?: string;
  /** Données structurées propres à la page. */
  jsonLd?: Record<string, unknown>;
};

/**
 * Source unique des métadonnées d'une page.
 * Au build, ce bloc est écrit dans le HTML généré : il est donc lu par
 * les robots et les aperçus de partage sans exécuter de JavaScript.
 */
export const Seo = ({
  title,
  description,
  path,
  image = "/og-image.jpg",
  jsonLd,
}: SeoProps) => {
  const url = `${site.url}${path}`;
  const imageUrl = `${site.url}${image}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow, max-image-preview:large" />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Head>
  );
};

export default Seo;
