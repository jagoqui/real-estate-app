import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface PropertyHeaderProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const PropertyHeader = ({ value, onValueChange }: PropertyHeaderProps): React.ReactElement => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name, address or city..."
          value={value}
          onChange={e => onValueChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
};
