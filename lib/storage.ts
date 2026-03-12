import { promises as fs } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const analyticsPath = path.join(dataDir, 'analytics.json');
const bookingsPath = path.join(dataDir, 'bookings.json');
const availabilityPath = path.join(dataDir, 'availability.json');

export type AnalyticsStore = {
  visits: number;
  pageViews: number;
  uniqueVisitors: string[];
  trafficSources: Record<string, number>;
  pageHits: Record<string, number>;
  ctaClicks: Record<string, number>;
  languages: Record<string, number>;
  devices: Record<string, number>;
  formSubmissions: number;
  events: Array<{ type: string; path?: string; locale?: string; source?: string; device?: string; at: string }>;
};

export type AvailabilityStore = {
  availableDates: string[];
  updatedAt: string | null;
};

const defaultAnalytics: AnalyticsStore = {
  visits: 0,
  pageViews: 0,
  uniqueVisitors: [],
  trafficSources: {},
  pageHits: {},
  ctaClicks: {},
  languages: {},
  devices: {},
  formSubmissions: 0,
  events: []
};

const defaultAvailability: AvailabilityStore = {
  availableDates: [],
  updatedAt: null
};

async function ensureFile(filePath: string, initial: unknown) {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, JSON.stringify(initial, null, 2), 'utf8');
  }
}

export async function readAnalytics() {
  await ensureFile(analyticsPath, defaultAnalytics);
  const raw = await fs.readFile(analyticsPath, 'utf8');
  return JSON.parse(raw) as AnalyticsStore;
}

export async function writeAnalytics(data: AnalyticsStore) {
  await ensureFile(analyticsPath, defaultAnalytics);
  await fs.writeFile(analyticsPath, JSON.stringify(data, null, 2), 'utf8');
}

export async function appendBooking(entry: Record<string, unknown>) {
  await ensureFile(bookingsPath, []);
  const raw = await fs.readFile(bookingsPath, 'utf8');
  const existing = JSON.parse(raw) as Record<string, unknown>[];
  existing.unshift(entry);
  await fs.writeFile(bookingsPath, JSON.stringify(existing, null, 2), 'utf8');
}

export async function readBookings() {
  await ensureFile(bookingsPath, []);
  const raw = await fs.readFile(bookingsPath, 'utf8');
  return JSON.parse(raw) as Record<string, unknown>[];
}

export async function readAvailability() {
  await ensureFile(availabilityPath, defaultAvailability);
  const raw = await fs.readFile(availabilityPath, 'utf8');
  return JSON.parse(raw) as AvailabilityStore;
}

export async function writeAvailability(data: AvailabilityStore) {
  await ensureFile(availabilityPath, defaultAvailability);
  await fs.writeFile(availabilityPath, JSON.stringify(data, null, 2), 'utf8');
}
