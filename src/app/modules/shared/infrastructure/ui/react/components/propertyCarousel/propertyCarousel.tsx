import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/modules/shared/infrastructure/ui/shadcn/components/ui/skeleton';
import { Link } from '@tanstack/react-router';
import { Bath, Bed, ChevronLeft, ChevronRight, Mail, MapPin, Maximize } from 'lucide-react';
import { useState } from 'react';
import { PATHNAME_ROUTES } from '../../constants/main.constants';
import { useGetPropertiesRequest } from '../../hooks/useGetProperties/useGetPropertiesRequest';

// eslint-disable-next-line max-lines-per-function
export const PropertyCarousel = (): React.ReactElement => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { isPending, error, data } = useGetPropertiesRequest({
    filterByFeatured: true,
  });

  const nextSlide = (): void => {
    if (!data?.length) return;
    setCurrentIndex(prev => (prev + 1) % data.length);
  };

  const prevSlide = (): void => {
    if (!data?.length) return;
    setCurrentIndex(prev => (prev - 1 + data.length) % data.length);
  };

  if (isPending) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-[600px] mx-auto" />
          </div>

          <div className="max-w-6xl mx-auto">
            <Card className="overflow-hidden border-0 shadow-2xl">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  <Skeleton className="h-[400px] md:h-[600px]" />
                  <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-6 w-1/2" />
                    <div className="grid grid-cols-3 gap-6 py-6">
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-20 w-full" />
                    </div>
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-balance">Find your ideal property</h2>
            <div className="max-w-2xl mx-auto mt-8 p-6 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive font-semibold mb-2">Error loading properties</p>
              <p className="text-sm text-muted-foreground">{error.message}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!data || data.length === 0) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-balance">Find your ideal property</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-8">
              No properties available at the moment. Please check back later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const currentProperty = data[currentIndex];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-balance">Find your ideal property</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            An exclusive selection of the most exceptional properties available
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative group">
            <Card className="overflow-hidden border-0 shadow-2xl">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-[400px] md:h-[600px] overflow-hidden">
                    <img
                      src={currentProperty?.coverImage || '/placeholder.svg'}
                      alt={currentProperty.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-6 right-6 bg-accent text-accent-foreground px-4 py-2 rounded-sm text-sm font-medium">
                      $ {currentProperty.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-8 md:p-12 flex flex-col justify-center bg-card">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-serif mb-3 text-balance">{currentProperty.name}</h3>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>
                            {currentProperty.address}, {currentProperty.city}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-6 py-6 border-y border-border">
                        <div className="text-center">
                          <Bed className="w-6 h-6 mx-auto mb-2 text-accent" />
                          <div className="text-2xl font-semibold">{currentProperty.bedrooms}</div>
                          <div className="text-sm text-muted-foreground">Bedrooms</div>
                        </div>
                        <div className="text-center">
                          <Bath className="w-6 h-6 mx-auto mb-2 text-accent" />
                          <div className="text-2xl font-semibold">{currentProperty.bathrooms}</div>
                          <div className="text-sm text-muted-foreground">Bathrooms</div>
                        </div>
                        <div className="text-center">
                          <Maximize className="w-6 h-6 mx-auto mb-2 text-accent" />
                          <div className="text-2xl font-semibold">{currentProperty.area}</div>
                          <div className="text-sm text-muted-foreground">m²</div>
                        </div>
                      </div>
                      {/* TODO: Implementar inferencias de params en Link */}
                      <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-base">
                        <Link to={PATHNAME_ROUTES.PROPERTY_DETAILS} params={{ propertyId: currentProperty.id }}>
                          View details
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full h-12 gap-2 text-base mt-3 bg-transparent"
                        onClick={e => {
                          e.preventDefault();
                          // Contact agent functionality
                        }}
                      >
                        <Mail className="h-5 w-5" />
                        Contact agent
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
            {data.map((property, index) => (
              <button
                key={property.id}
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
