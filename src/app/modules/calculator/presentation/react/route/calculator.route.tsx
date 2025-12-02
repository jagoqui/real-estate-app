import { PATHNAME_ROUTES } from '@/modules/shared//presentation/react/constants/main.constants';
import { appRoute } from '@/modules/shared//presentation/react/route/app.route';
import { createRoute } from '@tanstack/react-router';
import { CalculatorContainer } from '../containers/calculator/calculator';
import { CalculatorLayout } from '../layouts/calculator/calculator.layout';

export const calculatorRoute = createRoute({
  getParentRoute: () => appRoute,
  path: PATHNAME_ROUTES.CALCULATOR,
  component: CalculatorContainer,
});

const calculatorIndexRoute = createRoute({
  getParentRoute: () => calculatorRoute,
  path: PATHNAME_ROUTES.INDEX,
  component: CalculatorLayout,
});

calculatorRoute.addChildren([calculatorIndexRoute]);
