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
    role: 'Sales Director',
    specialization: 'Luxury properties in Spain',
    phone: '+34 600 123 456',
    email: 'maria@luxeestates.com',
    location: 'Marbella, Spain',
    image: '/professional-woman-realtor.jpg',
    propertiesSold: 127,
    yearsExperience: 15,
    languages: ['Spanish', 'English', 'French'],
    rating: 4.9,
    featured: true,
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    role: 'Senior Agent',
    specialization: 'Mediterranean villas',
    phone: '+34 600 234 567',
    email: 'carlos@luxeestates.com',
    location: 'Barcelona, Spain',
    image: '/professional-man-realtor.jpg',
    propertiesSold: 98,
    yearsExperience: 12,
    languages: ['Spanish', 'English', 'Italian'],
    rating: 4.8,
    featured: true,
  },
  {
    id: 3,
    name: 'Sophie Laurent',
    role: 'International Agent',
    specialization: 'Properties in France',
    phone: '+33 6 12 34 56 78',
    email: 'sophie@luxeestates.com',
    location: 'Paris, France',
    image: '/french-woman-realtor.jpg',
    propertiesSold: 85,
    yearsExperience: 10,
    languages: ['French', 'English', 'Spanish'],
    rating: 4.9,
    featured: true,
  },
  {
    id: 4,
    name: 'Alessandro Rossi',
    role: 'Tuscany Specialist',
    specialization: 'Italian villas',
    phone: '+39 333 123 4567',
    email: 'alessandro@luxeestates.com',
    location: 'Florence, Italy',
    image: '/italian-man-realtor.jpg',
    propertiesSold: 72,
    yearsExperience: 9,
    languages: ['Italian', 'English', 'Spanish'],
    rating: 4.7,
    featured: false,
  },
  {
    id: 5,
    name: 'Emma Thompson',
    role: 'Luxury Agent',
    specialization: 'Coastal properties',
    phone: '+1 310 555 0123',
    email: 'emma@luxeestates.com',
    location: 'Los Angeles, USA',
    image: '/american-woman-realtor.jpg',
    propertiesSold: 115,
    yearsExperience: 14,
    languages: ['English', 'Spanish'],
    rating: 4.9,
    featured: false,
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Real Estate Consultant',
    specialization: 'High-value investments',
    phone: '+44 20 7123 4567',
    email: 'james@luxeestates.com',
    location: 'London, UK',
    image: '/british-man-realtor.jpg',
    propertiesSold: 93,
    yearsExperience: 11,
    languages: ['English', 'French'],
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
          <h1 className="font-serif text-5xl font-bold text-foreground mb-4">Our Team of Experts</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Dedicated professionals with years of experience in the international luxury real estate market
          </p>
        </div>

        {/* Search */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, specialization or location..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Featured Agents */}
        {featuredAgents.length > 0 && (
          <div className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8">Featured Agents</h2>
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
                      <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">Featured</Badge>
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
                          <span className="text-muted-foreground">({agent.propertiesSold} sales)</span>
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
                          <p className="text-xs text-muted-foreground">Properties sold</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-foreground">{agent.yearsExperience}</p>
                          <p className="text-xs text-muted-foreground">Years of experience</p>
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

                      <Button className="w-full">Contact agent</Button>
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
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8">More Agents</h2>
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
                          <span className="text-muted-foreground">({agent.propertiesSold} sales)</span>
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
                          <p className="text-xs text-muted-foreground">Properties sold</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-foreground">{agent.yearsExperience}</p>
                          <p className="text-xs text-muted-foreground">Years of experience</p>
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
                        Contact agent
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
            <p className="text-xl text-muted-foreground">No agents found matching your search criteria</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center bg-secondary rounded-lg p-12">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Need personalized advice?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our team of experts is ready to help you find the perfect property
          </p>
          <Link to={PATHNAME_ROUTES.CONTACT}>
            <Button size="lg">Contact the team</Button>
          </Link>
        </div>
      </main>
    </div>
  );
};
