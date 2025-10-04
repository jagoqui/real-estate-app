/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { PATHNAME_ROUTES } from '@/modules/shared/infrastructure/ui/react/constants/main.constants';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Link } from '@tanstack/react-router';
import {
  Bath,
  Bed,
  Calendar,
  Car,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Heart,
  Mail,
  MapPin,
  Maximize,
  Phone,
  Share2,
  Shield,
  Trees,
  Waves,
  Wifi,
  X,
} from 'lucide-react';
import { useState } from 'react';

// Mock data - in production this would come from a database
const propertyData = {
  1: {
    id: 1,
    name: 'Villa Mediterránea',
    location: 'Marbella, España',
    price: 8500000,
    type: 'Villa',
    bedrooms: 6,
    bathrooms: 7,
    area: 850,
    parking: 4,
    yearBuilt: 2020,
    status: 'available',
    featured: true,
    description:
      'Espectacular villa mediterránea ubicada en una de las zonas más exclusivas de Marbella. Esta propiedad única combina elegancia clásica con comodidades modernas, ofreciendo vistas panorámicas al mar Mediterráneo y a las montañas. Diseñada por arquitectos de renombre internacional, cada detalle ha sido cuidadosamente seleccionado para crear un ambiente de lujo y sofisticación.',
    features: [
      'Piscina infinita con vistas al mar',
      'Gimnasio completamente equipado',
      'Bodega de vinos climatizada',
      'Sistema de domótica integral',
      'Jardines diseñados por paisajistas',
      'Cocina gourmet con electrodomésticos de alta gama',
      'Suite principal con vestidor y terraza privada',
      'Sistema de seguridad 24/7',
    ],
    amenities: [
      { icon: Wifi, label: 'WiFi de alta velocidad' },
      { icon: Dumbbell, label: 'Gimnasio privado' },
      { icon: Waves, label: 'Piscina infinita' },
      { icon: Trees, label: 'Jardín paisajístico' },
      { icon: Shield, label: 'Seguridad 24/7' },
      { icon: Car, label: 'Garaje para 4 autos' },
    ],
    images: [
      '/luxury-mediterranean-villa.jpg',
      '/luxury-villa-exterior-pool.jpg',
      '/luxury-villa-living-room.png',
      '/luxury-villa-master-bedroom.png',
      '/luxury-villa-kitchen.png',
      '/luxury-villa-bathroom.png',
    ],
    agent: {
      name: 'María González',
      phone: '+34 600 123 456',
      email: 'maria@luxeestates.com',
      image: '/professional-woman-realtor.jpg',
    },
  },
};

