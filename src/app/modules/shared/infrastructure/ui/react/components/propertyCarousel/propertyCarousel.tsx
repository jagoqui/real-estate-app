import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bath, Bed, ChevronLeft, ChevronRight, Mail, MapPin, Maximize } from 'lucide-react';
import { useState } from 'react';

const properties = [
  {
    id: 1,
    name: 'Villa Moderna Mediterránea',
    location: 'Marbella, España',
    price: 4500000,
    bedrooms: 5,
    bathrooms: 6,
    area: 450,
    image: '/modern-luxury-villa-with-infinity-pool-mediterrane.jpg',
  },
  {
    id: 2,
    name: 'Penthouse Contemporáneo',
    location: 'Miami Beach, Florida',
    price: 8900000,
    bedrooms: 4,
    bathrooms: 5,
    area: 380,
    image: '/luxury-penthouse-with-ocean-view-modern-interior.jpg',
  },
  {
    id: 3,
    name: 'Mansión Colonial Renovada',
    location: 'Cartagena, Colombia',
    price: 3200000,
    bedrooms: 6,
    bathrooms: 7,
    area: 520,
    image: '/colonial-mansion-luxury-courtyard-pool.jpg',
  },
  {
    id: 4,
    name: 'Residencia Minimalista',
    location: 'Los Cabos, México',
    price: 5600000,
    bedrooms: 4,
    bathrooms: 5,
    area: 400,
    image: '/minimalist-luxury-beach-house-modern-architecture.jpg',
  },
  {
    id: 5,
    name: 'Chalet Alpino de Lujo',
    location: 'Aspen, Colorado',
    price: 12500000,
    bedrooms: 7,
    bathrooms: 8,
    area: 650,
    image: '/luxury-alpine-chalet-mountain-view-modern-rustic.jpg',
  },
];

// eslint-disable-next-line max-lines-per-function
export const PropertyCarousel = (): React.ReactElement => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = (): void => {
    setCurrentIndex(prev => (prev + 1) % properties.length);
  };

  const prevSlide = (): void => {
    setCurrentIndex(prev => (prev - 1 + properties.length) % properties.length);
  };

  const currentProperty = properties[currentIndex];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-balance">Encuentra tu propiedad ideal</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Una selección exclusiva de las propiedades más excepcionales disponibles
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative group">
            <Card className="overflow-hidden border-0 shadow-2xl">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-[400px] md:h-[600px] overflow-hidden">
                    <img
                      src={currentProperty.image || '/placeholder.svg'}
                      alt={currentProperty.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-6 right-6 bg-accent text-accent-foreground px-4 py-2 rounded-sm text-sm font-medium">
                      {currentProperty.price} €
                    </div>
                  </div>

                  <div className="p-8 md:p-12 flex flex-col justify-center bg-card">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-serif mb-3 text-balance">{currentProperty.name}</h3>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{currentProperty.location}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-6 py-6 border-y border-border">
                        <div className="text-center">
                          <Bed className="w-6 h-6 mx-auto mb-2 text-accent" />
                          <div className="text-2xl font-semibold">{currentProperty.bedrooms}</div>
                          <div className="text-sm text-muted-foreground">Habitaciones</div>
                        </div>
                        <div className="text-center">
                          <Bath className="w-6 h-6 mx-auto mb-2 text-accent" />
                          <div className="text-2xl font-semibold">{currentProperty.bathrooms}</div>
                          <div className="text-sm text-muted-foreground">Baños</div>
                        </div>
                        <div className="text-center">
                          <Maximize className="w-6 h-6 mx-auto mb-2 text-accent" />
                          <div className="text-2xl font-semibold">{currentProperty.area}</div>
                          <div className="text-sm text-muted-foreground">m²</div>
                        </div>
                      </div>

                      <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-base">Ver detalles</Button>
                      <Button
                        variant="outline"
                        className="w-full h-12 gap-2 text-base mt-3 bg-transparent"
                        onClick={e => {
                          e.preventDefault();
                          console.log('[v0] Contact agent for property:', currentProperty.id);
                        }}
                      >
                        <Mail className="h-5 w-5" />
                        Contactar agente
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm border-border hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm border-border hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {properties.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? 'w-8 bg-accent' : 'w-2 bg-border hover:bg-accent/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
