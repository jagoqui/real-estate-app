import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FormattedInput } from '@/modules/shared/infrastructure/ui/react/components/formattedInput/formatted-input';
import React from 'react';
import { type Control } from 'react-hook-form';
import { type PropertyFormSchema } from '../schemas/propertyForm.schema';
import { OwnerSelect } from './OwnerSelect';

interface BasicInfoTabProps {
  control: Control<PropertyFormSchema>;
  onOwnerChange?: (ownerId: string, ownerName: string) => void;
}

// eslint-disable-next-line max-lines-per-function
export const BasicInfoTab = React.memo(({ control, onOwnerChange }: BasicInfoTabProps) => {
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
                <FormattedInput formatType="currency" value={field.value} onChange={field.onChange} placeholder="$0" />
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
                <FormattedInput formatType="number" value={field.value} onChange={field.onChange} placeholder="0" />
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
                <FormattedInput formatType="year" value={field.value} onChange={field.onChange} placeholder="2024" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2">
        <FormField
          control={control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2">
        <OwnerSelect control={control} onOwnerChange={onOwnerChange} />
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
