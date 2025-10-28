import { NextResponse } from 'next/server';

const appointments = [
  {
    id: 'a1',
    client: 'Amelia Carter',
    carer: 'John Doe',
    date: '2025-10-24T09:00:00Z',
    duration: '30m',
    type: 'Home Visit',
    status: 'Completed',
  },
  {
    id: 'a2',
    client: 'George Patel',
    carer: 'Sarah Mills',
    date: '2025-10-24T11:00:00Z',
    duration: '45m',
    type: 'Medication Check',
    status: 'Scheduled',
  },
  {
    id: 'a3',
    client: 'Nora Evans',
    carer: 'David Stone',
    date: '2025-10-24T13:30:00Z',
    duration: '30m',
    type: 'Welfare Check',
    status: 'Cancelled',
  },
];

export async function GET() {
  return NextResponse.json(appointments);
}
