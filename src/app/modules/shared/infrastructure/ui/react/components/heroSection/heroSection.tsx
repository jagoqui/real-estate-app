export const HeroSection = (): React.ReactElement => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="/luxury-villa-sunset.png" alt="Luxury property" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 tracking-tight text-balance">
          Exclusividad redefinida
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 text-pretty">
          Descubre propiedades excepcionales que transforman el concepto de lujo en experiencias inolvidables
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/100 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/100 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
