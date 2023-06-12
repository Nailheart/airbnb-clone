'use client';

import { FC, useEffect } from 'react';
import L, { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { cn } from '@/helpers/helpers';

type Props = {
  center?: LatLngExpression;
}

const ResetCenterView = ({ selectPosition }: { selectPosition?: LatLngExpression }) => {
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(
        L.latLng(selectPosition),
        5,
        {
          animate: true
        }
      )
    } else {
      map.setZoom(2);
    }
  }, [selectPosition]);

  return null;
}

const Map: FC<Props> = ({ center }) => {
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
        <Marker position={center}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
      <ResetCenterView selectPosition={center} />
    </MapContainer>
  );
};

export { Map };