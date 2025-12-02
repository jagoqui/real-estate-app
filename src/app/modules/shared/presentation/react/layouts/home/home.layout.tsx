import { HeroSection } from '../../components/hero-section/hero-section';
import { PropertyCarousel } from '../../components/property-carousel/property-carousel';
import { PropertySearch } from '../../components/property-search/property-search';
import { PropertiesMapContainer } from '../../containers/properties-map/properties-map.container';

export const HomeLayout = (): React.ReactElement => {
  return (
    <main className="relative top-[-80px]">
      <HeroSection />
      <PropertySearch />
      <PropertiesMapContainer />
      <PropertyCarousel />
    </main>
  );
};
