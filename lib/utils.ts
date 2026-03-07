import { clsx } from 'clsx';

export function cn(...inputs: Array<string | false | null | undefined>) {
  return clsx(inputs);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}
