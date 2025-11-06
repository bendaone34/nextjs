'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ChevronDown, ChevronUp } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Dynamic Leaflet imports
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

export default function ClientsPage() {
  const [L, setL] = useState<any>(null);
  const [activeClient, setActiveClient] = useState('Brian Cranston');
  const [showClientList, setShowClientList] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const clients = ['Brian Cranston', 'Amelia Carter', 'John Blake', 'Sophia Turner'];

  const [clientData, setClientData] = useState<Record<string, any>>({
    'Brian Cranston': {
      personal: { name: 'Brian Cranston', dob: '1956-03-07', gender: 'Male', phone: '07912345678', email: 'brian@example.com' },
      contacts: { name: 'Wendy Cranston', relationship: 'Wife', phone: '07967460201', email: 'email@gmail.com', address: 'Park St, Taunton, TA1 4DQ' },
      location: { line1: '', line2: '', city: '', postcode: '', position: [51.505, -0.09] },
    },
    'Amelia Carter': {
      personal: { name: 'Amelia Carter', dob: '', gender: '', phone: '', email: '' },
      contacts: { name: '', relationship: '', phone: '', email: '', address: '' },
      location: { line1: '', line2: '', city: '', postcode: '', position: [51.51, -0.1] },
    },
    'John Blake': {
      personal: { name: 'John Blake', dob: '', gender: '', phone: '', email: '' },
      contacts: { name: '', relationship: '', phone: '', email: '', address: '' },
      location: { line1: '', line2: '', city: '', postcode: '', position: [51.49, -0.08] },
    },
    'Sophia Turner': {
      personal: { name: 'Sophia Turner', dob: '', gender: '', phone: '', email: '' },
      contacts: { name: '', relationship: '', phone: '', email: '', address: '' },
      location: { line1: '', line2: '', city: '', postcode: '', position: [51.52, -0.11] },
    },
  });

  const currentClient = clientData[activeClient];

  // Load Leaflet
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

  // Update client data helper
  function updateClientSection(section: string, data: any) {
    setClientData((prev) => ({
      ...prev,
      [activeClient]: { ...prev[activeClient], [section]: data },
    }));
  }

  if (!L) return null;

  return (
    <main className="flex h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-300 flex flex-col overflow-y-auto shadow-sm">
        {/* Client Header */}
        <div className="flex flex-col items-center py-4 border-b border-gray-200 relative">
          <div className="w-20 h-20 rounded-full bg-blue-200 text-blue-900 flex items-center justify-center font-semibold text-lg mb-2">
            {activeClient.split(' ').map(n => n[0]).join('')}
          </div>
          <h2 className="text-blue-800 font-semibold text-sm">{activeClient}</h2>

          <button
            onClick={() => setShowClientList(!showClientList)}
            className="text-blue-600 hover:text-blue-800 mt-1"
          >
            {showClientList ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showClientList && (
            <div className="absolute top-[120px] bg-white border border-gray-300 rounded shadow-md w-48 text-sm z-10">
              {clients.map(client => (
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
        <nav className="p-3 text-sm">
          <div className="border border-gray-300 rounded overflow-hidden">
            {[
              'Dashboard',
              'Personal Information',
              'Location',
              'Financial Information',
              'Settings',
              'Contacts',
              'Documents',
              'Diary',
            ].map(item => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`block w-full text-left px-4 py-3 border-b border-gray-200 ${
                  activeTab === item
                    ? 'bg-blue-100 font-semibold text-blue-900'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === 'Dashboard' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
            <p>Overview of {activeClient}'s information and upcoming visits.</p>
          </div>
        )}

        {activeTab === 'Personal Information' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(currentClient.personal).map((key) => (
                <input
                  key={key}
                  type={key === 'dob' ? 'date' : 'text'}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={currentClient.personal[key]}
                  onChange={(e) =>
                    updateClientSection('personal', {
                      ...currentClient.personal,
                      [key]: e.target.value,
                    })
                  }
                  className="px-4 py-2 border rounded"
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Location' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Location</h2>
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
                  value={currentClient.location[key]}
                  onChange={(e) =>
                    updateClientSection('location', {
                      ...currentClient.location,
                      [key]: e.target.value,
                    })
                  }
                  className="px-4 py-2 border rounded"
                />
              ))}
            </div>

            <div className="h-[60vh] rounded-lg overflow-hidden shadow">
              <MapContainer center={currentClient.location.position} zoom={13} scrollWheelZoom className="h-full w-full">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationPicker
                  L={L}
                  position={currentClient.location.position}
                  setPosition={(pos: [number, number]) =>
                    updateClientSection('location', { ...currentClient.location, position: pos })
                  }
                />
                <AutoCenter position={currentClient.location.position} />
              </MapContainer>
            </div>
          </div>
        )}

        {activeTab === 'Contacts' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Next of Kin</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(currentClient.contacts).map((key) => (
                <input
                  key={key}
                  type="text"
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={currentClient.contacts[key]}
                  onChange={(e) =>
                    updateClientSection('contacts', {
                      ...currentClient.contacts,
                      [key]: e.target.value,
                    })
                  }
                  className="px-4 py-2 border rounded"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

/* Leaflet helpers */
function LocationPicker({ L, position, setPosition }: any) {
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
      map.flyTo(position, 15, { animate: true, duration: 1.2 });
    }
  }, [map, position]);
  return null;
}
