import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FormattedInput } from '@/modules/shared/infrastructure/ui/react/components/formattedInput/formatted-input';
import React from 'react';
import type { Property } from '../propertiesManagement.layout';

interface BasicInfoTabProps {
  formData: {
    name: string;
    price: string;
    area: string;
    buildYear: string;
    status: Property['status'];
    ownerName: string;
    ownerId: string;
    description: string;
  };
  onChange: (updates: Partial<BasicInfoTabProps['formData']>) => void;
}

// eslint-disable-next-line max-lines-per-function
export const BasicInfoTab = React.memo(({ formData, onChange }: BasicInfoTabProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="name">Property Name</Label>
        <Input id="name" value={formData.name} onChange={e => onChange({ name: e.target.value })} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price (USD)</Label>
        <FormattedInput
          id="price"
          formatType="currency"
          value={formData.price}
          onChange={(value: string) => onChange({ price: value })}
          placeholder="$0"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="area">Area (m²)</Label>
        <FormattedInput
          id="area"
          formatType="number"
          value={formData.area}
          onChange={(value: string) => onChange({ area: value })}
          placeholder="0"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="buildYear">Build Year</Label>
        <FormattedInput
          id="buildYear"
          formatType="year"
          value={formData.buildYear}
          onChange={(value: string) => onChange({ buildYear: value })}
          placeholder="2024"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value: Property['status']) => onChange({ status: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="sold">Sold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ownerName">Owner</Label>
        <Input id="ownerName" value={formData.ownerName} disabled required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ownerId">Owner ID</Label>
        <Input id="ownerId" value={formData.ownerId} onChange={e => onChange({ ownerId: e.target.value })} required />
      </div>

      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={e => onChange({ description: e.target.value })}
          rows={3}
          required
        />
      </div>
    </div>
  );
});

BasicInfoTab.displayName = 'BasicInfoTab';
