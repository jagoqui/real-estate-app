import React from 'react';

export const ImageLoadingState = (): React.ReactElement => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-sm text-muted-foreground">Loading images...</div>
    </div>
  );
};
