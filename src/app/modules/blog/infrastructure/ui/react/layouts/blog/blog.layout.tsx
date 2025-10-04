'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Calendar, Clock, Search } from 'lucide-react';
import { useState } from 'react';

const blogPosts = [
  {
    id: 1,
    title: 'Las 10 mejores ubicaciones para invertir en propiedades de lujo en 2025',
    excerpt:
      'Descubre los mercados inmobiliarios más prometedores para inversiones de alto valor este año, desde la Costa Azul hasta Dubai.',
    category: 'Inversión',
    author: 'María González',
    date: '15 de Enero, 2025',
    readTime: '8 min',
    image: '/blog-luxury-investment-locations.jpg',
    featured: true,
  },
  {
    id: 2,
    title: 'Guía completa para comprar una villa en la Toscana',
    excerpt:
      'Todo lo que necesitas saber sobre el proceso de adquisición de propiedades históricas en Italia, desde aspectos legales hasta restauración.',
    category: 'Guías',
    author: 'Alessandro Rossi',
    date: '12 de Enero, 2025',
    readTime: '12 min',
    image: '/blog-tuscany-villa-guide.jpg',
    featured: true,
  },
  {
    id: 3,
    title: 'Tendencias de diseño en propiedades de lujo para 2025',
    excerpt:
      'Explora las últimas tendencias en arquitectura y diseño interior que están definiendo el mercado de propiedades exclusivas.',
    category: 'Diseño',
    author: 'Sophie Laurent',
    date: '10 de Enero, 2025',
    readTime: '6 min',
    image: '/blog-luxury-design-trends.jpg',
    featured: true,
  },
  {
    id: 4,
    title: 'Cómo maximizar el valor de tu propiedad antes de venderla',
    excerpt:
      'Estrategias probadas para aumentar el valor de mercado de tu propiedad de lujo y atraer a los compradores adecuados.',
    category: 'Venta',
    author: 'Carlos Rodríguez',
    date: '8 de Enero, 2025',
    readTime: '10 min',
    image: '/blog-maximize-property-value.jpg',
    featured: false,
  },
  {
    id: 5,
    title: 'El mercado inmobiliario de lujo en Marbella: Análisis 2025',
    excerpt:
      'Un análisis profundo del mercado inmobiliario de alto valor en la Costa del Sol y las oportunidades actuales.',
    category: 'Mercado',
    author: 'María González',
    date: '5 de Enero, 2025',
    readTime: '15 min',
    image: '/blog-marbella-market-analysis.jpg',
    featured: false,
  },
  {
    id: 6,
    title: 'Sostenibilidad en propiedades de lujo: El futuro es verde',
    excerpt:
      'Cómo las tecnologías sostenibles y el diseño ecológico están transformando el mercado de propiedades de alto valor.',
    category: 'Sostenibilidad',
    author: 'Emma Thompson',
    date: '3 de Enero, 2025',
    readTime: '7 min',
    image: '/blog-sustainable-luxury-homes.jpg',
    featured: false,
  },
];

const categories = ['Todas', 'Inversión', 'Guías', 'Diseño', 'Venta', 'Mercado', 'Sostenibilidad'];

// eslint-disable-next-line max-lines-per-function
export const BlogLayout = (): React.ReactElement => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="font-serif text-5xl font-bold text-foreground mb-4">Blog & Noticias</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, tendencias y consejos del mundo inmobiliario de lujo
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory !== category ? 'bg-transparent' : ''}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8">Artículos destacados</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPosts.map(post => (
                <Link key={post.id} to={`/blog/${post.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 h-full">
                    <div className="relative h-64 overflow-hidden rounded-t-lg">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="object-cover group-hover:scale-110 transition-transform duration-500 size-full"
                      />
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                        {post.category}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-sm font-medium">{post.author}</span>
                        <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8">Más artículos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map(post => (
                <Link key={post.id} to={`/blog/${post.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 h-full">
                    <div className="relative h-64 overflow-hidden rounded-t-lg">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="object-cover group-hover:scale-110 transition-transform duration-500 size-full"
                      />
                      <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
                        {post.category}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-sm font-medium">{post.author}</span>
                        <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No se encontraron artículos con los criterios seleccionados</p>
          </div>
        )}
      </main>
    </div>
  );
};
