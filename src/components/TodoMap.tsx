// src/components/TodoMap.tsx
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import type { Todo } from '../types/Todo';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix para ícones do Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';

let DefaultIcon = L.divIcon({
  html: `<img src="${icon}" style="width: 25px; height: 41px;" />`,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface TodoMapProps {
  todos: Todo[];
  onMarkerClick?: (lat: number, lng: number) => void;
  selectMode?: boolean;
}

export function TodoMap({ todos, onMarkerClick, selectMode = false }: TodoMapProps) {
  // Componente para capturar clicks no mapa (para seleção de localização)
  function MapClickHandler() {
    useMapEvents({
      click: (e) => {
        if (selectMode && onMarkerClick) {
          onMarkerClick(e.latlng.lat, e.latlng.lng);
        }
      },
    });
    return null;
  }

  return (
    <div
      style={{
        height: '400px',
        width: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <MapContainer
        center={[-23.5505, -46.6333]}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler />

        {todos.map(
          (todo) =>
            todo.location && (
              <Marker
                key={todo.id}
                position={[todo.location.lat, todo.location.lng]}
                eventHandlers={{
                  click: () =>
                    onMarkerClick && onMarkerClick(todo.location!.lat, todo.location!.lng),
                }}
              >
                <Popup>
                  <div style={{ minWidth: '200px' }}>
                    <h4 style={{ margin: '0 0 8px 0' }}>{todo.title}</h4>
                    <p style={{ margin: '0 0 8px 0', color: '#666' }}>{todo.description}</p>
                    <div style={{ fontSize: '14px' }}>
                      <p>
                        <strong>Prioridade:</strong>
                        <span
                          style={{
                            color:
                              todo.priority === 'high'
                                ? '#d32f2f'
                                : todo.priority === 'medium'
                                  ? '#f57c00'
                                  : '#2e7d32',
                            fontWeight: 'bold',
                            marginLeft: '4px',
                          }}
                        >
                          {todo.priority === 'high'
                            ? 'Alta'
                            : todo.priority === 'medium'
                              ? 'Média'
                              : 'Baixa'}
                        </span>
                      </p>
                      <p>
                        <strong>Status:</strong> {todo.completed ? 'Concluída' : 'Pendente'}
                      </p>
                      {todo.dueDate && (
                        <p>
                          <strong>Vencimento:</strong>{' '}
                          {new Date(todo.dueDate).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            )
        )}
      </MapContainer>
    </div>
  );
}
