'use client';

import { Input } from '@/components/ui/input';
import { forwardRef } from 'react';

interface FormattedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: string | number;
  onChange: (value: string | number) => void;
  formatType: 'currency' | 'number' | 'year';
  valueType?: 'number' | 'string';
  placeholder?: string;
}

const formatCurrency = (numericValue: string): string => {
  const number = parseInt(numericValue, 10);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

const formatNumber = (numericValue: string): string => {
  const number = parseInt(numericValue, 10);
  return new Intl.NumberFormat('en-US').format(number);
};

const formatYear = (numericValue: string): string => {
  const MAX_YEAR_LENGTH = 4;
  return numericValue.slice(0, MAX_YEAR_LENGTH);
};

const formatValue = (val: string, formatType: 'currency' | 'number' | 'year'): string => {
  const numericValue = val.replace(/\D/g, '');

  if (!numericValue) return '';

  switch (formatType) {
    case 'currency':
      return formatCurrency(numericValue);
    case 'number':
      return formatNumber(numericValue);
    case 'year':
      return formatYear(numericValue);
    default:
      return numericValue;
  }
};

export const FormattedInput = forwardRef<HTMLInputElement, FormattedInputProps>(
  ({ value, onChange, formatType, valueType, placeholder, ...props }, ref) => {
    // Infer valueType from the initial value type if not explicitly provided
    const inferredValueType = valueType ?? (typeof value === 'number' ? 'number' : 'string');

    if (!value?.toString()) value = '';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const inputValue = e.target.value;
      const numericValue = inputValue.replace(/\D/g, '');

      if (formatType === 'year') {
        const MAX_YEAR_LENGTH = 4;
        const FUTURE_YEAR_BUFFER = 10;
        const yearNum = parseInt(numericValue, 10);
        const currentYear = new Date().getFullYear();
        if (numericValue.length <= MAX_YEAR_LENGTH && (yearNum <= currentYear + FUTURE_YEAR_BUFFER || !numericValue)) {
          // Return as number or string based on inferredValueType
          onChange(inferredValueType === 'number' ? parseInt(numericValue, 10) || 0 : numericValue);
        }
        return;
      }

      // Return as number or string based on inferredValueType
      if (inferredValueType === 'number') {
        onChange(parseInt(numericValue, 10) || 0);
      } else {
        onChange(numericValue);
      }
    };

    const getDisplayValue = (): string => {
      if (!String(value)) return '';

      if (formatType === 'year') {
        return String(value);
      }

      return formatValue(String(value), formatType);
    };

    return (
      <Input
        {...props}
        ref={ref}
        value={getDisplayValue()}
        onChange={handleChange}
        placeholder={placeholder}
        inputMode="numeric"
      />
    );
  }
);

FormattedInput.displayName = 'FormattedInput';