// eslint-disable-next-line max-lines-per-function
export const PropertyDetailLayout = (): React.ReactElement => {
  const property = propertyData[1];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Propiedad no encontrada</h1>
          <Link to={PATHNAME_ROUTES.PROPERTIES}>
            <Button>Ver todas las propiedades</Button>
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = (): void => {
    setCurrentImageIndex(prev => (prev + 1) % property.images.length);
  };

  const prevImage = (): void => {
    setCurrentImageIndex(prev => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to={PATHNAME_ROUTES.PROPERTIES}>
          <Button variant="ghost" className="mb-6">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Volver a propiedades
          </Button>
        </Link>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          <div className="lg:col-span-3 relative h-[500px] rounded-lg overflow-hidden group cursor-pointer">
            <img
              src={property.images[0] || '/placeholder.svg'}
              alt={property.name}
              className="object-cover size-full"
              onClick={() => {
                setCurrentImageIndex(0);
                setIsLightboxOpen(true);
              }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            <Button
              variant="secondary"
              className="absolute bottom-4 right-4"
              onClick={() => {
                setCurrentImageIndex(0);
                setIsLightboxOpen(true);
              }}
            >
              Ver todas las fotos ({property.images.length})
            </Button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {property.images.slice(1, 4).map((image, index) => (
              <div
                key={index}
                className="relative h-[160px] rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => {
                  setCurrentImageIndex(index + 1);
                  setIsLightboxOpen(true);
                }}
              >
                <img
                  src={image || '/placeholder.svg'}
                  alt={`${property.name} ${index + 2}`}
                  className="object-cover size-full"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
          <DialogContent className="max-w-7xl h-[90vh] p-0">
            <DialogTitle className="sr-only">Galería de imágenes</DialogTitle>
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-50 bg-white/10 text-white hover:bg-white/20"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Cerrar galería"
              >
                <X className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/50 text-white hover:bg-white/70"
                onClick={prevImage}
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/50 text-white hover:bg-white/70"
                onClick={nextImage}
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
              <div className="relative w-full h-full">
                <img
                  src={property.images[currentImageIndex] || '/placeholder.svg'}
                  alt={`${property.name} ${currentImageIndex + 1}`}
                  className="object-contain size-full"
                  aria-labelledby="lightbox-title"
                />
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
                {currentImageIndex + 1} / {property.images.length}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="font-serif text-4xl font-bold text-foreground mb-2">{property.name}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-5 w-5" />
                    <span className="text-lg">{property.location}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="text-base px-4 py-1">
                  {property.type}
                </Badge>
                {property.featured && <Badge className="text-base px-4 py-1">Destacada</Badge>}
              </div>
            </div>

            {/* Price and Stats */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Precio</p>
                    <p className="text-4xl font-bold text-foreground">${(property.price / 1000000).toFixed(1)}M</p>
                  </div>
                  <Button size="lg">Agendar visita</Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-secondary rounded-lg">
                      <Bed className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{property.bedrooms}</p>
                      <p className="text-sm text-muted-foreground">Habitaciones</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-secondary rounded-lg">
                      <Bath className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{property.bathrooms}</p>
                      <p className="text-sm text-muted-foreground">Baños</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-secondary rounded-lg">
                      <Maximize className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{property.area}</p>
                      <p className="text-sm text-muted-foreground">m²</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-secondary rounded-lg">
                      <Car className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{property.parking}</p>
                      <p className="text-sm text-muted-foreground">Estacionamientos</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Descripción</TabsTrigger>
                <TabsTrigger value="features">Características</TabsTrigger>
                <TabsTrigger value="virtual-tour">Tour Virtual</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Año de construcción</p>
                        <p className="text-lg font-semibold">{property.yearBuilt}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Estado</p>
                        <Badge variant="secondary">Disponible</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="features" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">Características destacadas</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {property.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <h3 className="text-xl font-semibold mb-4 mt-8">Amenidades</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {property.amenities.map((amenity, index) => {
                        const Icon = amenity.icon;
                        return (
                          <div key={index} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                            <Icon className="h-5 w-5 text-foreground" />
                            <span className="text-sm">{amenity.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="virtual-tour">
                <Card>
                  <CardContent className="pt-6">
                    <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-lg font-semibold mb-2">Tour Virtual 360°</p>
                        <p className="text-muted-foreground mb-4">
                          Explora esta propiedad desde la comodidad de tu hogar
                        </p>
                        <Button>Iniciar Tour Virtual</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Map */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Ubicación</h3>
                <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">{property.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Contacta al agente</h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden">
                    <img
                      src={property.agent.image || '/placeholder.svg'}
                      alt={property.agent.name}
                      className="object-cover size-full"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{property.agent.name}</p>
                    <p className="text-sm text-muted-foreground">Agente de lujo</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{property.agent.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{property.agent.email}</span>
                  </div>
                </div>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" placeholder="Tu nombre" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="tu@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" type="tel" placeholder="+34 600 000 000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea id="message" placeholder="Estoy interesado en esta propiedad..." rows={4} />
                  </div>
                  <Button className="w-full" type="submit">
                    Enviar mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Schedule Visit */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Agendar visita</h3>
                <p className="text-sm text-muted-foreground mb-4">Programa una visita personalizada a esta propiedad</p>
                <Button className="w-full bg-transparent" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Seleccionar fecha
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
