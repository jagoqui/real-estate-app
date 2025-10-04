import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PATHNAME_ROUTES } from '@/modules/shared/infrastructure/ui/react/constants/main.constants';
import { Link } from '@tanstack/react-router';
import {
  Briefcase,
  Building2,
  Calculator,
  CheckCircle2,
  FileText,
  Home,
  Key,
  Shield,
  TrendingUp,
  Users,
} from 'lucide-react';
import type React from 'react';

const services = [
  {
    icon: Home,
    title: 'Compra de Propiedades',
    description:
      'Te ayudamos a encontrar la propiedad perfecta que se ajuste a tus necesidades y presupuesto. Acceso exclusivo a propiedades de lujo en todo el mundo.',
    features: ['Búsqueda personalizada', 'Visitas guiadas', 'Negociación de precios', 'Asesoramiento legal'],
  },
  {
    icon: TrendingUp,
    title: 'Venta de Propiedades',
    description:
      'Maximiza el valor de tu propiedad con nuestras estrategias de marketing y red internacional de compradores potenciales.',
    features: ['Valoración profesional', 'Marketing internacional', 'Fotografía profesional', 'Gestión de visitas'],
  },
  {
    icon: FileText,
    title: 'Tasación de Propiedades',
    description:
      'Obtén una valoración precisa y detallada de tu propiedad realizada por expertos certificados en el mercado de lujo.',
    features: ['Análisis de mercado', 'Informe detallado', 'Comparativa de propiedades', 'Recomendaciones'],
  },
  {
    icon: Briefcase,
    title: 'Inversión Inmobiliaria',
    description:
      'Asesoramiento experto para inversores que buscan oportunidades en el mercado inmobiliario de alto valor.',
    features: ['Análisis de ROI', 'Oportunidades exclusivas', 'Gestión de cartera', 'Estrategias fiscales'],
  },
  {
    icon: Building2,
    title: 'Gestión de Propiedades',
    description:
      'Servicio completo de administración y mantenimiento de propiedades de lujo para propietarios e inversores.',
    features: ['Mantenimiento integral', 'Gestión de inquilinos', 'Reportes mensuales', 'Servicio 24/7'],
  },
  {
    icon: Key,
    title: 'Alquiler de Lujo',
    description: 'Encuentra o alquila propiedades de lujo con contratos flexibles y servicios premium incluidos.',
    features: ['Propiedades amuebladas', 'Contratos flexibles', 'Servicios de conserjería', 'Mantenimiento incluido'],
  },
  {
    icon: Shield,
    title: 'Asesoría Legal',
    description:
      'Equipo legal especializado en transacciones inmobiliarias internacionales y protección de inversiones.',
    features: ['Due diligence', 'Contratos internacionales', 'Protección de activos', 'Resolución de conflictos'],
  },
  {
    icon: Calculator,
    title: 'Consultoría Financiera',
    description: 'Soluciones de financiamiento personalizadas y asesoramiento fiscal para transacciones de alto valor.',
    features: [
      'Opciones de financiamiento',
      'Planificación fiscal',
      'Estructuración de compra',
      'Optimización de costos',
    ],
  },
];

// eslint-disable-next-line max-lines-per-function
export const ServicesLayout = (): React.ReactElement => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="font-serif text-5xl font-bold text-foreground mb-4">Nuestros Servicios</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Soluciones integrales para todas tus necesidades inmobiliarias de lujo
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full bg-transparent">
                    Más información
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <h2 className="font-serif text-4xl font-bold text-foreground text-center mb-12">¿Por qué elegirnos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Experiencia Global</h3>
                <p className="text-muted-foreground">
                  Más de 20 años de experiencia en el mercado inmobiliario de lujo internacional
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Confidencialidad</h3>
                <p className="text-muted-foreground">
                  Máxima discreción y protección de la privacidad de nuestros clientes
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Resultados Comprobados</h3>
                <p className="text-muted-foreground">
                  Miles de transacciones exitosas y clientes satisfechos en todo el mundo
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="py-12 text-center">
            <h2 className="font-serif text-4xl font-bold mb-4">¿Listo para comenzar?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Agenda una consulta gratuita con uno de nuestros expertos y descubre cómo podemos ayudarte
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={PATHNAME_ROUTES.CONTACT}>
                <Button size="lg" variant="secondary">
                  Contactar ahora
                </Button>
              </Link>
              <Link to={PATHNAME_ROUTES.AGENTS}>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Ver nuestro equipo
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
