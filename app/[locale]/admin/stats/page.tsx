import { AdminAvailabilityManager } from '@/components/admin-availability-manager';
import { readAnalytics, readAvailability, readBookings } from '@/lib/storage';
import { getDictionary } from '@/lib/translations';
import { isLocale, type Locale } from '@/lib/i18n';
import { formatNumber } from '@/lib/utils';
import { notFound } from 'next/navigation';

function entries(record: Record<string, number>) {
  return Object.entries(record).sort((a, b) => b[1] - a[1]);
}

export default async function AdminStatsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const analytics = await readAnalytics();
  const bookings = await readBookings();
  const availability = await readAvailability();

  const cards = [
    { label: dict.stats.visits, value: analytics.visits },
    { label: dict.stats.pageViews, value: analytics.pageViews },
    { label: dict.stats.uniqueVisitors, value: analytics.uniqueVisitors.length },
    { label: dict.stats.formSubmissions, value: analytics.formSubmissions }
  ];

  return (
    <div className="section py-16">
      <h1 className="h1">{dict.stats.headline}</h1>
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => (
          <div key={`${index}-${card.label}`} className="rounded-[28px] border border-line bg-white p-6 shadow-soft">
            <p className="text-sm text-muted">{card.label}</p>
            <p className="mt-3 text-3xl font-semibold">{formatNumber(card.value)}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 grid gap-5 xl:grid-cols-2">
        <StatBlock title={dict.stats.trafficSources} data={entries(analytics.trafficSources)} emptyText={dict.stats.noData} />
        <StatBlock title={dict.stats.popularPages} data={entries(analytics.pageHits)} emptyText={dict.stats.noData} />
        <StatBlock title={dict.stats.languages} data={entries(analytics.languages)} emptyText={dict.stats.noData} />
        <StatBlock title={dict.stats.devices} data={entries(analytics.devices)} emptyText={dict.stats.noData} />
        <StatBlock title={dict.stats.ctaClicks} data={entries(analytics.ctaClicks)} emptyText={dict.stats.noData} />
      </div>
      <div className="mt-10">
        <AdminAvailabilityManager
          locale={locale as Locale}
          initialAvailableDates={availability.availableDates}
          labels={{
            title: dict.stats.availabilityTitle,
            description: dict.stats.availabilityText,
            available: dict.stats.availabilityFree,
            unavailable: dict.stats.availabilityBusy,
            save: dict.stats.availabilitySave,
            saving: dict.stats.availabilitySaving,
            saved: dict.stats.availabilitySaved,
            error: dict.stats.availabilityError,
            previousMonth: dict.form.calendarPreviousMonth,
            nextMonth: dict.form.calendarNextMonth
          }}
        />
      </div>
      <div className="mt-10 rounded-[28px] border border-line bg-white p-6 shadow-soft">
        <h2 className="text-2xl font-semibold">{dict.stats.bookings}</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-line text-muted">
              <tr>
                <th className="pb-3 pr-4">{dict.stats.tableName}</th>
                <th className="pb-3 pr-4">{dict.stats.tableEmail}</th>
                <th className="pb-3 pr-4">{dict.stats.tableService}</th>
                <th className="pb-3 pr-4">{dict.stats.tableDate}</th>
                <th className="pb-3 pr-4">{dict.stats.tableLocale}</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 10).map((item, index) => (
                <tr key={index} className="border-b border-line/70">
                  <td className="py-3 pr-4">{String(item.name || '')}</td>
                  <td className="py-3 pr-4">{String(item.email || '')}</td>
                  <td className="py-3 pr-4">{String(item.service || '')}</td>
                  <td className="py-3 pr-4">{String(item.date || '')} {String(item.time || '')}</td>
                  <td className="py-3 pr-4">{String(item.locale || '')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatBlock({ title, data, emptyText }: { title: string; data: Array<[string, number]>; emptyText: string }) {
  return (
    <div className="rounded-[28px] border border-line bg-white p-6 shadow-soft">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-5 space-y-3">
        {data.length === 0 && <p className="text-sm text-muted">{emptyText}</p>}
        {data.map(([key, value], index) => (
          <div key={`${index}-${key}`} className="flex items-center justify-between gap-4 rounded-2xl bg-bg px-4 py-3">
            <span className="truncate text-sm text-muted">{key}</span>
            <span className="text-sm font-semibold">{formatNumber(value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
