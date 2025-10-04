/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Link } from '@tanstack/react-router';
import { Bath, Bed, Heart, Mail, MapPin, Maximize, Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

const properties = [
  {
    id: 1,
    name: 'Villa Mediterránea',
    location: 'Marbella, España',
    price: 8500000,
    type: 'Villa',
    bedrooms: 6,
    bathrooms: 7,
    area: 850,
    image: '/luxury-mediterranean-villa.jpg',
    status: 'available',
    featured: true,
  },
  {
    id: 2,
    name: 'Penthouse Manhattan',
    location: 'Nueva York, USA',
    price: 15000000,
    type: 'Penthouse',
    bedrooms: 4,
    bathrooms: 5,
    area: 450,
    image: '/luxury-manhattan-penthouse.jpg',
    status: 'available',
    featured: true,
  },
  {
    id: 3,
    name: 'Château Provenzal',
    location: 'Provence, Francia',
    price: 12000000,
    type: 'Château',
    bedrooms: 8,
    bathrooms: 9,
    area: 1200,
    image: '/french-chateau-provence.jpg',
    status: 'available',
    featured: false,
  },
  {
    id: 4,
    name: 'Beach House Malibu',
    location: 'Malibu, California',
    price: 18500000,
    type: 'Beach House',
    bedrooms: 5,
    bathrooms: 6,
    area: 650,
    image: '/malibu-beach-house-luxury.jpg',
    status: 'available',
    featured: true,
  },
  {
    id: 5,
    name: 'Apartamento Parisino',
    location: 'París, Francia',
    price: 6500000,
    type: 'Apartamento',
    bedrooms: 3,
    bathrooms: 3,
    area: 280,
    image: '/luxury-paris-apartment.png',
    status: 'sold',
    featured: false,
  },
  {
    id: 6,
    name: 'Villa Toscana',
    location: 'Toscana, Italia',
    price: 9800000,
    type: 'Villa',
    bedrooms: 7,
    bathrooms: 8,
    area: 950,
    image: '/tuscany-villa-luxury.jpg',
    status: 'available',
    featured: false,
  },
];

// eslint-disable-next-line max-lines-per-function
export const PropertiesLayout = (): React.ReactElement => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 20000000]);
  const [propertyType, setPropertyType] = useState('all');
  const [bedrooms, setBedrooms] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProperties = properties
    .filter(property => {
      const matchesSearch =
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
      const matchesType = propertyType === 'all' || property.type === propertyType;
      const matchesBedrooms = bedrooms === 'all' || property.bedrooms >= Number.parseInt(bedrooms);
      return matchesSearch && matchesPrice && matchesType && matchesBedrooms;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'featured') return b.featured ? 1 : -1;
      return 0;
    });

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 pt-32">
        <div className="mb-12 text-center">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Propiedades Exclusivas
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubre nuestra selección curada de propiedades de lujo en las ubicaciones más prestigiosas del mundo
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o ubicación..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
            </Button>
          </div>

          {showFilters && (
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label>Tipo de Propiedad</Label>
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="Villa">Villa</SelectItem>
                        <SelectItem value="Penthouse">Penthouse</SelectItem>
                        <SelectItem value="Château">Château</SelectItem>
                        <SelectItem value="Beach House">Beach House</SelectItem>
                        <SelectItem value="Apartamento">Apartamento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Habitaciones</Label>
                    <Select value={bedrooms} onValueChange={setBedrooms}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                        <SelectItem value="5">5+</SelectItem>
                        <SelectItem value="6">6+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Ordenar por</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Destacadas</SelectItem>
                        <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                        <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Rango de Precio</Label>
                    <div className="pt-2">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={20000000}
                        step={500000}
                        className="w-full"
                      />
                      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                        <span>${(priceRange[0] / 1000000).toFixed(1)}M</span>
                        <span>${(priceRange[1] / 1000000).toFixed(1)}M</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredProperties.length}{' '}
            {filteredProperties.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map(property => (
            <Link to={property.id.toString()} key={property.id}>
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={property.image || '/placeholder.svg'}
                    alt={property.name}
                    className="object-cover group-hover:scale-110 transition-transform duration-500 size-full"
                  />
                  {property.featured && (
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">Destacada</Badge>
                  )}
                  {property.status === 'sold' && (
                    <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">Vendida</Badge>
                  )}
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={e => {
                      e.preventDefault();
                      console.log('[v0] Added to favorites:', property.id);
                    }}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground">{property.name}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize className="h-4 w-4" />
                      <span>{property.area}m²</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-2xl sm:text-3xl font-bold text-foreground">
                      ${(property.price / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <Button
                    className="w-full mt-4 gap-2 bg-transparent"
                    variant="outline"
                    onClick={e => {
                      e.preventDefault();
                      console.log('[v0] Contact agent for property:', property.id);
                    }}
                  >
                    <Mail className="h-4 w-4" />
                    Contactar Agente
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No se encontraron propiedades con los filtros seleccionados</p>
          </div>
        )}
      </main>
    </div>
  );
};
