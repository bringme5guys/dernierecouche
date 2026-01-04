import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import villeneuveAvant from "@/assets/villeneuve-avant.png";
import villeneuveApres from "@/assets/villeneuve-apres.png";

const galleryItems = [
  {
    id: 1,
    beforeImage: villeneuveAvant,
    afterImage: villeneuveApres,
    beforeLabel: "Avant",
    afterLabel: "Après",
    title: "Appartement - Villeneuve-d'Ascq",
    description: "Rénovation complète avec pose de parquet et finitions",
  },
  {
    id: 2,
    beforeImage: null,
    afterImage: null,
    beforeLabel: "Avant",
    afterLabel: "Après",
    title: "Maison individuelle - Lille",
    description: "Fin de chantier construction neuve",
  },
  {
    id: 3,
    beforeImage: null,
    afterImage: null,
    beforeLabel: "Avant",
    afterLabel: "Après",
    title: "Bureaux - Roubaix",
    description: "Nettoyage après travaux d'aménagement",
  },
];

const GallerySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
    setSliderPosition(50);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + galleryItems.length) % galleryItems.length
    );
    setSliderPosition(50);
  };

  const currentItem = galleryItems[currentIndex];

  return (
    <section id="gallery" className="section-padding bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Nos réalisations
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Avant / Après : la différence Dernière Couche
          </h2>
          <p className="text-muted-foreground text-lg">
            Découvrez la transformation de nos chantiers. Chaque intervention
            garantit un résultat impeccable.
          </p>
        </div>

        {/* Gallery Slider */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-charcoal">
            {/* Before/After Comparison */}
            <div className="relative aspect-[16/10]">
              {/* Before Image */}
              {currentItem.beforeImage ? (
                <img
                  src={currentItem.beforeImage}
                  alt={`${currentItem.title} - Avant`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate/80 to-charcoal flex items-center justify-center">
                  <div className="text-center text-white/60">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-4xl">🏗️</span>
                    </div>
                    <p className="text-lg font-medium">Photo avant travaux</p>
                    <p className="text-sm opacity-60 mt-1">
                      (Ajoutez vos propres photos)
                    </p>
                  </div>
                </div>
              )}

              {/* After Image */}
              <div
                className="absolute inset-0"
                style={{
                  clipPath: `inset(0 0 0 ${sliderPosition}%)`,
                }}
              >
                {currentItem.afterImage ? (
                  <img
                    src={currentItem.afterImage}
                    alt={`${currentItem.title} - Après`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-teal/20 to-primary/30 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="text-4xl">✨</span>
                      </div>
                      <p className="text-lg font-medium">Photo après nettoyage</p>
                      <p className="text-sm opacity-60 mt-1">
                        (Ajoutez vos propres photos)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Slider Control */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <div className="flex gap-0.5">
                    <ChevronLeft className="w-4 h-4 text-primary" />
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </div>

              {/* Slider Input */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
              />

              {/* Labels */}
              <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-charcoal/80 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                {currentItem.beforeLabel}
              </div>
              <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-teal/90 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                {currentItem.afterLabel}
              </div>
            </div>

            {/* Info Bar */}
            <div className="p-6 bg-card border-t border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-display font-semibold text-foreground">
                    {currentItem.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {currentItem.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevSlide}
                    className="rounded-full"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <span className="text-sm text-muted-foreground px-2">
                    {currentIndex + 1} / {galleryItems.length}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextSlide}
                    className="rounded-full"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
