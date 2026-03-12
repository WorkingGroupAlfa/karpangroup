'use client';

import { useEffect, useState } from 'react';
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
  selectedDate: string;
  onChange: (value: string) => void;
  labels: {
    title: string;
    available: string;
    unavailable: string;
    selected: string;
    loading: string;
    empty: string;
    previousMonth: string;
    nextMonth: string;
    helper: string;
  };
};

type AvailabilityResponse = {
  availableDates: string[];
};

export function BookingAvailabilityCalendar({ locale, selectedDate, onChange, labels }: Props) {
  const todayIso = getTodayIso();
  const [month, setMonth] = useState(getMonthStart(isoToMonthDate(todayIso)));
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadAvailability() {
      try {
        const response = await fetch('/api/availability', { cache: 'no-store' });
        if (!response.ok) return;

        const data = (await response.json()) as AvailabilityResponse;
        if (active) setAvailableDates(data.availableDates || []);
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadAvailability();

    return () => {
      active = false;
    };
  }, []);

  const cells = buildCalendarCells({
    month,
    availableDates,
    selectedDate,
    todayIso,
    hidePastInCurrentMonth: true
  });

  const weekdayLabels = getWeekdayLabels(locale);
  const currentMonth = getMonthStart(isoToMonthDate(todayIso));
  const hasVisibleAvailableDates = cells.some((cell) => cell.iso && !cell.isPast && cell.isAvailable);

  return (
    <div className="rounded-[26px] border border-white/70 bg-white/72 p-5 shadow-soft backdrop-blur-xl sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-graphite">{labels.title}</p>
          <p className="mt-1 text-sm text-muted">{labels.helper}</p>
        </div>
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

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <LegendTone tone="free" label={labels.available} />
        <LegendTone tone="busy" label={labels.unavailable} />
        {selectedDate && <LegendTone tone="selected" label={labels.selected} />}
      </div>

      <div className="mt-5 rounded-[24px] border border-white/70 bg-white/82 p-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold capitalize text-graphite">{getMonthLabel(month, locale)}</h3>
          {selectedDate && <p className="text-sm text-muted">{selectedDate}</p>}
        </div>

        <div className="mt-4 grid grid-cols-7 gap-2 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
          {weekdayLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-7 gap-2">
          {cells.map((cell) => {
            if (!cell.iso || cell.isHidden) return <div key={cell.key} className="aspect-square" />;

            const disabled = !cell.isAvailable;
            const toneClass = cell.isSelected
              ? 'border-electric bg-graphite text-white shadow-soft'
              : cell.isAvailable
                ? 'border-electric/25 bg-white text-graphite hover:-translate-y-0.5 hover:border-electric/50'
                : 'border-line/60 bg-[#edf1f6] text-muted/60';

            return (
              <button
                key={cell.key}
                type="button"
                disabled={disabled}
                onClick={() => onChange(cell.iso!)}
                className={`aspect-square rounded-[18px] border text-sm font-semibold transition ${toneClass} ${disabled ? 'cursor-not-allowed opacity-90' : ''}`}
              >
                {cell.dayNumber}
              </button>
            );
          })}
        </div>

        {!loading && !hasVisibleAvailableDates && (
          <p className="mt-4 text-sm text-muted">{labels.empty}</p>
        )}

        {loading && (
          <p className="mt-4 text-sm text-muted">{labels.loading}</p>
        )}
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
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/82 text-sm font-semibold text-graphite transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function LegendTone({ label, tone }: { label: string; tone: 'free' | 'busy' | 'selected' }) {
  const toneClass =
    tone === 'free'
      ? 'bg-white border-electric/30'
      : tone === 'selected'
        ? 'bg-graphite border-graphite'
        : 'bg-[#edf1f6] border-line/60';

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/72 px-3 py-1.5 text-xs text-muted">
      <span className={`h-3 w-3 rounded-full border ${toneClass}`} />
      {label}
    </div>
  );
}
