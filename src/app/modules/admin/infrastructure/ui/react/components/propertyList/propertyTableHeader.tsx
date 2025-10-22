import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const PropertyTableHeader = (): React.ReactElement => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[200px] sticky left-0 z-20 bg-background shadow-[2px_0_4px_rgba(0,0,0,0.1)] font-medium">
          Property
        </TableHead>
        <TableHead className="flex-1 p-0">
          <div
            className="flex overflow-x-auto"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 transparent' }}
          >
            <div className="w-[180px] flex-shrink-0">Location</div>
            <div className="w-[120px] flex-shrink-0">Price</div>
            <div className="w-[150px] flex-shrink-0">Details</div>
            <div className="w-[150px] flex-shrink-0">Features</div>
            <div className="w-[150px] flex-shrink-0">Amenities</div>
            <div className="w-[120px] flex-shrink-0">Images</div>
            <div className="w-[120px] flex-shrink-0">Owner</div>
            <div className="w-[100px] flex-shrink-0">Status</div>
          </div>
        </TableHead>
        <TableHead className="w-[100px] sticky right-0 z-20 bg-background shadow-[-2px_0_4px_rgba(0,0,0,0.1)] text-right font-medium">
          Actions
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
