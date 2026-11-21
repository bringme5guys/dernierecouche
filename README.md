# Dernière Couche

Site vitrine de **Dernière Couche** — nettoyage professionnel de fin de chantier
à Lille et dans la métropole lilloise.

Production : https://dernierecouche.com

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (table `quote_requests` + edge function `send-quote-notification`)

## Démarrer

```bash
npm install
npm run dev     # http://localhost:8080
npm run build   # build de production dans dist/
```

Les variables d'environnement sont dans `.env` (clés Supabase publiques).

## Coordonnées et marque

Téléphone, email, domaine et zone d'intervention sont centralisés dans
[`src/config/site.ts`](src/config/site.ts). C'est le **seul** endroit à modifier.

## Edge function

`supabase/functions/send-quote-notification/` envoie, via Resend, la
notification de demande de devis à l'entreprise et l'accusé de réception au
prospect. Elle attend ces secrets Supabase :

| Secret | Rôle |
| --- | --- |
| `RESEND_API_KEY` | Clé API Resend |
| `QUOTE_NOTIFICATION_TO` | Boîte qui reçoit les demandes de devis |
| `QUOTE_NOTIFICATION_FROM` | Expéditeur vérifié chez Resend |

Déploiement : `supabase functions deploy send-quote-notification`
