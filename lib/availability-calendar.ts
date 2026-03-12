export type CalendarCell = {
  key: string;
  iso: string | null;
  dayNumber: number | null;
  isAvailable: boolean;
  isSelected: boolean;
  isPast: boolean;
  isHidden: boolean;
};

const localeMap = {
  ua: 'uk-UA',
  de: 'de-DE',
  en: 'en-US',
  sk: 'sk-SK'
} as const;

function pad(value: number) {
  return String(value).padStart(2, '0');
}

export function getTodayIso() {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export function isoToMonthDate(value: string) {
  const [year, month] = value.split('-').map(Number);
  return new Date(year, month - 1, 1);
}

export function getMonthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function getMonthLabel(date: Date, locale: keyof typeof localeMap) {
  return new Intl.DateTimeFormat(localeMap[locale], { month: 'long', year: 'numeric' }).format(date);
}

export function getWeekdayLabels(locale: keyof typeof localeMap) {
  const formatter = new Intl.DateTimeFormat(localeMap[locale], { weekday: 'short' });
  const monday = new Date(Date.UTC(2024, 0, 1));
  return Array.from({ length: 7 }).map((_, index) => {
    const date = new Date(monday);
    date.setUTCDate(monday.getUTCDate() + index);
    return formatter.format(date);
  });
}

export function isSameMonth(left: Date, right: Date) {
  return left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth();
}

export function buildCalendarCells(params: {
  month: Date;
  availableDates: string[];
  selectedDate?: string;
  todayIso?: string;
  hidePastInCurrentMonth?: boolean;
}) {
  const todayIso = params.todayIso || getTodayIso();
  const todayMonth = isoToMonthDate(todayIso);
  const available = new Set(params.availableDates);
  const monthStart = getMonthStart(params.month);
  const firstDayOffset = (monthStart.getDay() + 6) % 7;
  const daysInMonth = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate();

  const cells: CalendarCell[] = [];

  for (let index = 0; index < firstDayOffset; index += 1) {
    cells.push({
      key: `empty-${index}`,
      iso: null,
      dayNumber: null,
      isAvailable: false,
      isSelected: false,
      isPast: false,
      isHidden: true
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const iso = `${monthStart.getFullYear()}-${pad(monthStart.getMonth() + 1)}-${pad(day)}`;
    const isPast = iso < todayIso;
    const isHidden = Boolean(params.hidePastInCurrentMonth && isPast && isSameMonth(monthStart, todayMonth));

    cells.push({
      key: iso,
      iso,
      dayNumber: day,
      isAvailable: available.has(iso),
      isSelected: params.selectedDate === iso,
      isPast,
      isHidden
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({
      key: `tail-${cells.length}`,
      iso: null,
      dayNumber: null,
      isAvailable: false,
      isSelected: false,
      isPast: false,
      isHidden: true
    });
  }

  return cells;
}
