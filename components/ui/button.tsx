import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Button({ className, href, children, variant = 'primary' }: { className?: string; href: string; children: React.ReactNode; variant?: 'primary' | 'secondary' | 'ghost'; }) {
  const base = 'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand';
  const variants = {
    primary: 'bg-graphite text-white shadow-soft hover:-translate-y-0.5 hover:bg-black',
    secondary: 'border border-line bg-white/70 text-graphite backdrop-blur hover:border-electric/30 hover:bg-white',
    ghost: 'text-graphite hover:bg-black/5'
  };

  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}
