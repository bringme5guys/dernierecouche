import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { site } from "@/config/site";

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project_type: "",
    surface_area: "",
    desired_date: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Enregistrement en base.
      // Pas de .select() ici : la policy SELECT de quote_requests est
      // réservée aux admins, donc relire la ligne insérée ferait échouer
      // l'insertion entière pour un visiteur anonyme (Postgres 42501).
      const { error: dbError } = await supabase
        .from("quote_requests")
        .insert([formData]);

      if (dbError) throw dbError;

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke(
        "send-quote-notification",
        {
          body: formData,
        }
      );

      if (emailError) {
        console.error("Email error:", emailError);
        // Don't throw - the request was saved, just email failed
      }

      toast({
        title: "Demande envoyée !",
        description:
          "Nous avons bien reçu votre demande de devis. Nous vous recontacterons dans les plus brefs délais.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        project_type: "",
        surface_area: "",
        desired_date: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erreur",
        description:
          "Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Demandez votre devis gratuit
          </h2>
          <p className="text-muted-foreground text-lg">
            Décrivez-nous votre projet et recevez une estimation sous 24h.
            Intervention possible sous 48h pour les demandes urgentes.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-6">
                Coordonnées
              </h3>
              <div className="space-y-4">
                <a
                  href={site.phone.href}
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Téléphone</p>
                    <p className="text-muted-foreground">{site.phone.display}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${site.email}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-muted-foreground">{site.email}</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Zone d'intervention</p>
                    <p className="text-muted-foreground">
                      Lille et métropole lilloise
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Horaires</p>
                    <p className="text-muted-foreground">
                      Lun - Ven : 7h - 19h
                      <br />
                      Samedi : sur rendez-vous
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-2xl p-6 lg:p-8 shadow-sm"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jean Dupont"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jean@exemple.fr"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="06 00 00 00 00"
                  />
                </div>

                {/* Project Type */}
                <div className="space-y-2">
                  <Label htmlFor="project_type">Type de projet *</Label>
                  <Select
                    value={formData.project_type}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, project_type: value }))
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="construction">Construction neuve</SelectItem>
                      <SelectItem value="renovation-complete">Rénovation complète</SelectItem>
                      <SelectItem value="renovation-partielle">Rénovation partielle</SelectItem>
                      <SelectItem value="extension">Extension / Agrandissement</SelectItem>
                      <SelectItem value="amenagement-combles">Aménagement de combles</SelectItem>
                      <SelectItem value="amenagement-interieur">Aménagement intérieur</SelectItem>
                      <SelectItem value="salle-de-bain">Salle de bain / Sanitaires</SelectItem>
                      <SelectItem value="cuisine">Cuisine</SelectItem>
                      <SelectItem value="cloisons-plafonds">Cloisons / Faux plafonds</SelectItem>
                      <SelectItem value="isolation">Isolation thermique / acoustique</SelectItem>
                      <SelectItem value="peinture-finitions">Peinture / Finitions</SelectItem>
                      <SelectItem value="carrelage-revetement">Carrelage / Revêtement sols</SelectItem>
                      <SelectItem value="electricite">Électricité</SelectItem>
                      <SelectItem value="plomberie">Plomberie</SelectItem>
                      <SelectItem value="menuiserie">Menuiserie intérieure</SelectItem>
                      <SelectItem value="local-commercial">Local commercial / Bureau</SelectItem>
                      <SelectItem value="autre">Autre projet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Surface */}
                <div className="space-y-2">
                  <Label htmlFor="surface_area">Surface approximative</Label>
                  <Input
                    id="surface_area"
                    name="surface_area"
                    value={formData.surface_area}
                    onChange={handleChange}
                    placeholder="Ex: 80 m²"
                  />
                </div>

                {/* Desired Date */}
                <div className="space-y-2">
                  <Label htmlFor="desired_date">Date souhaitée</Label>
                  <Input
                    id="desired_date"
                    name="desired_date"
                    type="date"
                    value={formData.desired_date}
                    onChange={handleChange}
                  />
                </div>

                {/* Message */}
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="message">Décrivez votre projet</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Précisez le type de chantier, l'adresse, vos contraintes de délai..."
                    rows={4}
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full mt-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Envoyer ma demande de devis
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                En soumettant ce formulaire, vous acceptez d'être recontacté
                concernant votre demande.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
