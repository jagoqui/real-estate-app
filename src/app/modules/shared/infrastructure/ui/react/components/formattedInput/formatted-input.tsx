'use client';

import { Input } from '@/components/ui/input';
import { forwardRef } from 'react';

interface FormattedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: string | number;
  onChange: (value: string | number) => void;
  formatType: 'currency' | 'number' | 'year';
  placeholder?: string;
}

export const FormattedInput = forwardRef<HTMLInputElement, FormattedInputProps>(
  ({ value, onChange, formatType, placeholder, ...props }, ref) => {
    const formatValue = (val: string): string => {
      const numericValue = val.replace(/\D/g, '');

      if (!numericValue) return '';

      switch (formatType) {
        case 'currency': {
          const number = parseInt(numericValue, 10);
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(number);
        }

        case 'number': {
          const number = parseInt(numericValue, 10);
          return new Intl.NumberFormat('en-US').format(number);
        }

        case 'year': {
          const MAX_YEAR_LENGTH = 4;
          return numericValue.slice(0, MAX_YEAR_LENGTH);
        }

        default:
          return numericValue;
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const inputValue = e.target.value;
      const numericValue = inputValue.replace(/\D/g, '');

      if (formatType === 'year') {
        const MAX_YEAR_LENGTH = 4;
        const FUTURE_YEAR_BUFFER = 10;
        const yearNum = parseInt(numericValue, 10);
        const currentYear = new Date().getFullYear();
        if (numericValue.length <= MAX_YEAR_LENGTH && (yearNum <= currentYear + FUTURE_YEAR_BUFFER || !numericValue)) {
          onChange(numericValue);
        }
        return;
      }

      onChange(numericValue);
    };

    const getDisplayValue = (): string => {
      if (!String(value)) return '';

      if (formatType === 'year') {
        return String(value);
      }

      return formatValue(String(value));
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
