'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ChevronDown, ChevronUp } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Dynamic Leaflet imports (no SSR)
const MapContainer = dynamic(() => import('react-leaflet').then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((m) => m.Popup), { ssr: false });

const clients = [
  { id: '1', name: 'Brian Cranston' },
  { id: '2', name: 'Amelia Carter' },
  { id: '3', name: 'John Blake' },
  { id: '4', name: 'Sophia Turner' },
  { id: '5', name: 'Oliver Grant' },
  { id: '6', name: 'Grace Bennett' },
];

function stringToColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 70%)`;
}

export default function ClientDetailsPage() {
  const params = useParams();
  const clientId = params.id as string;
  const client = clients.find((c) => c.id === clientId) || clients[0];

  const [showClientList, setShowClientList] = useState(false);
  const [L, setL] = useState<any>(null);
  const [form, setForm] = useState({ line1: '', line2: '', city: '', postcode: '' });
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);

  useEffect(() => {
    import('leaflet').then((leaflet) => {
      const Lmod = leaflet.default;
      delete (Lmod.Icon.Default.prototype as any)._getIconUrl;
      Lmod.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
      setL(Lmod);
    });
  }, []);

  // Auto-geocode address
  useEffect(() => {
    const fullAddress = `${form.line1} ${form.line2} ${form.city} ${form.postcode}`.trim();
    if (!fullAddress) return;

    const delay = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`
        );
        const data = await res.json();
        if (data?.length) {
          setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        }
      } catch (err) {
        console.warn('Geocode error:', err);
      }
    }, 800);

    return () => clearTimeout(delay);
  }, [form]);

  if (!L) return null;

  const initials = client.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <main className="flex h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-[#f7f9fc] border-r border-gray-300 flex flex-col overflow-hidden">
        {/* Profile header */}
        <div className="flex flex-col items-center py-5 border-b border-gray-300 relative">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-2"
            style={{ backgroundColor: stringToColor(client.name) }}
          >
            {initials}
          </div>
          <h2 className="text-blue-800 font-semibold text-sm">{client.name}</h2>
          <p className="text-gray-500 text-xs mb-1">Active Client</p>

          <button
            onClick={() => setShowClientList(!showClientList)}
            className="text-blue-600 hover:text-blue-800 transition"
          >
            {showClientList ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {/* Client dropdown */}
          {showClientList && (
            <div className="absolute top-[130px] bg-white border border-gray-300 rounded shadow-md w-48 text-sm z-10">
              {clients.map((c) => (
                <a
                  key={c.id}
                  href={`/clients/${c.id}`}
                  className={`block px-3 py-2 hover:bg-blue-50 ${
                    c.id === clientId ? 'bg-blue-100 font-semibold text-blue-800' : ''
                  }`}
                >
                  {c.name}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 px-2 pt-3 pb-8 text-sm">
          <div className="flex flex-col border border-gray-300 rounded overflow-hidden">
            {[
              'Dashboard',
              'Personal Information',
              'Location',
              'Financial Information',
              'Settings',
              'Contacts',
              'Documents',
              'Diary',
            ].map((item) => (
              <button
                key={item}
                className={`text-left px-4 py-2.5 border-b border-gray-200 hover:bg-blue-50 ${
                  item === 'Location' ? 'bg-blue-100 font-semibold text-blue-900' : 'text-gray-700'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Section */}
      <section className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">{client.name}'s Location</h2>

        {/* Address Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {['line1', 'line2', 'city', 'postcode'].map((key) => (
            <input
              key={key}
              type="text"
              placeholder={
                key === 'line1'
                  ? 'Address Line 1'
                  : key === 'line2'
                  ? 'Address Line 2'
                  : key === 'city'
                  ? 'City'
                  : 'Postcode'
              }
              value={(form as any)[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="px-4 py-2 border rounded"
            />
          ))}
        </div>

        {/* Map */}
        <div className="h-[70vh] w-full rounded-lg overflow-hidden shadow">
          <MapContainer center={position} zoom={13} scrollWheelZoom className="h-full w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <LocationPicker position={position} setPosition={setPosition} L={L} />
            <AutoCenter position={position} />
          </MapContainer>
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Helper Components */
/* -------------------------------------------------------------------------- */

function LocationPicker({ position, setPosition, L }: any) {
  const { useMapEvents } = require('react-leaflet');
  useMapEvents({
    click(e: any) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  const markerIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <Marker
      position={position}
      draggable
      eventHandlers={{
        dragend: (e: any) => {
          const pos = e.target.getLatLng();
          setPosition([pos.lat, pos.lng]);
        },
      }}
      icon={markerIcon}
    >
      <Popup>Drag to fine-tune location</Popup>
    </Marker>
  );
}

function AutoCenter({ position }: any) {
  const { useMap } = require('react-leaflet');
  const map = useMap();
  useEffect(() => {
    if (map && typeof map.flyTo === 'function') {
      map.flyTo(position, 15, { animate: true, duration: 1.5 });
    }
  }, [map, position]);
  return null;
}
