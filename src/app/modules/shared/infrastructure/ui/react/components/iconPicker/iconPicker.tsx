'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useVirtualizer, type Virtualizer } from '@tanstack/react-virtual';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DynamicIcon } from '../dynamicIcon/dynamicIcon';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { LucideIconName } from '@/modules/shared/domain/models/lucideIconName.model';
import { Check, Loader2, Search } from 'lucide-react';

interface IconPickerProps {
  value?: LucideIconName;
  onSelect: (iconName: LucideIconName) => void;
  excludedIcons?: Array<LucideIconName>;
}

const ICON_CATEGORIES = {
  home: {
    label: 'Home',
    keywords: ['home', 'house', 'building', 'door', 'bed', 'bath', 'kitchen', 'sofa', 'armchair', 'lamp', 'warehouse'],
  },
  amenities: {
    label: 'Amenities',
    keywords: [
      'wifi',
      'parking',
      'car',
      'pool',
      'dumbbell',
      'utensils',
      'coffee',
      'wine',
      'beer',
      'glass',
      'tv',
      'air',
      'fan',
      'heater',
      'thermometer',
    ],
  },
  nature: {
    label: 'Nature',
    keywords: ['sun', 'cloud', 'moon', 'star', 'tree', 'leaf', 'flower', 'mountain', 'waves', 'droplet', 'flame'],
  },
  security: {
    label: 'Security',
    keywords: ['lock', 'unlock', 'key', 'shield', 'eye', 'camera', 'bell', 'alert', 'check', 'verified'],
  },
  navigation: {
    label: 'Navigation',
    keywords: ['arrow', 'chevron', 'corner', 'move', 'navigation', 'map', 'compass', 'route'],
  },
  communication: {
    label: 'Communication',
    keywords: ['mail', 'message', 'phone', 'chat', 'send', 'inbox', 'at-sign'],
  },
  media: {
    label: 'Media',
    keywords: ['play', 'pause', 'music', 'video', 'image', 'film', 'mic', 'volume', 'speaker'],
  },
  business: {
    label: 'Business',
    keywords: ['dollar', 'credit', 'shopping', 'cart', 'wallet', 'briefcase', 'calculator', 'receipt'],
  },
  people: {
    label: 'People',
    keywords: ['user', 'users', 'heart', 'share', 'thumbs', 'smile', 'frown'],
  },
  files: {
    label: 'Files',
    keywords: ['file', 'folder', 'document', 'page', 'clipboard', 'archive', 'download', 'upload'],
  },
  ui: {
    label: 'UI',
    keywords: [
      'menu',
      'settings',
      'search',
      'filter',
      'toggle',
      'slider',
      'grid',
      'list',
      'layout',
      'panel',
      'sidebar',
    ],
  },
  other: {
    label: 'Other',
    keywords: [],
  },
} as const satisfies Record<string, { label: string; keywords: Array<string> }>;

type CategoryKey = keyof typeof ICON_CATEGORIES;

function categorizeIcon(iconName: string): CategoryKey {
  const lowerName = iconName.toLowerCase();

  for (const [category, { keywords }] of Object.entries(ICON_CATEGORIES)) {
    if (category === 'other') continue;
    if (keywords.some(keyword => lowerName.includes(keyword))) {
      return category as CategoryKey;
    }
  }

  return 'other';
}

