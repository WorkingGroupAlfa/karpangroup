'use client';

import { useMemo, useState } from 'react';
import {
  addMonths,
  buildCalendarCells,
  getMonthLabel,
  getMonthStart,
  getTodayIso,
  getWeekdayLabels,
  isoToMonthDate
} from '@/lib/availability-calendar';
import type { Locale } from '@/lib/i18n';

type Props = {
  locale: Locale;
  initialAvailableDates: string[];
  labels: {
    title: string;
    description: string;
    available: string;
    unavailable: string;
    save: string;
    saving: string;
    saved: string;
    error: string;
    previousMonth: string;
    nextMonth: string;
  };
};

export function AdminAvailabilityManager({ locale, initialAvailableDates, labels }: Props) {
  const todayIso = getTodayIso();
  const [month, setMonth] = useState(getMonthStart(isoToMonthDate(todayIso)));
  const [availableDates, setAvailableDates] = useState(initialAvailableDates);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const cells = buildCalendarCells({
    month,
    availableDates,
    todayIso,
    hidePastInCurrentMonth: true
  });
  const weekdayLabels = getWeekdayLabels(locale);
  const currentMonth = getMonthStart(isoToMonthDate(todayIso));
  const isDirty = useMemo(
    () => availableDates.join('|') !== [...initialAvailableDates].sort((a, b) => a.localeCompare(b)).join('|'),
    [availableDates, initialAvailableDates]
  );

  function toggleDate(iso: string) {
    setAvailableDates((current) => {
      const next = current.includes(iso) ? current.filter((value) => value !== iso) : [...current, iso];
      return next.sort((left, right) => left.localeCompare(right));
    });
    setStatus('idle');
  }

  async function saveAvailability() {
    setStatus('saving');

    const response = await fetch('/api/admin/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ availableDates })
    });

    setStatus(response.ok ? 'saved' : 'error');
  }

  return (
    <div className="rounded-[28px] border border-line bg-white p-6 shadow-soft">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{labels.title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">{labels.description}</p>
        </div>
        <button
          type="button"
          onClick={saveAvailability}
          disabled={!isDirty || status === 'saving'}
          className="inline-flex rounded-full bg-graphite px-5 py-3 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === 'saving' ? labels.saving : labels.save}
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <LegendTone tone="free" label={labels.available} />
        <LegendTone tone="busy" label={labels.unavailable} />
        {status === 'saved' && <span className="text-sm font-medium text-green-700">{labels.saved}</span>}
        {status === 'error' && <span className="text-sm font-medium text-red-700">{labels.error}</span>}
      </div>

      <div className="mt-6 rounded-[24px] border border-line/70 bg-bg p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold capitalize">{getMonthLabel(month, locale)}</h3>
          <div className="flex items-center gap-2">
            <CalendarNavButton
              onClick={() => setMonth((value) => addMonths(value, -1))}
              disabled={month <= currentMonth}
              label={labels.previousMonth}
            >
              ←
            </CalendarNavButton>
            <CalendarNavButton onClick={() => setMonth((value) => addMonths(value, 1))} label={labels.nextMonth}>
              →
            </CalendarNavButton>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-2 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
          {weekdayLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-7 gap-2">
          {cells.map((cell) => {
            if (!cell.iso || cell.isHidden) return <div key={cell.key} className="aspect-square" />;

            return (
              <button
                key={cell.key}
                type="button"
                onClick={() => toggleDate(cell.iso!)}
                className={`aspect-square rounded-[18px] border text-sm font-semibold transition hover:-translate-y-0.5 ${
                  cell.isAvailable
                    ? 'border-emerald-400/60 bg-emerald-50 text-graphite'
                    : 'border-line/70 bg-white text-muted'
                }`}
              >
                {cell.dayNumber}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CalendarNavButton({
  children,
  disabled,
  label,
  onClick
}: {
  children: React.ReactNode;
  disabled?: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-sm font-semibold text-graphite transition hover:bg-bg disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function LegendTone({ label, tone }: { label: string; tone: 'free' | 'busy' }) {
  const toneClass = tone === 'free' ? 'bg-emerald-50 border-emerald-400/60' : 'bg-white border-line/70';

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-line/70 bg-bg px-3 py-1.5 text-xs text-muted">
      <span className={`h-3 w-3 rounded-full border ${toneClass}`} />
      {label}
    </div>
  );
}
