import {Slot} from '@radix-ui/react-slot';
import {type VariantProps} from 'class-variance-authority';
import * as React from 'react';

import {cn} from '@/modules/shared/infrastructure/ui/shadcn/lib/utils';
import {BUTTON_VARIANTS} from '../constants/ui.constants';

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof BUTTON_VARIANTS> & {
    asChild?: boolean;
  }): React.ReactElement {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(BUTTON_VARIANTS({variant, size, className}))}
      {...props}
    />
  );
}

export {Button};
