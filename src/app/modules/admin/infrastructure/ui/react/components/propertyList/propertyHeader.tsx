import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface PropertyHeaderProps {
  onAddProperty: () => void;
}

export const PropertyHeader = ({ onAddProperty }: PropertyHeaderProps): React.ReactElement => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="font-serif text-2xl lg:text-3xl font-semibold">Properties</h2>
        <p className="mt-2 text-sm lg:text-base text-muted-foreground">Manage all properties on your platform</p>
      </div>
      <Button className="gap-2 w-full sm:w-auto" onClick={onAddProperty}>
        <Plus className="h-4 w-4" />
        <span className="hidden sm:inline">Add Property</span>
        <span className="sm:hidden">Add</span>
      </Button>
    </div>
  );
};
