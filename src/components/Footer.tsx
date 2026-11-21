import { Phone, Mail, MapPin } from "lucide-react";
import { site } from "@/config/site";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-charcoal text-white">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-display font-bold mb-4">Dernière Couche</h3>
            <p className="text-white/70 mb-6 max-w-md">
              Spécialiste du nettoyage de fin de chantier à Lille et dans toute
              la métropole lilloise. Professionnalisme, rigueur et satisfaction
              client.
            </p>
            <div className="space-y-3">
              <a
                href={site.phone.href}
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{site.phone.display}</span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{site.email}</span>
              </a>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-4 h-4" />
                <span>Lille et métropole lilloise</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                { label: "Services", id: "services" },
                { label: "Réalisations", id: "gallery" },
                { label: "Pourquoi nous", id: "why-us" },
                { label: "Zone d'intervention", id: "coverage" },
                { label: "FAQ", id: "faq" },
                { label: "Contact", id: "contact" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Nos services</h4>
            <ul className="space-y-2 text-white/70">
              <li>Nettoyage fin de chantier</li>
              <li>Dépoussiérage complet</li>
              <li>Nettoyage des sols</li>
              <li>Vitres et menuiseries</li>
              <li>Désinfection</li>
              <li>Évacuation déchets</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © {currentYear} Dernière Couche. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm">
              <button className="text-white/50 hover:text-white transition-colors">
                Mentions légales
              </button>
              <button className="text-white/50 hover:text-white transition-colors">
                Politique de confidentialité
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
