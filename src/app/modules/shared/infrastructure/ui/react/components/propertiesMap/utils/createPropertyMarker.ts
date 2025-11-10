/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { Property } from '@/modules/shared/domain/schemas/property.schema';
import L from 'leaflet';

export const createPropertyMarker = (property: Property): L.DivIcon => {
  const imageUrl = property.coverImage || 'https://via.placeholder.com/40';

  return L.divIcon({
    className: 'custom-property-marker',
    html: `
      <div class="property-marker-wrapper">
        <div class="property-marker-pin">
          <svg width="27" height="41" viewBox="0 0 27 41" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 0C6.044 0 0 6.044 0 13.5c0 10.125 13.5 27.5 13.5 27.5S27 23.625 27 13.5C27 6.044 20.956 0 13.5 0z" fill="#3B82F6"/>
            <circle cx="13.5" cy="13.5" r="6" fill="white"/>
          </svg>
        </div>
        <div class="property-marker-card">
          <img src="${imageUrl}" alt="${property.name}" class="property-marker-image" />
          <div class="property-marker-name">${property.name}</div>
        </div>
      </div>
    `,
    iconSize: [27, 41],
    iconAnchor: [13.5, 41],
    popupAnchor: [0, -41],
  });
};
