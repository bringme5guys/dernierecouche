import type { RouteRecord } from "vite-react-ssg";
import App from "./App";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NettoyageFinDeChantier from "./pages/services/NettoyageFinDeChantier";

/**
 * Chaque entrée ayant un `path` concret est prérendue au build sous la
 * forme d'un fichier HTML complet. Les nouvelles pages de service
 * viendront s'ajouter ici.
 */
export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "services/nettoyage-fin-de-chantier",
        element: <NettoyageFinDeChantier />,
      },
      // Prérendue pour que GitHub Pages serve un vrai HTML de 404.
      { path: "404", element: <NotFound /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];
