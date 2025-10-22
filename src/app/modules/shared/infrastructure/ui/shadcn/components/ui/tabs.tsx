import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';

import { cn } from '@/modules/shared/infrastructure/ui/shadcn/lib/utils';

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn('flex flex-col gap-2', className)} {...props} />;
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]',
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  const base = 'flex-1 outline-none';

  // HeightAuto: animates outer height from 0 to inner content height when the
  // parent Radix Content's `data-state` attribute changes to 'active'. Uses
  // ResizeObserver to measure the inner height.
  function HeightAuto({ children, duration = 160 }: { children: React.ReactNode; duration?: number }) {
    const outerRef = React.useRef<HTMLDivElement | null>(null);
    const innerRef = React.useRef<HTMLDivElement | null>(null);

    React.useLayoutEffect(() => {
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (!outer || !inner) return;

      outer.style.overflow = 'hidden';
      outer.style.height = '0px';
      outer.style.transition = `height ${duration}ms cubic-bezier(.2,.9,.2,1)`;

      let raf = 0;

      const setToInnerHeight = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const h = inner.getBoundingClientRect().height;
          outer.style.height = `${h}px`;
        });
      };

      const ro = new ResizeObserver(() => {
        setToInnerHeight();
      });
      ro.observe(inner);

      // Observe parent Radix Content element for data-state attribute changes
      const contentEl = outer.parentElement as HTMLElement | null;
      let mo: MutationObserver | null = null;
      if (contentEl) {
        mo = new MutationObserver(muts => {
          for (const m of muts) {
            if (m.type === 'attributes' && m.attributeName === 'data-state') {
              const state = contentEl.getAttribute('data-state');
              if (state === 'active') {
                setToInnerHeight();
              } else {
                cancelAnimationFrame(raf);
                requestAnimationFrame(() => {
                  outer.style.height = '0px';
                });
              }
            }
          }
        });
        mo.observe(contentEl, { attributes: true });
      }

      // Initialize to current state
      if (contentEl?.getAttribute('data-state') === 'active') {
        setToInnerHeight();
      }

      return () => {
        ro.disconnect();
        if (mo) mo.disconnect();
        cancelAnimationFrame(raf);
        if (outer) {
          outer.style.transition = '';
          outer.style.height = '';
          outer.style.overflow = '';
        }
      };
    }, [duration]);

    return (
      <div ref={outerRef}>
        <div ref={innerRef}>{children}</div>
      </div>
    );
  }

  return (
    <TabsPrimitive.Content data-slot="tabs-content" className={cn(base, className)} {...props}>
      <HeightAuto>{props.children}</HeightAuto>
    </TabsPrimitive.Content>
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
