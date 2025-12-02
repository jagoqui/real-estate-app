import React from 'react';

export const MapLoadingState = (): React.ReactElement => {
  return (
    <div className="w-full h-[600px] flex items-center justify-center bg-muted/50 rounded-lg">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-muted-foreground">Loading properties map...</p>
      </div>
    </div>
  );
};

export const MapErrorState = ({ message }: { message: string }): React.ReactElement => {
  return (
    <div className="w-full h-[600px] flex items-center justify-center bg-destructive/10 rounded-lg">
      <div className="text-center space-y-2">
        <p className="text-destructive font-medium">Error loading properties</p>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};

export const MapEmptyState = (): React.ReactElement => {
  return (
    <div className="w-full h-[600px] flex items-center justify-center bg-muted/50 rounded-lg">
      <p className="text-muted-foreground">No properties available</p>
    </div>
  );
};
