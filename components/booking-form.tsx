'use client';

import { useMemo, useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import { BookingAvailabilityCalendar } from '@/components/booking-availability-calendar';
import type { Locale } from '@/lib/i18n';
import type { Dictionary } from '@/lib/translations';
import { services } from '@/lib/site';

const initialState = { name: '', email: '', phone: '', service: '', date: '', time: '', message: '', website: '' };

export function BookingForm({ locale, dict }: { locale: string; dict: Dictionary }) {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [dateMissing, setDateMissing] = useState(false);
  const startedAt = useMemo(() => Date.now(), []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.date) {
      setDateMissing(true);
      setStatus('error');
      return;
    }

    setStatus('loading');
    setDateMissing(false);
    const response = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, locale, startedAt })
    });

    if (response.ok) {
      setStatus('success');
      setForm(initialState);
      setDateMissing(false);
      trackEvent({ type: 'cta_click', cta: 'booking_submit', locale, path: window.location.pathname });
    } else {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass rounded-[32px] p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={dict.form.name}><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" /></Field>
        <Field label={dict.form.email}><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" /></Field>
        <Field label={dict.form.phone}><input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" /></Field>
        <Field label={dict.form.service}>
          <select required value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="input">
            <option value="">{dict.form.selectPlaceholder}</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>{dict.serviceCards[service.key as keyof typeof dict.serviceCards].title}</option>
            ))}
          </select>
        </Field>
        <Field label={dict.form.time}><input required type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="input" /></Field>
      </div>
      <div className="mt-5">
        <BookingAvailabilityCalendar
          locale={locale as Locale}
          selectedDate={form.date}
          onChange={(value) => {
            setForm({ ...form, date: value });
            setDateMissing(false);
          }}
          labels={{
            title: dict.form.date,
            available: dict.form.calendarAvailable,
            unavailable: dict.form.calendarUnavailable,
            selected: dict.form.calendarSelected,
            loading: dict.form.calendarLoading,
            empty: dict.form.calendarEmpty,
            previousMonth: dict.form.calendarPreviousMonth,
            nextMonth: dict.form.calendarNextMonth,
            helper: dict.form.calendarHelper
          }}
        />
        {dateMissing && <p className="mt-3 text-sm text-red-700">{dict.form.dateRequired}</p>}
      </div>
      <div className="mt-5">
        <Field label={dict.form.message}><textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} placeholder={dict.form.placeholderMessage} className="input resize-none" /></Field>
      </div>
      <div className="hidden">
        <label>{dict.form.honeypot}<input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} /></label>
      </div>
      <button type="submit" disabled={status === 'loading'} className="mt-6 inline-flex rounded-full bg-graphite px-5 py-3 text-sm font-medium text-white transition hover:bg-black disabled:opacity-60">
        {dict.cta.send}
      </button>
      {status === 'success' && <p className="mt-4 text-sm text-green-700">{dict.form.success}</p>}
      {status === 'error' && <p className="mt-4 text-sm text-red-700">{dict.form.error}</p>}
      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 18px;
          border: 1px solid rgba(23,27,34,0.08);
          background: rgba(255,255,255,0.8);
          padding: 0.95rem 1rem;
          color: #171B22;
          outline: none;
          transition: box-shadow 180ms ease, border-color 180ms ease;
        }
        .input:focus {
          border-color: rgba(31,123,255,0.35);
          box-shadow: 0 0 0 4px rgba(31,123,255,0.12);
        }
      `}</style>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-graphite">{label}</span>
      {children}
    </label>
  );
}
