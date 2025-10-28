import { NextResponse } from 'next/server';

const clients = [
  {
    id: '1',
    name: 'Amelia Carter',
    status: 'Active',
    address: '24 Elm Street, London',
    phone: '07900 123456',
    conditions: ['Diabetes', 'Arthritis'],
  },
  {
    id: '2',
    name: 'George Patel',
    status: 'Active',
    address: '17 Oak Lane, London',
    phone: '07888 987654',
    conditions: ['Hypertension'],
  },
  {
    id: '3',
    name: 'Nora Evans',
    status: 'Inactive',
    address: '5 Willow Crescent, London',
    phone: '07777 543210',
    conditions: ['Mobility Issues'],
  },
];

export async function GET() {
  return NextResponse.json(clients);
}
