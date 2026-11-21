import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.24.3/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

/** Boîte qui reçoit les demandes de devis. Secret Supabase, jamais en dur. */
const NOTIFICATION_TO = Deno.env.get("QUOTE_NOTIFICATION_TO");

/**
 * Expéditeur. Doit appartenir à un domaine vérifié chez Resend.
 * `onboarding@resend.dev` ne délivre qu'à l'adresse du titulaire du compte :
 * utilisable pour tester, pas pour la production.
 */
const NOTIFICATION_FROM =
  Deno.env.get("QUOTE_NOTIFICATION_FROM") ??
  "Dernière Couche <onboarding@resend.dev>";

const BRAND = {
  name: "Dernière Couche",
  tagline: "Nettoyage professionnel de fin de chantier",
  site: "dernierecouche.com",
  area: "Lille et métropole lilloise",
  phone: Deno.env.get("CONTACT_PHONE") ?? "",
  email: Deno.env.get("CONTACT_EMAIL") ?? "",
  color: "#1e3a5f",
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const QuoteRequestSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  project_type: z.string().trim().min(1).max(100),
  surface_area: z.string().trim().max(50).optional().or(z.literal("")),
  desired_date: z.string().trim().max(50).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

type QuoteRequest = z.infer<typeof QuoteRequestSchema>;

const projectTypeLabels: Record<string, string> = {
  construction: "Construction neuve",
  renovation: "Rénovation",
  amenagement: "Aménagement / Second œuvre",
  autre: "Autre",
};

const escapeHtml = (input: string) =>
  input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

/** Envoie un email et remonte une erreur explicite si Resend refuse. */
const sendEmail = async (payload: Record<string, unknown>, label: string) => {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error(`Resend a refusé l'email "${label}"`, res.status, body);
    throw new Error(`${label}: ${res.status}`);
  }

  return body;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY || !NOTIFICATION_TO) {
      console.error(
        "Configuration manquante : RESEND_API_KEY et QUOTE_NOTIFICATION_TO sont requis"
      );
      return new Response(JSON.stringify({ error: "Configuration manquante" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const raw = await req.json();
    const data: QuoteRequest = QuoteRequestSchema.parse(raw);

    const projectTypeLabel =
      projectTypeLabels[data.project_type] || data.project_type;

    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safePhone = data.phone ? escapeHtml(data.phone) : "";
    const safeProjectType = escapeHtml(projectTypeLabel);
    const safeSurface = data.surface_area ? escapeHtml(data.surface_area) : "";
    const safeDesiredDate = data.desired_date
      ? escapeHtml(data.desired_date)
      : "";
    const safeMessage = data.message
      ? escapeHtml(data.message).replace(/\n/g, "<br>")
      : "";

    const row = (label: string, value: string) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-weight:bold;width:40%;">${label}</td>
        <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;">${value}</td>
      </tr>`;

    // 1. Notification à l'entreprise
    const businessEmail = await sendEmail(
      {
        from: NOTIFICATION_FROM,
        to: [NOTIFICATION_TO],
        reply_to: data.email,
        subject: `Nouvelle demande de devis - ${safeName}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:${BRAND.color};color:white;padding:20px;text-align:center;">
              <h1 style="margin:0;">${BRAND.name}</h1>
              <p style="margin:5px 0 0 0;opacity:0.8;">Nouvelle demande de devis</p>
            </div>
            <div style="padding:30px;background:#f8fafc;">
              <h2 style="color:${BRAND.color};margin-top:0;">Informations client</h2>
              <table style="width:100%;border-collapse:collapse;">
                ${row("Nom", safeName)}
                ${row("Email", `<a href="mailto:${safeEmail}">${safeEmail}</a>`)}
                ${data.phone ? row("Téléphone", `<a href="tel:${safePhone}">${safePhone}</a>`) : ""}
                ${row("Type de projet", safeProjectType)}
                ${data.surface_area ? row("Surface", safeSurface) : ""}
                ${data.desired_date ? row("Date souhaitée", safeDesiredDate) : ""}
              </table>
              ${
                data.message
                  ? `<h3 style="color:${BRAND.color};margin-top:30px;">Message</h3>
                     <div style="background:white;padding:15px;border-radius:8px;border:1px solid #e2e8f0;">${safeMessage}</div>`
                  : ""
              }
            </div>
            <div style="padding:20px;text-align:center;color:#64748b;font-size:14px;">
              <p>Demande envoyée depuis ${BRAND.site}</p>
            </div>
          </div>`,
      },
      "notification entreprise"
    );

    // 2. Accusé de réception au prospect
    const contactLines = [
      BRAND.phone
        ? `<li>📞 <a href="tel:${escapeHtml(BRAND.phone)}" style="color:${BRAND.color};">${escapeHtml(BRAND.phone)}</a></li>`
        : "",
      BRAND.email
        ? `<li>✉️ <a href="mailto:${escapeHtml(BRAND.email)}" style="color:${BRAND.color};">${escapeHtml(BRAND.email)}</a></li>`
        : "",
    ]
      .filter(Boolean)
      .join("");

    const customerEmail = await sendEmail(
      {
        from: NOTIFICATION_FROM,
        to: [data.email],
        reply_to: NOTIFICATION_TO,
        subject: `Votre demande de devis - ${BRAND.name}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:${BRAND.color};color:white;padding:30px;text-align:center;">
              <h1 style="margin:0;font-size:28px;">${BRAND.name}</h1>
              <p style="margin:10px 0 0 0;opacity:0.9;">${BRAND.tagline}</p>
            </div>
            <div style="padding:30px;background:#ffffff;">
              <h2 style="color:${BRAND.color};margin-top:0;">Bonjour ${safeName},</h2>
              <p style="color:#374151;line-height:1.6;">
                Nous avons bien reçu votre demande de devis pour un nettoyage de fin de chantier.
              </p>
              <p style="color:#374151;line-height:1.6;">
                Notre équipe va étudier votre demande et reviendra vers vous dans les
                <strong>24 heures ouvrées</strong> avec une proposition adaptée à votre projet.
              </p>
              <div style="background:#f8fafc;padding:20px;border-radius:8px;margin:25px 0;">
                <h3 style="color:${BRAND.color};margin:0 0 15px 0;font-size:16px;">Récapitulatif de votre demande</h3>
                <p style="margin:5px 0;color:#374151;"><strong>Type de projet :</strong> ${safeProjectType}</p>
                ${data.surface_area ? `<p style="margin:5px 0;color:#374151;"><strong>Surface :</strong> ${safeSurface}</p>` : ""}
                ${data.desired_date ? `<p style="margin:5px 0;color:#374151;"><strong>Date souhaitée :</strong> ${safeDesiredDate}</p>` : ""}
              </div>
              ${
                contactLines
                  ? `<p style="color:#374151;line-height:1.6;">En attendant, n'hésitez pas à nous contacter :</p>
                     <ul style="color:#374151;line-height:1.8;">${contactLines}</ul>`
                  : ""
              }
              <p style="color:#374151;line-height:1.6;margin-top:25px;">
                À très bientôt,<br><strong>L'équipe ${BRAND.name}</strong>
              </p>
            </div>
            <div style="padding:20px;background:#f8fafc;text-align:center;color:#64748b;font-size:13px;">
              <p style="margin:0;">${BRAND.name} - ${BRAND.tagline}</p>
              <p style="margin:5px 0;">${BRAND.area}</p>
            </div>
          </div>`,
      },
      "accusé de réception client"
    );

    return new Response(
      JSON.stringify({ success: true, businessEmail, customerEmail }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error in send-quote-notification function:", error);
    return new Response(
      JSON.stringify({
        error:
          "Une erreur est survenue. Veuillez réessayer ou nous contacter directement.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
