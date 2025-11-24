// Mapa básico Leaflet
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';

export function MapPicker({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
  function LocationSelector() {
    useMapEvents({
      click(e) {
        onSelect(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  }

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: 300 }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationSelector />
    </MapContainer>
  );
}
