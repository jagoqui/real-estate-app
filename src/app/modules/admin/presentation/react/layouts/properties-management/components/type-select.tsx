import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type PropertyFormValues } from '@/modules/shared/domain/models/property-form.model';
import { PROPERTIES_TYPES } from '@/modules/shared/domain/models/property-types.model';
import { useGetPropertiesTypesRequest } from '@/modules/shared/presentation/react/hooks/property/use-get-properties-types-request/use-get-properties-types-request';
import { AlertTriangle, Loader2 } from 'lucide-react';
import React from 'react';
import { type Control } from 'react-hook-form';

interface TypeSelectProps {
  control: Control<PropertyFormValues>;
}

const TypeNotFoundWarning = React.memo(() => (
  <div className="flex items-start gap-2 mt-2 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-md">
    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
    <div className="flex-1 text-sm">
      <p className="font-medium text-amber-800 dark:text-amber-400">Property Type No Longer Exists</p>
      <p className="text-amber-700 dark:text-amber-500 mt-1">
        The previously assigned property type cannot be found. Please select a valid type from the list.
      </p>
    </div>
  </div>
));

TypeNotFoundWarning.displayName = 'TypeNotFoundWarning';

export const TypeSelect = React.memo(({ control }: TypeSelectProps) => {
  const { data: availableTypes, isPending, error } = useGetPropertiesTypesRequest();

  if (isPending) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading property types...
      </div>
    );
  }

  if (error) {
    return <div className="text-sm text-destructive">Error loading property types: {error.message}</div>;
  }

  if (!availableTypes) {
    return <div className="text-sm text-destructive">Error loading property types</div>;
  }

  return (
    <FormField
      control={control}
      name="type"
      render={({ field }) => {
        const typeExists = availableTypes.some(type => type === field.value);
        const hasValue = field.value && field.value.trim() !== '';
        const selectValue = typeExists ? field.value : '';

        return (
          <FormItem>
            <FormLabel>Property Type</FormLabel>
            <Select onValueChange={field.onChange} value={selectValue}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {availableTypes.map(type => {
                  const displayName = PROPERTIES_TYPES[type as keyof typeof PROPERTIES_TYPES] ?? type;
                  return (
                    <SelectItem key={type} value={type}>
                      {displayName.charAt(0).toUpperCase() + displayName.slice(1)}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {hasValue && !typeExists && <TypeNotFoundWarning />}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
});

TypeSelect.displayName = 'TypeSelect';
