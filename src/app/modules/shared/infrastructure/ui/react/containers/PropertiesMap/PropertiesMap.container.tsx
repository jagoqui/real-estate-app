import { PropertiesMap } from '../../components/propertiesMap';

export const PropertiesMapContainer = (): React.ReactElement => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Explore Properties on Map</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover your dream property by location. Click on any marker to see details and navigate to the full
            listing.
          </p>
        </div>
        <PropertiesMap />
      </div>
    </section>
  );
};
