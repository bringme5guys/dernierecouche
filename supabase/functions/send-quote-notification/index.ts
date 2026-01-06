import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.24.3/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

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
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is missing");
      return new Response(JSON.stringify({ error: "Configuration manquante" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const raw = await req.json();
    const data: QuoteRequest = QuoteRequestSchema.parse(raw);

    const projectTypeLabel =
      projectTypeLabels[data.project_type] || data.project_type;

    // Escape user-provided fields used in HTML
    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safePhone = data.phone ? escapeHtml(data.phone) : "";
    const safeProjectType = escapeHtml(projectTypeLabel);
    const safeSurface = data.surface_area ? escapeHtml(data.surface_area) : "";
    const safeDesiredDate = data.desired_date ? escapeHtml(data.desired_date) : "";
    const safeMessage = data.message
      ? escapeHtml(data.message).replace(/\n/g, "<br>")
      : "";

    // Send notification email to business
    const businessEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Finalis <onboarding@resend.dev>",
        to: ["contact@finalis.fr"],
        subject: `Nouvelle demande de devis - ${safeName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1e3a5f; color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">Finalis</h1>
              <p style="margin: 5px 0 0 0; opacity: 0.8;">Nouvelle demande de devis</p>
            </div>

            <div style="padding: 30px; background: #f8fafc;">
              <h2 style="color: #1e3a5f; margin-top: 0;">Informations client</h2>

              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 40%;">Nom</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
                </tr>
                ${data.phone
                  ? `<tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Téléphone</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><a href="tel:${safePhone}">${safePhone}</a></td>
                </tr>`
                  : ""}
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Type de projet</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${safeProjectType}</td>
                </tr>
                ${data.surface_area
                  ? `<tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Surface</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${safeSurface}</td>
                </tr>`
                  : ""}
                ${data.desired_date
                  ? `<tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Date souhaitée</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${safeDesiredDate}</td>
                </tr>`
                  : ""}
              </table>

              ${data.message
                ? `
              <h3 style="color: #1e3a5f; margin-top: 30px;">Message</h3>
              <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                ${safeMessage}
              </div>
              `
                : ""}
            </div>

            <div style="padding: 20px; text-align: center; color: #64748b; font-size: 14px;">
              <p>Cette demande a été envoyée depuis le site finalis.fr</p>
            </div>
          </div>
        `,
      }),
    });

    const businessEmail = await businessEmailRes.json();

    // Send confirmation email to customer
    const customerEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Finalis <onboarding@resend.dev>",
        to: [data.email],
        subject: "Votre demande de devis - Finalis",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1e3a5f; color: white; padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px;">Finalis</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Nettoyage professionnel de fin de chantier</p>
            </div>

            <div style="padding: 30px; background: #ffffff;">
              <h2 style="color: #1e3a5f; margin-top: 0;">Bonjour ${safeName},</h2>

              <p style="color: #374151; line-height: 1.6;">
                Nous avons bien reçu votre demande de devis pour un nettoyage de fin de chantier.
              </p>

              <p style="color: #374151; line-height: 1.6;">
                Notre équipe va étudier votre demande et reviendra vers vous dans les <strong>24 heures ouvrées</strong>
                avec une proposition adaptée à votre projet.
              </p>

              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h3 style="color: #1e3a5f; margin: 0 0 15px 0; font-size: 16px;">Récapitulatif de votre demande</h3>
                <p style="margin: 5px 0; color: #374151;"><strong>Type de projet :</strong> ${safeProjectType}</p>
                ${data.surface_area
                  ? `<p style="margin: 5px 0; color: #374151;"><strong>Surface :</strong> ${safeSurface}</p>`
                  : ""}
                ${data.desired_date
                  ? `<p style="margin: 5px 0; color: #374151;"><strong>Date souhaitée :</strong> ${safeDesiredDate}</p>`
                  : ""}
              </div>

              <p style="color: #374151; line-height: 1.6;">
                En attendant, n'hésitez pas à nous contacter si vous avez des questions :
              </p>

              <ul style="color: #374151; line-height: 1.8;">
                <li>📞 <a href="tel:+33000000000" style="color: #1e3a5f;">03 00 00 00 00</a></li>
                <li>✉️ <a href="mailto:contact@finalis.fr" style="color: #1e3a5f;">contact@finalis.fr</a></li>
              </ul>

              <p style="color: #374151; line-height: 1.6; margin-top: 25px;">
                À très bientôt,<br>
                <strong>L'équipe Finalis</strong>
              </p>
            </div>

            <div style="padding: 20px; background: #f8fafc; text-align: center; color: #64748b; font-size: 13px;">
              <p style="margin: 0;">Finalis - Nettoyage professionnel de fin de chantier</p>
              <p style="margin: 5px 0;">Lille et métropole lilloise</p>
            </div>
          </div>
        `,
      }),
    });

    const customerEmail = await customerEmailRes.json();

    return new Response(
      JSON.stringify({
        success: true,
        businessEmail,
        customerEmail,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    // Avoid logging raw PII; keep logs minimal
    console.error("Error in send-quote-notification function:", error?.message ?? error);
    return new Response(JSON.stringify({ error: "Erreur lors de l'envoi" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);

