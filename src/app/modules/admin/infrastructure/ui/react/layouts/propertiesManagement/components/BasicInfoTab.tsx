import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { type PropertyFormValues } from '@/modules/shared/domain/schemas/propertyForm.schema';
import { FormattedInput } from '@/modules/shared/infrastructure/ui/react/components/formattedInput/formatted-input';
import { Sparkle } from 'lucide-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { OwnerSelect } from './OwnerSelect';
import { StatusSelect } from './StatusSelect';
import { TypeSelect } from './TypeSelect';

// eslint-disable-next-line max-lines-per-function
export const BasicInfoTab = React.memo(() => {
  const { control } = useFormContext<PropertyFormValues>();

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2 sm:col-span-2">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter property name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2">
        <FormField
          control={control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (USD)</FormLabel>
              <FormControl>
                <FormattedInput
                  formatType="currency"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="$0"
                  valueType="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2">
        <FormField
          control={control}
          name="area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area (m²)</FormLabel>
              <FormControl>
                <FormattedInput
                  formatType="number"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="0"
                  valueType="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2">
        <FormField
          control={control}
          name="buildYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Build Year</FormLabel>
              <FormControl>
                <FormattedInput
                  formatType="year"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="2025"
                  valueType="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2">
        <StatusSelect control={control} />
      </div>

      <div className="space-y-2">
        <TypeSelect control={control} />
      </div>

      <div className="space-y-2">
        <FormField
          control={control}
          name="bedrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bedrooms</FormLabel>
              <FormControl>
                <FormattedInput
                  formatType="number"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="0"
                  valueType="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2">
        <FormField
          control={control}
          name="bathrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bathrooms</FormLabel>
              <FormControl>
                <FormattedInput
                  formatType="number"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="0"
                  valueType="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2">
        <OwnerSelect control={control} />
      </div>

      <div className="space-y-2 flex items-center gap-3">
        <FormField
          control={control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0">
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="cursor-pointer">
                Featured Property <Sparkle />
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2 sm:col-span-2">
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} rows={3} placeholder="Enter property description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
});

BasicInfoTab.displayName = 'BasicInfoTab';
