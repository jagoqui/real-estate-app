import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { DynamicIcon } from '@/modules/shared/infrastructure/ui/react/components/dynamic-icon/dynamic-icon';
import { PATHNAME_ROUTES } from '@/modules/shared/infrastructure/ui/react/constants/main.constants';
import { useGetPropertyByIdRequest } from '@/modules/shared/infrastructure/ui/react/hooks/useGetPropertyByIdRequest/useGetPropertyByIdRequest';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Link, useLocation } from '@tanstack/react-router';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Bath,
  Bed,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Heart,
  Home,
  Mail,
  MapPin,
  Maximize,
  Phone,
  Share2,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: (() => string) | undefined })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
};

const getStatusBadgeClass = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'sold':
      return 'bg-destructive text-destructive-foreground';
    case 'available':
      return 'bg-green-600 text-white';
    case 'pending':
      return 'bg-yellow-600 text-white';
    case 'rented':
      return 'bg-blue-600 text-white';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

// eslint-disable-next-line max-lines-per-function
export const PropertyDetailLayout = (): React.ReactElement => {
  const location = useLocation();
  const propertyId = location.pathname.split('/').pop() || '';
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const { isPending, error, data: property } = useGetPropertyByIdRequest({ propertyId });

  if (isPending) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Error fetching property</h1>
          <p className="text-muted-foreground">{error.message}</p>
          <Link to={PATHNAME_ROUTES.PROPERTIES}>
            <Button>View all properties</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Property not found</h1>
          <Link to={PATHNAME_ROUTES.PROPERTIES}>
            <Button>View all properties</Button>
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [property.coverImage || property.images[0], ...property.images].filter(Boolean);
  const currentUrl = window.location.href;

  const handleShare = async (method: 'copy' | 'email' | 'whatsapp'): Promise<void> => {
    const LINK_COPIED_TIMEOUT = 2000;
    const SHARE_MENU_CLOSE_DELAY = 1500;

    switch (method) {
      case 'copy': {
        const copied = await copyToClipboard(currentUrl);
        setLinkCopied(copied);
        setTimeout(() => setLinkCopied(false), LINK_COPIED_TIMEOUT);
        // Wait before closing menu so user can see the "Copied!" feedback
        setTimeout(() => setShowShareMenu(false), SHARE_MENU_CLOSE_DELAY);
        break;
      }
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(property.name)}&body=${encodeURIComponent(`Check out this property: ${currentUrl}`)}`;
        setShowShareMenu(false);
        break;
      case 'whatsapp':
        window.open(
          `https://wa.me/?text=${encodeURIComponent(`Check out this property: ${property.name} - ${currentUrl}`)}`,
          '_blank'
        );
        setShowShareMenu(false);
        break;
    }
  };

  const nextImage = (): void => {
    setCurrentImageIndex(prev => (prev + 1) % allImages.length);
  };

  const prevImage = (): void => {
    setCurrentImageIndex(prev => (prev - 1 + allImages.length) % allImages.length);
  };

  const SMALL_IMAGES_COUNT = 3;

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to={PATHNAME_ROUTES.PROPERTIES}>
          <Button variant="ghost" className="mb-6">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to properties
          </Button>
        </Link>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8 h-[500px]">
          <div className="lg:col-span-3 relative h-full rounded-lg overflow-hidden group cursor-pointer">
            <img
              src={property.coverImage || property.images[0] || '/placeholder.svg'}
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
              View all photos ({allImages.length})
            </Button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {property.images.slice(0, SMALL_IMAGES_COUNT).map((image, index) => (
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
                  alt={`${property.name} ${index + 1}`}
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
            <DialogTitle className="sr-only">Image gallery</DialogTitle>
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-50 bg-white/10 text-white hover:bg-white/20"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close gallery"
              >
                <X className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/50 text-white hover:bg-white/70"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/50 text-white hover:bg-white/70"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
              <div className="relative w-full h-full">
                <img
                  src={allImages[currentImageIndex] || '/placeholder.svg'}
                  alt={`${property.name} ${currentImageIndex + 1}`}
                  className="object-contain size-full"
                  aria-labelledby="lightbox-title"
                />
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
                {currentImageIndex + 1} / {allImages.length}
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
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="h-5 w-5" />
                    <span className="text-lg">
                      {property.city}, {property.state}, {property.country}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">{property.address}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <div className="relative">
                    <Button size="icon" variant="outline" onClick={() => setShowShareMenu(!showShareMenu)}>
                      <Share2 className="h-5 w-5" />
                    </Button>
                    {showShareMenu && (
                      <Card className="absolute right-0 top-12 w-48 z-50 shadow-lg">
                        <CardContent className="p-2">
                          <button
                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-secondary rounded-md transition-colors text-left"
                            onClick={() => void handleShare('copy')}
                          >
                            {linkCopied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                            <span className="text-sm">{linkCopied ? 'Link copied!' : 'Copy link'}</span>
                          </button>
                          <button
                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-secondary rounded-md transition-colors text-left"
                            onClick={() => void handleShare('email')}
                          >
                            <Mail className="h-4 w-4" />
                            <span className="text-sm">Share via email</span>
                          </button>
                          <button
                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-secondary rounded-md transition-colors text-left"
                            onClick={() => void handleShare('whatsapp')}
                          >
                            <Phone className="h-4 w-4" />
                            <span className="text-sm">Share via WhatsApp</span>
                          </button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <Badge variant="secondary" className="text-base px-4 py-1">
                  {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                </Badge>
                <Badge className={getStatusBadgeClass(property.status)}>
                  {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                </Badge>
                {property.featured && <Badge className="text-base px-4 py-1 bg-primary">Featured</Badge>}
              </div>
            </div>

            {/* Price and Stats */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Price</p>
                    <p className="text-4xl font-bold text-foreground">{formatPrice(property.price)}</p>
                  </div>
                  <Button size="lg">Schedule a visit</Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-secondary rounded-lg">
                      <Bed className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{property.bedrooms}</p>
                      <p className="text-sm text-muted-foreground">Bedrooms</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-secondary rounded-lg">
                      <Bath className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{property.bathrooms}</p>
                      <p className="text-sm text-muted-foreground">Bathrooms</p>
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
                      <Home className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{property.buildYear}</p>
                      <p className="text-sm text-muted-foreground">Built</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="virtual-tour">Virtual Tour</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Year built</p>
                        <p className="text-lg font-semibold">{property.buildYear}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Status</p>
                        <Badge className={getStatusBadgeClass(property.status)}>
                          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Property Type</p>
                        <p className="text-lg font-semibold">
                          {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Area</p>
                        <p className="text-lg font-semibold">{property.area} m²</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="features" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">Highlighted features</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {property.highlightedFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <h3 className="text-xl font-semibold mb-4 mt-8">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {property.amenities.map(amenity => (
                        <div key={amenity.name} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                          <DynamicIcon name={amenity.icon} className="h-5 w-5 text-foreground" />
                          <span className="text-sm">{amenity.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="virtual-tour">
                <Card>
                  <CardContent className="pt-6">
                    <div className="aspect-video bg-secondary rounded-lg overflow-hidden">
                      {property.views360Url && property.views360Url.length > 0 ? (
                        <iframe
                          src={property.views360Url[0]}
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          allowFullScreen
                          title="Virtual Tour"
                        />
                      ) : (
                        <div className="size-full flex items-center justify-center">
                          <div className="text-center">
                            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-lg font-semibold mb-2">Virtual Tour Not Available</p>
                            <p className="text-muted-foreground">Contact the agent to schedule a physical visit</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Map */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Location</h3>
                <p className="text-muted-foreground mb-4 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {property.address}, {property.city}, {property.state}, {property.country}
                </p>
                <div className="h-[400px] rounded-lg overflow-hidden border border-border">
                  <MapContainer
                    center={[parseFloat(property.location.lat), parseFloat(property.location.lon)]}
                    zoom={15}
                    scrollWheelZoom={false}
                    className="size-full"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[parseFloat(property.location.lat), parseFloat(property.location.lon)]}>
                      <Popup>
                        <div className="p-2">
                          <p className="font-semibold">{property.name}</p>
                          <p className="text-sm text-muted-foreground">{formatPrice(property.price)}</p>
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card - Hardcoded as requested */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Contact the agent</h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden">
                    <img
                      src="/professional-woman-realtor.jpg"
                      alt="Real Estate Agent"
                      className="object-cover size-full"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Maria Gonzalez</p>
                    <p className="text-sm text-muted-foreground">Luxury agent</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>+34 600 123 456</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>maria@luxeestates.com</span>
                  </div>
                </div>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="+34 600 000 000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="I'm interested in this property..." rows={4} />
                  </div>
                  <Button className="w-full" type="submit">
                    Send message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Schedule Visit */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Schedule a visit</h3>
                <p className="text-sm text-muted-foreground mb-4">Book a personalized visit to this property</p>
                <Button className="w-full bg-transparent" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Select date
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
