/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Header } from '@/modules/shared/infrastructure/ui/react/components/header/header';
import { Calculator, Home, PiggyBank, TrendingUp } from 'lucide-react';
import { useState } from 'react';

// eslint-disable-next-line max-lines-per-function
export const CalculatorLayout = (): React.ReactElement => {
  const [propertyPrice, setPropertyPrice] = useState<number>(1000000);
  const [downPayment, setDownPayment] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(3.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);

  const downPaymentAmount = (propertyPrice * downPayment) / 100;
  const loanAmount = propertyPrice - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;

  const monthlyPayment =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - loanAmount;

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <div className="mb-12 text-center pt-32">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 mb-6">
          <Calculator className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Calculadora de Hipoteca
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Calcula tu pago mensual y planifica tu inversión inmobiliaria
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Calculator Form */}
        <Card>
          <CardContent className="pt-6 space-y-8">
            <div className="space-y-4">
              <Label htmlFor="propertyPrice" className="text-base sm:text-lg font-semibold">
                Precio de la propiedad
              </Label>
              <Input
                id="propertyPrice"
                type="number"
                value={propertyPrice}
                onChange={e => setPropertyPrice(Number(e.target.value))}
                className="text-xl sm:text-2xl font-bold h-12 sm:h-14"
              />
              <Slider
                value={[propertyPrice]}
                onValueChange={value => setPropertyPrice(value[0])}
                min={100000}
                max={20000000}
                step={50000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>100.000€</span>
                <span>20.000.000€</span>
              </div>
            </div>

            <div className="space-y-4">
              <Label htmlFor="downPayment" className="text-base sm:text-lg font-semibold">
                Entrada ({downPayment}%)
              </Label>
              <div className="text-xl sm:text-2xl font-bold text-primary">{formatCurrency(downPaymentAmount)}</div>
              <Slider
                value={[downPayment]}
                onValueChange={value => setDownPayment(value[0])}
                min={10}
                max={50}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>10%</span>
                <span>50%</span>
              </div>
            </div>

            <div className="space-y-4">
              <Label htmlFor="interestRate" className="text-base sm:text-lg font-semibold">
                Tasa de interés anual ({interestRate}%)
              </Label>
              <Slider
                value={[interestRate]}
                onValueChange={value => setInterestRate(value[0])}
                min={1}
                max={10}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>1%</span>
                <span>10%</span>
              </div>
            </div>

            <div className="space-y-4">
              <Label htmlFor="loanTerm" className="text-base sm:text-lg font-semibold">
                Plazo del préstamo ({loanTerm} años)
              </Label>
              <Slider
                value={[loanTerm]}
                onValueChange={value => setLoanTerm(value[0])}
                min={5}
                max={40}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>5 años</span>
                <span>40 años</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Home className="h-6 w-6 sm:h-8 sm:w-8" />
                <h3 className="text-base sm:text-lg font-semibold">Pago mensual</h3>
              </div>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">{formatCurrency(monthlyPayment)}</p>
              <p className="opacity-90 text-sm sm:text-base">Estimado por {loanTerm} años</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 sm:p-3 bg-background rounded-lg">
                    <PiggyBank className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Monto del préstamo</p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold">{formatCurrency(loanAmount)}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 sm:p-3 bg-background rounded-lg">
                    <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Total de intereses</p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold">{formatCurrency(totalInterest)}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 sm:p-3 bg-background rounded-lg">
                    <Calculator className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Pago total</p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold">
                      {formatCurrency(totalPayment + downPaymentAmount)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-base sm:text-lg mb-4">Desglose del pago</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-muted-foreground">Principal e intereses</span>
                  <span className="font-semibold text-sm sm:text-base">{formatCurrency(monthlyPayment)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-muted-foreground">Impuestos estimados</span>
                  <span className="font-semibold text-sm sm:text-base">{formatCurrency(propertyPrice * 0.001)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-muted-foreground">Seguro estimado</span>
                  <span className="font-semibold text-sm sm:text-base">{formatCurrency(propertyPrice * 0.0005)}</span>
                </div>
                <div className="pt-3 border-t border-border flex justify-between items-center">
                  <span className="font-semibold text-sm sm:text-base">Total mensual estimado</span>
                  <span className="text-lg sm:text-xl font-bold text-primary">
                    {formatCurrency(monthlyPayment + propertyPrice * 0.001 + propertyPrice * 0.0005)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button size="lg" className="w-full">
            Solicitar pre-aprobación
          </Button>
        </div>
      </div>

      {/* Disclaimer */}
      <Card className="mt-12 max-w-6xl mx-auto bg-muted">
        <CardContent className="pt-6">
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <strong>Nota importante:</strong> Esta calculadora proporciona estimaciones basadas en los datos ingresados.
            Los pagos reales pueden variar según las condiciones del mercado, tasas de interés actuales, impuestos
            locales, seguros y otros factores. Consulte con nuestros asesores financieros para obtener una cotización
            precisa y personalizada.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
