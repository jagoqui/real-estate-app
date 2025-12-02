import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PATHNAME_ROUTES } from '@/modules/shared//presentation/react/constants/main.constants';
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
    title: 'Property Purchase',
    description:
      'We help you find the perfect property that fits your needs and budget. Exclusive access to luxury properties worldwide.',
    features: ['Personalized search', 'Guided tours', 'Price negotiation', 'Legal advice'],
  },
  {
    icon: TrendingUp,
    title: 'Property Sale',
    description:
      'Maximize your property’s value with our marketing strategies and international network of potential buyers.',
    features: ['Professional valuation', 'International marketing', 'Professional photography', 'Visit management'],
  },
  {
    icon: FileText,
    title: 'Property Appraisal',
    description: 'Get an accurate and detailed valuation of your property by certified experts in the luxury market.',
    features: ['Market analysis', 'Detailed report', 'Property comparison', 'Recommendations'],
  },
  {
    icon: Briefcase,
    title: 'Real Estate Investment',
    description: 'Expert advice for investors seeking opportunities in the high-value real estate market.',
    features: ['ROI analysis', 'Exclusive opportunities', 'Portfolio management', 'Tax strategies'],
  },
  {
    icon: Building2,
    title: 'Property Management',
    description: 'Comprehensive administration and maintenance service for luxury properties for owners and investors.',
    features: ['Comprehensive maintenance', 'Tenant management', 'Monthly reports', '24/7 service'],
  },
  {
    icon: Key,
    title: 'Luxury Rentals',
    description: 'Find or rent luxury properties with flexible contracts and premium services included.',
    features: ['Furnished properties', 'Flexible contracts', 'Concierge services', 'Maintenance included'],
  },
  {
    icon: Shield,
    title: 'Legal Advisory',
    description: 'Specialized legal team for international real estate transactions and investment protection.',
    features: ['Due diligence', 'International contracts', 'Asset protection', 'Conflict resolution'],
  },
  {
    icon: Calculator,
    title: 'Financial Consulting',
    description: 'Personalized financing solutions and tax advice for high-value transactions.',
    features: ['Financing options', 'Tax planning', 'Purchase structuring', 'Cost optimization'],
  },
];

// eslint-disable-next-line max-lines-per-function
export const ServicesLayout = (): React.ReactElement => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="font-serif text-5xl font-bold text-foreground mb-4">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive solutions for all your luxury real estate needs
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
                    More information
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <h2 className="font-serif text-4xl font-bold text-foreground text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Global Experience</h3>
                <p className="text-muted-foreground">
                  Over 20 years of experience in the international luxury real estate market
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Confidentiality</h3>
                <p className="text-muted-foreground">Maximum discretion and protection of our clients’ privacy</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Proven Results</h3>
                <p className="text-muted-foreground">
                  Thousands of successful transactions and satisfied clients worldwide
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="py-12 text-center">
            <h2 className="font-serif text-4xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Schedule a free consultation with one of our experts and discover how we can help you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={PATHNAME_ROUTES.CONTACT}>
                <Button size="lg" variant="secondary">
                  Contact now
                </Button>
              </Link>
              <Link to={PATHNAME_ROUTES.AGENTS}>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Meet our team
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
