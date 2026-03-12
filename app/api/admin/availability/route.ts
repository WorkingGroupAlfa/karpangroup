import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getTodayIso } from '@/lib/availability-calendar';
import { readAvailability, writeAvailability } from '@/lib/storage';

const schema = z.object({
  availableDates: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/))
});

export async function GET() {
  const availability = await readAvailability();
  return NextResponse.json(availability);
}

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const parsed = schema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid availability data' }, { status: 400 });
  }

  const todayIso = getTodayIso();
  const normalized = [...new Set(parsed.data.availableDates)]
    .filter((value) => value >= todayIso)
    .sort((left, right) => left.localeCompare(right));

  const nextState = {
    availableDates: normalized,
    updatedAt: new Date().toISOString()
  };

  await writeAvailability(nextState);

  return NextResponse.json(nextState);
}
