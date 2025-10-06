import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

const MAX_PRICE = 10000000;

// eslint-disable-next-line max-lines-per-function
export const PropertySearch = (): React.ReactElement => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, MAX_PRICE]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = (): void => {
    console.log('[v0] Search query:', searchQuery);
    console.log('[v0] Price range:', priceRange);
    console.log('[v0] Min price:', minPrice);
    console.log('[v0] Max price:', maxPrice);
    // Implement your search logic here
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-8 text-balance">Find your ideal property</h2>

          <div className="bg-card rounded-lg shadow-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search by name, address or location..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="h-12 text-base"
                />
              </div>

              {/* Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="h-12 gap-2 md:w-auto bg-transparent">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="font-serif text-2xl">Search filters</SheetTitle>
                    <SheetDescription>Refine your search with advanced filters</SheetDescription>
                  </SheetHeader>

                  <div className="mt-8 px-4 space-y-8">
                    {/* Price Range Slider */}
                    <div className="space-y-4">
                      <Label className="text-base">Price range</Label>
                      <Slider
                        min={0}
                        max={10000000}
                        step={100000}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="mt-2"
                      />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>${priceRange[0].toLocaleString()}</span>
                        <span>${priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Min Price */}
                    <div className="space-y-2">
                      <Label htmlFor="min-price">Minimum price</Label>
                      <Input
                        id="min-price"
                        type="number"
                        placeholder="E.g.: 500000"
                        value={minPrice}
                        onChange={e => setMinPrice(e.target.value)}
                      />
                    </div>

                    {/* Max Price */}
                    <div className="space-y-2">
                      <Label htmlFor="max-price">Maximum price</Label>
                      <Input
                        id="max-price"
                        type="number"
                        placeholder="E.g.: 5000000"
                        value={maxPrice}
                        onChange={e => setMaxPrice(e.target.value)}
                      />
                    </div>

                    <Button onClick={handleSearch} className="w-full bg-primary hover:bg-primary/90">
                      Apply filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Search Button */}
              <Button onClick={handleSearch} className="h-12 gap-2 bg-primary hover:bg-primary/90">
                <Search className="w-4 h-4" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
