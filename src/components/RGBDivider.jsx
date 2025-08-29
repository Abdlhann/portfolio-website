import React from 'react';

export function RGBDivider() {
  return (
    <div className="w-full h-[2px] relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-500 via-green-500 to-blue-500 animate-rgbLine" />
    </div>
  );
}
