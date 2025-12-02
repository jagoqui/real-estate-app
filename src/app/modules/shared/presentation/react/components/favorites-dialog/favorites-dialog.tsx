/* eslint-disable @typescript-eslint/no-magic-numbers */

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from '@tanstack/react-router';
import { Bath, Bed, Heart, Mail, MapPin, Maximize } from 'lucide-react';
import { useState } from 'react';
import { PATHNAME_ROUTES } from '../../constants/main.constants';

// Mock data - replace with actual data
const mockFavorites = [
  {
    id: '1',
    name: 'Modern Villa in Beverly Hills',
    address: '123 Luxury Lane',
    city: 'Beverly Hills',
    state: 'CA',
    price: 12500000,
    bedrooms: 6,
    bathrooms: 8,
    area: 8500,
    images: ['/modern-luxury-villa.png'],
  },
  {
    id: '2',
    name: 'Penthouse with Ocean View',
    address: '456 Ocean Drive',
    city: 'Miami',
    state: 'FL',
    price: 8900000,
    bedrooms: 4,
    bathrooms: 5,
    area: 5200,
    images: ['/luxury-penthouse-ocean-view.jpg'],
  },
];

interface FavoritesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// eslint-disable-next-line max-lines-per-function
export const FavoritesDialog = ({ open, onOpenChange }: FavoritesDialogProps): React.ReactElement => {
  const [favorites, setFavorites] = useState(mockFavorites);

  const removeFavorite = (id: string): void => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-serif">My Favorites</DialogTitle>
          <p className="text-sm text-muted-foreground">Properties you have saved to review later</p>
        </DialogHeader>

        <ScrollArea className="px-6 pb-6">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Heart className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-serif mb-2">You have no favorites yet</h3>
              <p className="text-muted-foreground mb-6 text-center">Explore our properties and save your favorites</p>
              <Link to={PATHNAME_ROUTES.PROPERTIES} onClick={() => onOpenChange(false)}>
                <Button>View Properties</Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {favorites.map(property => (
                <Card key={property.id} className="overflow-hidden group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={property.images[0] || '/placeholder.svg'}
                      alt={property.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-4 right-4 rounded-full"
                      onClick={() => removeFavorite(property.id)}
                    >
                      <Heart className="w-4 h-4 fill-current text-red-500" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <h3 className="text-lg font-serif mb-1 line-clamp-1">{property.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span className="line-clamp-1">
                          {property.address}, {property.city}, {property.state}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-3 text-xs">
                      <div className="flex items-center gap-1">
                        <Bed className="w-3 h-3 text-muted-foreground" />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-3 h-3 text-muted-foreground" />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Maximize className="w-3 h-3 text-muted-foreground" />
                        <span>{property.area.toLocaleString()} ft²</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <p className="text-xl font-serif">${(property.price / 1000000).toFixed(1)}M</p>
                      <div className="flex gap-2">
                        <Link to={`${PATHNAME_ROUTES.PROPERTIES}/${property.id}`} onClick={() => onOpenChange(false)}>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                        <Button size="sm" className="gap-2">
                          <Mail className="w-3 h-3" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
