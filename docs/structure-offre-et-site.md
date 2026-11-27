# Structure de l'offre et du site

Appuyé sur [recherche-mots-cles.md](recherche-mots-cles.md).
Décision actée : pas de lutte antiparasitaire (Certibiocide trop contraignant).

## Ce que disent les SERP lilloises

**« nettoyage fin de chantier lille »** — les 8 premières positions ne sont
pas organiques : le pack local Google occupe tout le haut. Le premier
résultat naturel arrive en position 9. Concurrents présents : Clinitex (le
poids lourd régional), NOVA CLEAN, Properis, MTAM PRO, UNIC Multiservices,
plus trois annuaires (PagesJaunes, Obat, LeBonTri).

Conséquence : sur ce métier, **la fiche Google Business Profile compte plus
que le site**. Elle exige une adresse et un téléphone réels.

**« nettoyage parties communes lille »** — l'organique occupe la position 1,
et le niveau est faible : trois annuaires, deux pages hors sujet qui
remontent par accident (une page « logement de vacances », une page
« nettoyage d'appartement »), et une page « À propos » qui se classe faute
de mieux. Un seul concurrent a une page réellement ciblée.

C'est la meilleure porte d'entrée : forte valeur (CPC 3 à 11 €), faible
concurrence, et personne n'a fait le travail.

À noter : NOVA CLEAN applique déjà la stratégie page par service et par
situation (ils ont une page « nettoyage d'immeuble et de copropriété après
inondation à Lille »). C'est le concurrent à observer.

## L'offre : cinq métiers

| Métier | Demande visée | Pourquoi |
| --- | ---: | --- |
| Nettoyage de chantier | 480 | Récurrent pendant les travaux, inclut la base vie (30 seulement : une section, pas une page) |
| Nettoyage de fin de chantier | 1 300 | Le savoir-faire prouvé, le plus gros volume du lot |
| Parties communes et syndic | 460 cumulés | La fenêtre la plus ouverte, forte valeur |
| Nettoyages complexes | 860 cumulés | Le mieux rémunéré, déjà exercé mais jamais vendu |
| Entrepôts et locaux industriels | 2 110 cumulés | Gros volume sur « nettoyage industriel » |

Compléments à vendre **dans** ces pages, jamais comme pages autonomes :
parking (CPC 10,46 €), fin de bail (5,04 €), location de bennes (4,66 €),
vitrerie, sortie de containers.

## Arborescence

```
/                                        Société de nettoyage pour les professionnels
/services/nettoyage-fin-de-chantier      ← priorité 1, le métier établi
/services/parties-communes-syndic        ← priorité 2, la fenêtre ouverte
/services/nettoyages-complexes           ← priorité 3, la marge
/services/nettoyage-de-chantier          inclut la base vie
/services/entrepots-locaux-industriels
/realisations                            galerie avant/après, déjà photographiée
/devis                                   formulaire
/blog/
/a-propos
/mentions-legales  /politique-de-confidentialite
```

Pages locales : voir [couverture-nord.md](couverture-nord.md). En résumé,
**deux pages seulement au départ** — Lille et Dunkerque, les deux seuls
bassins à volume réel — plus une page « zone d'intervention » qui nomme les
bassins du département. Le croisement service × ville n'a aucune demande
mesurable hors Lille : le décliner fabriquerait des pages satellites.

## Le prérendu, fait

Le site était rendu entièrement côté client : chaque URL servait la même
coquille vide et tout le référencement dépendait du JavaScript. C'est levé.

Le build passe par `vite-react-ssg` et écrit un fichier HTML complet par
route. L'accueil fait désormais 79 Ko de contenu réel, données structurées
comprises, au lieu de 2 Ko de div vide.

Pour ajouter une page, deux gestes :

1. créer le composant dans `src/pages/`, avec un `<Seo … />` en tête ;
2. déclarer sa route dans [`src/routes.tsx`](../src/routes.tsx).

Le build la prérendra automatiquement. Les métadonnées passent toutes par
[`src/components/Seo.tsx`](../src/components/Seo.tsx) : titre, description,
canonical, Open Graph, Twitter et données structurées, en un seul endroit.

Ne jamais remettre de titre ou de description dans `index.html` : ils
feraient doublon avec ceux de la page.

## Plan de blog

Chaque article vise une question réelle et pointe vers sa page de service.

| Article | Rattaché à |
| --- | --- |
| Combien coûte un nettoyage de fin de chantier ? | fin de chantier |
| Réception de chantier : la checklist propreté | fin de chantier |
| Voile de ciment : l'enlever sans abîmer le carrelage | fin de chantier |
| À quel moment faire intervenir le nettoyage sur un chantier | chantier |
| Base vie : ce que l'employeur doit fournir | chantier |
| Parties communes : ce que doit couvrir le contrat d'un syndic | syndic |
| Changer de prestataire de nettoyage en copropriété | syndic |
| Syndrome de Diogène : comment se déroule une intervention | complexes |
| Dégât des eaux : les 48 premières heures | complexes |
| Après un incendie : suies, odeurs et ce qui se récupère | complexes |
| Nettoyer un entrepôt sans arrêter l'exploitation | entrepôts |
| Sols industriels : décaper, lustrer ou métalliser | entrepôts |

## Ordre d'exécution

1. ~~Prérendu des pages~~ — fait
2. ~~Page fin de chantier~~ — en ligne sur
   `/services/nettoyage-fin-de-chantier`
3. ~~Accueil repositionné au niveau de la société~~ — les cinq métiers
   sont définis dans `src/config/site.ts` et alimentent l'accueil, le pied
   de page et les données structurées. Une carte renvoie vers sa page quand
   elle existe, et reste sans lien sinon.
4. Page parties communes et syndic
5. Page nettoyages complexes, en exploitant les photos existantes
6. Chantier, puis entrepôts
7. Page locale Lille
8. Blog, deux articles par métier
