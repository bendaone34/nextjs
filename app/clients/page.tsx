'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ChevronDown, ChevronUp, Menu } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Dynamic Leaflet imports (no SSR)
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

export default function ClientsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showClientList, setShowClientList] = useState(false);
  const [activeClient, setActiveClient] = useState('Brian Cranston');
  const [L, setL] = useState<any>(null);

  const clients = ['Brian Cranston', 'Amelia Carter', 'John Blake', 'Sophia Turner'];

  const [form, setForm] = useState({ line1: '', line2: '', city: '', postcode: '' });
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);

  // Load Leaflet only on client
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

  // Geocode address from form
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

  return (
    <main className="flex h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-[#f7f9fc] border-r border-gray-300 flex flex-col transition-all duration-300 overflow-hidden`}
      >
        {/* Profile header */}
        <div className="flex flex-col items-center py-5 border-b border-gray-300 relative">
          <div className="w-20 h-20 rounded bg-gray-200 border border-gray-300 mb-2" />
          <h2 className="text-blue-800 font-semibold text-sm">{activeClient}</h2>
          <p className="text-gray-500 text-xs mb-1">Active Client</p>

          {/* ▼ Dropdown toggle */}
          <button
            onClick={() => setShowClientList(!showClientList)}
            className="text-blue-600 hover:text-blue-800 transition"
          >
            {showClientList ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {/* Client dropdown */}
          {showClientList && (
            <div className="absolute top-[130px] bg-white border border-gray-300 rounded shadow-md w-48 text-sm z-10">
              {clients.map((client) => (
                <button
                  key={client}
                  onClick={() => {
                    setActiveClient(client);
                    setShowClientList(false);
                  }}
                  className={`w-full text-left px-3 py-2 hover:bg-blue-50 ${
                    activeClient === client ? 'bg-blue-100 font-semibold text-blue-800' : ''
                  }`}
                >
                  {client}
                </button>
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

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Small menu button for mobile */}
        <div className="md:hidden flex items-center bg-sky-900 text-white px-4 py-3 shadow-md">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-200">
            <Menu />
          </button>
          <h1 className="ml-3 text-lg font-semibold">Client Location</h1>
        </div>

        {/* Page content */}
        <section className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Client Location</h2>

          {/* Address Form */}
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
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationPicker position={position} setPosition={setPosition} L={L} />
              <AutoCenter position={position} />
            </MapContainer>
          </div>
        </section>
      </div>
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
      <Popup>Drag me to fine-tune location</Popup>
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
