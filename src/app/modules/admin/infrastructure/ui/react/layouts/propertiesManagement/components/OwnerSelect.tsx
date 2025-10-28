import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetOwnersRequest } from '@/modules/shared/infrastructure/ui/react/hooks/useGetOwnersRequest/useGetOwnersRequest';
import { AlertTriangle, Loader2 } from 'lucide-react';
import React from 'react';
import { type Control } from 'react-hook-form';
import { type PropertyFormValues } from '../../../../../../../shared/domain/schemas/propertyForm.schema';

interface OwnerSelectProps {
  control: Control<PropertyFormValues>;
  onOwnerChange?: (ownerId: string, ownerName: string) => void;
}

// Warning message component for non-existent owner
const OwnerNotFoundWarning = React.memo(() => (
  <div className="flex items-start gap-2 mt-2 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-md">
    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
    <div className="flex-1 text-sm">
      <p className="font-medium text-amber-800 dark:text-amber-400">Owner No Longer Exists</p>
      <p className="text-amber-700 dark:text-amber-500 mt-1">
        The previously assigned owner cannot be found. Please verify the owner's status and select a valid owner from
        the list.
      </p>
    </div>
  </div>
));

OwnerNotFoundWarning.displayName = 'OwnerNotFoundWarning';

export const OwnerSelect = React.memo(({ control, onOwnerChange }: OwnerSelectProps) => {
  const { data: owners, isPending, error } = useGetOwnersRequest();

  if (isPending) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading owners...
      </div>
    );
  }

  if (error) {
    return <div className="text-sm text-destructive">Error loading owners: {error.message}</div>;
  }

  return (
    <FormField
      control={control}
      name="ownerId"
      render={({ field }) => {
        const ownerExists = owners?.some(owner => owner.id === field.value);
        const hasValue = field.value && field.value.trim() !== '';
        // Use empty string if owner doesn't exist to show placeholder
        const selectValue = ownerExists ? field.value : '';

        return (
          <FormItem>
            <FormLabel>Owner</FormLabel>
            <Select
              onValueChange={value => {
                field.onChange(value);
                const selectedOwner = owners?.find(owner => owner.id === value);
                if (selectedOwner && onOwnerChange) {
                  onOwnerChange(value, selectedOwner.name);
                }
              }}
              value={selectValue}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select an owner" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {owners?.map(owner => (
                  <SelectItem key={owner.id} value={owner.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={owner.photoUrl} alt={owner.name} />
                        <AvatarFallback>
                          {owner.name
                            .split(' ')
                            .map(n => n[0])
                            .join('')
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span>{owner.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {hasValue && !ownerExists && <OwnerNotFoundWarning />}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
});

OwnerSelect.displayName = 'OwnerSelect';
