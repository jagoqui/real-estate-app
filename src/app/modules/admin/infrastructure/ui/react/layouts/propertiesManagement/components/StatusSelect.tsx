import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type PropertyFormValues } from '@/modules/shared/domain/schemas/propertyForm.schema';
import { PROPERTY_STATUSES } from '@/modules/shared/domain/schemas/propertyStatutes.schema';
import { useGetPropertiesStatusesRequest } from '@/modules/shared/infrastructure/ui/react/hooks/useGetPropertiesStatusesRequest/useGetPropertiesStatusesRequest';
import { AlertTriangle, Loader2 } from 'lucide-react';
import React from 'react';
import { type Control } from 'react-hook-form';

interface StatusSelectProps {
  control: Control<PropertyFormValues>;
}

const StatusNotFoundWarning = React.memo(() => (
  <div className="flex items-start gap-2 mt-2 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-md">
    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
    <div className="flex-1 text-sm">
      <p className="font-medium text-amber-800 dark:text-amber-400">Status No Longer Exists</p>
      <p className="text-amber-700 dark:text-amber-500 mt-1">
        The previously assigned status cannot be found. Please select a valid status from the list.
      </p>
    </div>
  </div>
));

StatusNotFoundWarning.displayName = 'StatusNotFoundWarning';

export const StatusSelect = React.memo(({ control }: StatusSelectProps) => {
  const { data: availableStatuses, isPending, error } = useGetPropertiesStatusesRequest();

  if (isPending) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading statuses...
      </div>
    );
  }

  if (error) {
    return <div className="text-sm text-destructive">Error loading statuses: {error.message}</div>;
  }

  if (!availableStatuses) {
    return <div className="text-sm text-destructive">Error loading statuses</div>;
  }

  return (
    <FormField
      control={control}
      name="status"
      render={({ field }) => {
        const statusExists = availableStatuses.some(status => status === field.value);
        const hasValue = field.value && field.value.trim() !== '';
        const selectValue = statusExists ? field.value : '';

        return (
          <FormItem>
            <FormLabel>Status</FormLabel>
            <Select onValueChange={field.onChange} value={selectValue}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {availableStatuses.map(status => {
                  const displayName = PROPERTY_STATUSES[status as keyof typeof PROPERTY_STATUSES] ?? status;
                  return (
                    <SelectItem key={status} value={status}>
                      {displayName.charAt(0).toUpperCase() + displayName.slice(1)}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {hasValue && !statusExists && <StatusNotFoundWarning />}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
});

StatusSelect.displayName = 'StatusSelect';
