'use client';

import { FC, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { LatLngExpression, latLng, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { cn } from '@/helpers/helpers';

type Props = {
  center?: LatLngExpression;
  label?: string;
}

const customIcon = new Icon({
  iconUrl: '/images/home_pin.png',
  iconSize: [38, 38],
  iconAnchor: [19, 34],
  popupAnchor: [0, -32],
});

const ResetCenterView = ({ selectPosition }: { selectPosition?: LatLngExpression }) => {
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(latLng(selectPosition), 5, {
        animate: true
      });
    } else {
      map.setZoom(2);
    }
  }, [selectPosition, map]);

  return null;
}

const Map: FC<Props> = ({ center, label }) => {
  return (
    <MapContainer
      className={cn('h-[35vh] rounded-lg relative z-0')}
      center={center || [51, -0.09]}
      zoom={2}
      scrollWheelZoom={false}
    >
      <TileLayer 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      {center && (
        <Marker position={center} icon={customIcon}>
          {label && (
            <Popup className="text-base">{label}</Popup>
          )}
        </Marker>
      )}
      <ResetCenterView selectPosition={center} />
    </MapContainer>
  );
};

export { Map };