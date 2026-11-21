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

Le domaine est délégué à Google Cloud DNS :

```
ns-cloud-b1.googledomains.com
ns-cloud-b2.googledomains.com
ns-cloud-b3.googledomains.com
ns-cloud-b4.googledomains.com
```

Enregistrement actuel : `dernierecouche.com. A 185.158.133.1` — l'adresse
de l'hébergement Lovable. Le domaine n'a **aucun enregistrement MX** : rien
ne peut recevoir d'email à `@dernierecouche.com` aujourd'hui.

## La bascule à faire

Dans la zone Google Cloud DNS, remplacer l'enregistrement A par les quatre
adresses de GitHub Pages :

```
dernierecouche.com.   A   185.199.108.153
dernierecouche.com.   A   185.199.109.153
dernierecouche.com.   A   185.199.110.153
dernierecouche.com.   A   185.199.111.153
```

En IPv6, si la zone le gère :

```
dernierecouche.com.   AAAA   2606:50c0:8000::153
dernierecouche.com.   AAAA   2606:50c0:8001::153
dernierecouche.com.   AAAA   2606:50c0:8002::153
dernierecouche.com.   AAAA   2606:50c0:8003::153
```

Et pour le sous-domaine www :

```
www.dernierecouche.com.   CNAME   bringme5guys.github.io.
```

Le fichier [public/CNAME](../public/CNAME) déclare déjà le domaine côté
GitHub. Une fois le DNS propagé, GitHub émet automatiquement le certificat
Let's Encrypt ; cocher ensuite « Enforce HTTPS » dans les réglages Pages du
dépôt.

## Ce qui reste à la main de l'utilisateur

1. **Couper la synchronisation GitHub dans Lovable.** Son bot
   (`gpt-engineer-app`) a poussé sur `main` pendant la reprise et
   réintroduit sa tuyauterie d'aperçu, qu'il a fallu retirer. Tant que la
   connexion existe, il recommencera.
2. **Poser la bascule DNS** ci-dessus.
3. **Poser le secret Resend** pour que les demandes de devis parviennent
   par email :
   `supabase secrets set RESEND_API_KEY=... --project-ref bnxadaigzktyjeylbzks`
4. **Donner le vrai numéro de téléphone**, qui reste un placeholder dans
   [src/config/site.ts](../src/config/site.ts).
5. **Ouvrir des enregistrements MX** sur le domaine, sans quoi l'adresse de
   contact affichée sur le site ne reçoit rien.
6. **Décider du sort de `.lovable/north-star/north-star.md`**, laissé en
   place après la coupure.
