import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate fetched data
  const data = {
    appointments: {
      thisWeek: { hours: '7h 30m', appointments: 21, cancelledHours: '1h' },
      lastWeek: { hours: '10h 15m', appointments: 18, cancelledHours: '2h' },
      lastMonth: { hours: '37h 40m', appointments: 84 },
    },
    checklist: {
      expired: 2,
      expiringSoon: 3,
      complete: 14,
    },
    diary: {
      thisWeek: 5,
      lastWeek: 8,
      lastMonth: 22,
    },
  };

  return NextResponse.json(data);
}
