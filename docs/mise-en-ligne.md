# Mise en ligne

## Où tourne le site

Le code est construit et publié par GitHub Actions
([.github/workflows/deploy.yml](../.github/workflows/deploy.yml)) à chaque
poussée sur `main`. Aucun compte d'hébergeur à gérer.

Le dépôt est **public** : c'est la condition pour que GitHub Pages serve un
site sans abonnement. Vérifié avant le passage : l'historique ne contient
que des clés Supabase `anon`, publiques par construction puisqu'elles sont
déjà livrées dans le JavaScript du site. Aucune clé `service_role`, aucun
mot de passe, aucun jeton.

Le mot de passe de la base reste dans `.secrets/`, ignoré par git.

## État du DNS

La bascule a été faite le 22 novembre 2026 dans Squarespace, qui gère la
zone (les serveurs de noms `ns-cloud-*.googledomains.com` sont son
infrastructure héritée de Google Domains).

L'enregistrement A vers Lovable était enfermé dans un préréglage
« Domain Connect to Entri » posé par Lovable, non modifiable : il a fallu
supprimer le préréglage entier, ce qui a retiré au passage le jeton
`TXT _lovable`. Le jeton `TXT _lovable.www` et l'ancien `A www` ont été
supprimés eux aussi.

Zone actuelle, enregistrements personnalisés :

```
dernierecouche.com.       A       185.199.108.153
dernierecouche.com.       A       185.199.109.153
dernierecouche.com.       A       185.199.110.153
dernierecouche.com.       A       185.199.111.153
www.dernierecouche.com.   CNAME   bringme5guys.github.io.
```

Préréglages conservés intacts : « Squarespace Domain Connect » et
« Email Security ».

## À ne pas casser en modifiant la zone

Le domaine porte un enregistrement TXT `v=spf1 -all`. Il déclare qu'aucun
serveur n'est autorisé à envoyer du courrier au nom du domaine, ce qui le
protège contre l'usurpation. **Le conserver tel quel.** Il devra être
modifié, et non supprimé, le jour où une adresse `@dernierecouche.com`
enverra réellement des emails.

Le TTL de l'enregistrement A est de 3600 secondes : compter jusqu'à une
heure de propagation après la bascule.

Il n'existe aucun enregistrement pour `www` aujourd'hui : le CNAME est à
créer.

## Ce qui reste à la main de l'utilisateur

1. **Couper la synchronisation GitHub dans Lovable.** Son bot
   (`gpt-engineer-app`) a poussé sur `main` pendant la reprise et
   réintroduit sa tuyauterie d'aperçu, qu'il a fallu retirer. Tant que la
   connexion existe, il recommencera.
3. **Poser le secret Resend** pour que les demandes de devis parviennent
   par email :
   `supabase secrets set RESEND_API_KEY=... --project-ref bnxadaigzktyjeylbzks`
4. **Donner le vrai numéro de téléphone**, qui reste un placeholder dans
   [src/config/site.ts](../src/config/site.ts).
5. **Ouvrir des enregistrements MX** sur le domaine, sans quoi l'adresse de
   contact affichée sur le site ne reçoit rien.
6. **Décider du sort de `.lovable/north-star/north-star.md`**, laissé en
   place après la coupure.
