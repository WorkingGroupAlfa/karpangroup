import { NextResponse } from 'next/server';
import { readAvailability } from '@/lib/storage';

export async function GET() {
  const availability = await readAvailability();
  return NextResponse.json(availability);
}
