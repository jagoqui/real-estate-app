import { HeroSection } from '../../components/heroSection/heroSection';
import { PropertyCarousel } from '../../components/propertyCarousel/propertyCarousel';
import { PropertySearch } from '../../components/propertySearch/propertySearch';

export const HomeLayout = (): React.ReactElement => {
  return (
    <main className="relative top-[-80px]">
      <HeroSection />
      <PropertySearch />
      <PropertyCarousel />
    </main>
  );
};
