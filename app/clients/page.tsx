'use client';

import { useRouter } from 'next/navigation';

const clients = [
  { id: 1, name: 'Brian Cranston' },
  { id: 2, name: 'Amelia Carter' },
  { id: 3, name: 'John Blake' },
  { id: 4, name: 'Sophia Turner' },
  { id: 5, name: 'Oliver Grant' },
  { id: 6, name: 'Grace Bennett' },
];

function stringToColor(name: string) {
  // deterministic color generator
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 70%)`;
}

export default function ClientsListPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <h1 className="text-2xl font-bold mb-6">Clients</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {clients.map((client) => {
          const initials = client.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase();

          return (
            <button
              key={client.id}
              onClick={() => router.push(`/clients/${client.id}`)}
              className="flex flex-col items-center p-6 bg-white border rounded-lg shadow hover:shadow-md transition"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-3"
                style={{ backgroundColor: stringToColor(client.name) }}
              >
                {initials}
              </div>
              <p className="text-gray-800 font-medium">{client.name}</p>
            </button>
          );
        })}
      </div>
    </main>
  );
}
