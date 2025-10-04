'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PATHNAME_ROUTES } from '@/modules/shared/infrastructure/ui/react/constants/main.constants';
import { Link } from '@tanstack/react-router';
import { Award, Mail, MapPin, Phone, Search, Star } from 'lucide-react';
import { useState } from 'react';
const agents = [
  {
    id: 1,
    name: 'María González',
    role: 'Directora de Ventas',
    specialization: 'Propiedades de lujo en España',
    phone: '+34 600 123 456',
    email: 'maria@luxeestates.com',
    location: 'Marbella, España',
    image: '/professional-woman-realtor.jpg',
    propertiesSold: 127,
    yearsExperience: 15,
    languages: ['Español', 'Inglés', 'Francés'],
    rating: 4.9,
    featured: true,
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    role: 'Agente Senior',
    specialization: 'Villas mediterráneas',
    phone: '+34 600 234 567',
    email: 'carlos@luxeestates.com',
    location: 'Barcelona, España',
    image: '/professional-man-realtor.jpg',
    propertiesSold: 98,
    yearsExperience: 12,
    languages: ['Español', 'Inglés', 'Italiano'],
    rating: 4.8,
    featured: true,
  },
  {
    id: 3,
    name: 'Sophie Laurent',
    role: 'Agente Internacional',
    specialization: 'Propiedades en Francia',
    phone: '+33 6 12 34 56 78',
    email: 'sophie@luxeestates.com',
    location: 'París, Francia',
    image: '/french-woman-realtor.jpg',
    propertiesSold: 85,
    yearsExperience: 10,
    languages: ['Francés', 'Inglés', 'Español'],
    rating: 4.9,
    featured: true,
  },
  {
    id: 4,
    name: 'Alessandro Rossi',
    role: 'Especialista en Toscana',
    specialization: 'Villas italianas',
    phone: '+39 333 123 4567',
    email: 'alessandro@luxeestates.com',
    location: 'Florencia, Italia',
    image: '/italian-man-realtor.jpg',
    propertiesSold: 72,
    yearsExperience: 9,
    languages: ['Italiano', 'Inglés', 'Español'],
    rating: 4.7,
    featured: false,
  },
  {
    id: 5,
    name: 'Emma Thompson',
    role: 'Agente de Lujo',
    specialization: 'Propiedades costeras',
    phone: '+1 310 555 0123',
    email: 'emma@luxeestates.com',
    location: 'Los Ángeles, USA',
    image: '/american-woman-realtor.jpg',
    propertiesSold: 115,
    yearsExperience: 14,
    languages: ['Inglés', 'Español'],
    rating: 4.9,
    featured: false,
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Consultor Inmobiliario',
    specialization: 'Inversiones de alto valor',
    phone: '+44 20 7123 4567',
    email: 'james@luxeestates.com',
    location: 'Londres, UK',
    image: '/british-man-realtor.jpg',
    propertiesSold: 93,
    yearsExperience: 11,
    languages: ['Inglés', 'Francés'],
    rating: 4.8,
    featured: false,
  },
];

// eslint-disable-next-line max-lines-per-function
export const AgentsLayout = (): React.ReactElement => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAgents = agents.filter(
    agent =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredAgents = filteredAgents.filter(agent => agent.featured);
  const otherAgents = filteredAgents.filter(agent => !agent.featured);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="font-serif text-5xl font-bold text-foreground mb-4">Nuestro Equipo de Expertos</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Profesionales dedicados con años de experiencia en el mercado inmobiliario de lujo internacional
          </p>
        </div>

        {/* Search */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, especialización o ubicación..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Featured Agents */}
        {featuredAgents.length > 0 && (
          <div className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8">Agentes Destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredAgents.map(agent => (
                <Card key={agent.id} className="group hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative h-80 overflow-hidden rounded-t-lg">
                      <img
                        src={agent.image || '/placeholder.svg'}
                        alt={agent.name}
                        className="object-cover group-hover:scale-105 transition-transform duration-500 size-full"
                      />
                      <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">Destacado</Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-2xl font-semibold text-foreground mb-1">{agent.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{agent.role}</p>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-sm">
                          <Award className="h-4 w-4 text-muted-foreground" />
                          <span>{agent.specialization}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{agent.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold">{agent.rating}</span>
                          <span className="text-muted-foreground">({agent.propertiesSold} ventas)</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {agent.languages.map(lang => (
                          <Badge key={lang} variant="secondary">
                            {lang}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-secondary rounded-lg">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-foreground">{agent.propertiesSold}</p>
                          <p className="text-xs text-muted-foreground">Propiedades vendidas</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-foreground">{agent.yearsExperience}</p>
                          <p className="text-xs text-muted-foreground">Años de experiencia</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <a
                          href={`tel:${agent.phone}`}
                          className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                        >
                          <Phone className="h-4 w-4" />
                          <span>{agent.phone}</span>
                        </a>
                        <a
                          href={`mailto:${agent.email}`}
                          className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                        >
                          <Mail className="h-4 w-4" />
                          <span>{agent.email}</span>
                        </a>
                      </div>

                      <Button className="w-full">Contactar agente</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Other Agents */}
        {otherAgents.length > 0 && (
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8">Más Agentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherAgents.map(agent => (
                <Card key={agent.id} className="group hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative h-80 overflow-hidden rounded-t-lg">
                      <img
                        src={agent.image || '/placeholder.svg'}
                        alt={agent.name}
                        className="object-cover group-hover:scale-105 transition-transform duration-500 size-full"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-2xl font-semibold text-foreground mb-1">{agent.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{agent.role}</p>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-sm">
                          <Award className="h-4 w-4 text-muted-foreground" />
                          <span>{agent.specialization}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{agent.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold">{agent.rating}</span>
                          <span className="text-muted-foreground">({agent.propertiesSold} ventas)</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {agent.languages.map(lang => (
                          <Badge key={lang} variant="secondary">
                            {lang}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-secondary rounded-lg">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-foreground">{agent.propertiesSold}</p>
                          <p className="text-xs text-muted-foreground">Propiedades vendidas</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-foreground">{agent.yearsExperience}</p>
                          <p className="text-xs text-muted-foreground">Años de experiencia</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <a
                          href={`tel:${agent.phone}`}
                          className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                        >
                          <Phone className="h-4 w-4" />
                          <span>{agent.phone}</span>
                        </a>
                        <a
                          href={`mailto:${agent.email}`}
                          className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                        >
                          <Mail className="h-4 w-4" />
                          <span>{agent.email}</span>
                        </a>
                      </div>

                      <Button className="w-full bg-transparent" variant="outline">
                        Contactar agente
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No se encontraron agentes con los criterios de búsqueda</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center bg-secondary rounded-lg p-12">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
            ¿Necesitas asesoramiento personalizado?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nuestro equipo de expertos está listo para ayudarte a encontrar la propiedad perfecta
          </p>
          <Link to={PATHNAME_ROUTES.CONTACT}>
            <Button size="lg">Contactar con el equipo</Button>
          </Link>
        </div>
      </main>
    </div>
  );
};