// eslint-disable-next-line max-lines-per-function
export const IconPicker = ({ value, onSelect, excludedIcons = [] }: IconPickerProps): React.ReactElement => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryKey | 'all'>('all');
  const [containerElement, setContainerElement] = useState<HTMLDivElement | null>(null);
  const [isIconsLoaded, setIsIconsLoaded] = useState(false);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      setSearch('');
      setActiveCategory('all');
      setIsIconsLoaded(false);
      // Delay icon processing to allow loading UI to show
      const PROCESSING_DELAY = 50;
      const timer = setTimeout(() => {
        setIsIconsLoaded(true);
      }, PROCESSING_DELAY);
      return (): void => clearTimeout(timer);
    }
  }, [open]);

  // Handle horizontal scroll with wheel for category tabs
  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea || search || !open) return;

    const handleWheel = (e: WheelEvent): void => {
      const container = scrollArea.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement;
      if (container) {
        e.preventDefault();

        // Determine scroll direction and amount
        const baseScrollAmount = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        const SCROLL_MULTIPLIER = 2.2;
        const scrollAmount = baseScrollAmount * SCROLL_MULTIPLIER;
        const targetScrollLeft = container.scrollLeft + scrollAmount;

        // Apply smooth scroll
        container.style.scrollBehavior = 'smooth';
        container.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth',
        });
      }
    };

    scrollArea.addEventListener('wheel', handleWheel, { passive: false });

    return (): void => {
      scrollArea.removeEventListener('wheel', handleWheel);
    };
  }, [search, open]);

  const iconNames = useMemo(() => {
    if (!isIconsLoaded) return [];
    const allIcons = Object.keys(dynamicIconImports) as Array<LucideIconName>;
    return allIcons.filter(icon => !excludedIcons.includes(icon));
  }, [isIconsLoaded, excludedIcons]);

  const categorizedIcons = useMemo(() => {
    if (!isIconsLoaded)
      return {
        home: [],
        amenities: [],
        nature: [],
        security: [],
        navigation: [],
        communication: [],
        media: [],
        business: [],
        people: [],
        files: [],
        ui: [],
        other: [],
      } as Record<CategoryKey, Array<LucideIconName>>;

    const categories: Record<CategoryKey, Array<LucideIconName>> = {
      home: [],
      amenities: [],
      nature: [],
      security: [],
      navigation: [],
      communication: [],
      media: [],
      business: [],
      people: [],
      files: [],
      ui: [],
      other: [],
    };

    iconNames.forEach(iconName => {
      const category = categorizeIcon(iconName);
      categories[category].push(iconName);
    });

    return categories;
  }, [iconNames, isIconsLoaded]);

  const filteredIcons = useMemo(() => {
    let icons: Array<LucideIconName> = [];

    if (search) {
      icons = iconNames.filter(name => name.toLowerCase().includes(search.toLowerCase()));
    } else if (activeCategory === 'all') {
      icons = iconNames;
    } else {
      icons = categorizedIcons[activeCategory];
    }

    return icons;
  }, [search, activeCategory, iconNames, categorizedIcons]);

  const COLUMNS = 6;
  const ITEM_HEIGHT = 80;

  const rows = useMemo(() => {
    const result: Array<Array<LucideIconName>> = [];
    for (let i = 0; i < filteredIcons.length; i += COLUMNS) {
      result.push(filteredIcons.slice(i, i + COLUMNS));
    }
    return result;
  }, [filteredIcons]);

  const rowVirtualizer: Virtualizer<HTMLDivElement, Element> = useVirtualizer({
    count: rows.length,
    getScrollElement: () => containerElement,
    estimateSize: () => ITEM_HEIGHT,
    overscan: 5,
  });

  // Force update when container becomes available
  useEffect(() => {
    if (containerElement && open) {
      const RENDER_DELAY = 10;
      const timer = setTimeout(() => {
        rowVirtualizer.measure();
      }, RENDER_DELAY);
      return (): void => clearTimeout(timer);
    }
  }, [containerElement, open, rowVirtualizer]);

  // Force update when filtered icons change
  useEffect(() => {
    if (containerElement && open) {
      rowVirtualizer.measure();
    }
  }, [filteredIcons.length, containerElement, open, rowVirtualizer]);

  const handleSelect = (iconName: LucideIconName): void => {
    onSelect(iconName);
    setOpen(false);
  };

  const setContainerRef = (element: HTMLDivElement | null): void => {
    parentRef.current = element;
    setContainerElement(element);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between h-10 px-3 bg-background hover:bg-accent">
          {value ? (
            <div className="flex items-center gap-2 truncate">
              <DynamicIcon name={value} className="h-4 w-4" />
              <span className="text-sm truncate min-w-0">{value}</span>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">
              {open && !isIconsLoaded ? 'Loading icons...' : 'Select icon'}
            </span>
          )}
          {open && !isIconsLoaded ? (
            <Loader2 className="h-4 w-4 text-muted-foreground ml-2 shrink-0 animate-spin" />
          ) : (
            <Search className="h-4 w-4 text-muted-foreground ml-2 shrink-0" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[480px] p-0" align="start" sideOffset={4}>
        <div className="flex flex-col">
          <div className="px-3 py-2.5 border-b bg-muted/30">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search icons..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="h-9 pl-9 text-sm"
              />
            </div>
          </div>

          {!search && (
            <ScrollArea ref={scrollAreaRef} className="w-full border-b">
              <div className="flex gap-1 px-2 py-2">
                <Button
                  variant={activeCategory === 'all' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveCategory('all')}
                  className="h-7 px-2.5 text-xs shrink-0"
                >
                  All
                </Button>
                {Object.entries(ICON_CATEGORIES).map(([key, { label }]) => {
                  const count = categorizedIcons[key as CategoryKey].length;
                  if (count === 0) return null;
                  return (
                    <Button
                      key={key}
                      variant={activeCategory === key ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setActiveCategory(key as CategoryKey)}
                      className="h-7 px-2.5 text-xs shrink-0"
                    >
                      {label}
                    </Button>
                  );
                })}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          )}

          <div ref={setContainerRef} className="h-[320px] w-full overflow-auto relative">
            {!isIconsLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span className="text-sm">Loading icons...</span>
                </div>
              </div>
            )}
            {isIconsLoaded && (
              <>
                {containerElement ? (
                  <div
                    style={{
                      height: `${rowVirtualizer.getTotalSize()}px`,
                      width: '100%',
                      position: 'relative',
                    }}
                  >
                    {rowVirtualizer.getVirtualItems().map(virtualRow => {
                      const rowIcons = rows[virtualRow.index];
                      return (
                        <div
                          key={virtualRow.key}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: `${virtualRow.size}px`,
                            transform: `translateY(${virtualRow.start}px)`,
                          }}
                        >
                          <div className="grid grid-cols-6 gap-1 p-2">
                            {rowIcons.map(iconName => (
                              <button
                                key={iconName}
                                onClick={() => handleSelect(iconName)}
                                className={`
                                  relative flex items-center justify-center rounded-md p-2 
                                  transition-all duration-150
                                  hover:bg-accent hover:scale-105
                                  ${value === iconName ? 'bg-primary/10 ring-2 ring-primary' : ''}
                                `}
                                title={iconName}
                              >
                                <DynamicIcon
                                  name={iconName}
                                  className={`h-5 w-5 transition-colors ${
                                    value === iconName ? 'text-primary' : 'text-muted-foreground'
                                  }`}
                                />
                                {value === iconName && (
                                  <Check className="absolute top-0.5 right-0.5 h-3 w-3 text-primary" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid grid-cols-6 gap-1 p-2">
                    {filteredIcons.map(iconName => (
                      <button
                        key={iconName}
                        onClick={() => handleSelect(iconName)}
                        className={`
                          relative flex items-center justify-center rounded-md p-2 
                          transition-all duration-150
                          hover:bg-accent hover:scale-105
                          ${value === iconName ? 'bg-primary/10 ring-2 ring-primary' : ''}
                        `}
                        title={iconName}
                      >
                        <DynamicIcon
                          name={iconName}
                          className={`h-5 w-5 transition-colors ${
                            value === iconName ? 'text-primary' : 'text-muted-foreground'
                          }`}
                        />
                        {value === iconName && <Check className="absolute top-0.5 right-0.5 h-3 w-3 text-primary" />}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
            {isIconsLoaded && filteredIcons.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-8">
                <Search className="h-8 w-8 mb-2 opacity-50" />
                <p className="text-sm">No icons found</p>
              </div>
            )}
          </div>

          <div className="px-3 py-2 border-t bg-muted/30">
            <p className="text-xs text-muted-foreground text-center">
              {search
                ? `${filteredIcons.length} result${filteredIcons.length !== 1 ? 's' : ''}`
                : `${filteredIcons.length} icon${filteredIcons.length !== 1 ? 's' : ''} in ${
                    activeCategory === 'all' ? 'all categories' : ICON_CATEGORIES[activeCategory].label
                  }`}
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
