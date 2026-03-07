import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { appendBooking, readAnalytics, writeAnalytics } from '@/lib/storage';

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(5).max(60),
  service: z.string().min(2).max(80),
  date: z.string().min(4).max(40),
  time: z.string().min(2).max(20),
  message: z.string().max(1000).optional().default(''),
  locale: z.string().min(2).max(5),
  website: z.string().optional().default(''),
  startedAt: z.number()
});

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const data = parsed.data;

  if (data.website) {
    return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
  }

  if (Date.now() - data.startedAt < 2500) {
    return NextResponse.json({ error: 'Submitted too quickly' }, { status: 400 });
  }

  const entry = { ...data, createdAt: new Date().toISOString() };
  await appendBooking(entry);

  const analytics = await readAnalytics();
  analytics.formSubmissions += 1;
  await writeAnalytics(analytics);

  return NextResponse.json({ ok: true });
}
