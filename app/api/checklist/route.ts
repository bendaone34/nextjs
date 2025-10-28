import { NextResponse } from 'next/server';

const checklist = {
  expired: 2,
  expiringSoon: 3,
  complete: 14,
  requiredDocs: [
    { name: 'DBS Certificate', status: 'Complete' },
    { name: 'Right to Work', status: 'Expiring soon' },
    { name: 'Training – First Aid', status: 'Expired' },
  ],
};

export async function GET() {
  return NextResponse.json(checklist);
}
