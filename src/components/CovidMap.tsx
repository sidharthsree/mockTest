import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const CovidMap: React.FC = () => {
  const { data, selectedState } = useSelector((state: RootState) => state?.covid);
  
  const filteredData = selectedState === 'All States'
    ? data
    : data?.filter(state => state?.state === selectedState);

  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      style={{ height: '800px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {filteredData?.map((state) => (
        <CircleMarker
          key={state?.state}
          center={state?.coordinates}
          radius={Math.log(state?.totalCases)}
          fillColor="#EF4444"
          color="#991B1B"
          weight={1}
          opacity={0.8}
          fillOpacity={0.6}
        >
          <Popup>
            <div className="text-sm">
              <h3 className="font-semibold">{state?.state}</h3>
              <p>Total Cases: {state?.totalCases?.toLocaleString()}</p>
              <p>Active Cases: {state?.activeCases?.toLocaleString()}</p>
              <p>Recovered: {state?.recovered?.toLocaleString()}</p>
              <p>Deaths: {state?.deaths?.toLocaleString()}</p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default CovidMap;