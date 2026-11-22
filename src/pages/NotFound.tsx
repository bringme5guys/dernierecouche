import Seo from "@/components/Seo";
import { site } from "@/config/site";

const NotFound = () => (
  <>
    <Seo
      title={`Page introuvable | ${site.name}`}
      description="Cette page n'existe pas ou a été déplacée."
      path="/404"
    />
    <div className="flex min-h-screen items-center justify-center bg-muted px-6">
      <div className="text-center">
        <h1 className="mb-4 font-display text-5xl font-bold text-foreground">
          404
        </h1>
        <p className="mb-6 text-xl text-muted-foreground">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <a
          href="/"
          className="text-primary underline underline-offset-4 hover:text-primary/80"
        >
          Revenir à l'accueil
        </a>
      </div>
    </div>
  </>
);

export default NotFound;
