// /data/clients.ts

export interface Client {
  id: string;
  name: string;
  status: 'Active' | 'Inactive';
  lastVisit: string;
  nextVisit: string;
  address: string;
}

export const clients: Client[] = [
  {
    id: '1',
    name: 'Amelia Carter',
    status: 'Active',
    lastVisit: '2025-10-20',
    nextVisit: '2025-10-25',
    address: '24 Elm Street, London',
  },
  {
    id: '2',
    name: 'Brian Cranston',
    status: 'Active',
    lastVisit: '2025-10-22',
    nextVisit: '2025-10-26',
    address: '14 Maple Drive, Leeds',
  },
  {
    id: '3',
    name: 'Sophie Turner',
    status: 'Inactive',
    lastVisit: '2025-09-15',
    nextVisit: '-',
    address: '9 Oak Lane, Manchester',
  },
];
