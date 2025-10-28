import { NextResponse } from 'next/server';

const diaryEntries = [
  {
    id: 'd1',
    date: '2025-10-22T09:00:00Z',
    author: 'John Doe',
    client: 'Amelia Carter',
    entry: 'Completed morning medication check. Client reported mild back pain.',
  },
  {
    id: 'd2',
    date: '2025-10-21T15:00:00Z',
    author: 'Sarah Mills',
    client: 'George Patel',
    entry: 'Routine visit. Client requested help with grocery list.',
  },
  {
    id: 'd3',
    date: '2025-10-20T14:30:00Z',
    author: 'David Stone',
    client: 'Nora Evans',
    entry: 'Follow-up on mobility exercises. Progress noted.',
  },
];

export async function GET() {
  return NextResponse.json(diaryEntries);
}
