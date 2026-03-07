import Image from 'next/image';
import Link from 'next/link';

export function Logo({ locale }: { locale: string }) {
  return (
    <Link href={`/${locale}`} className="flex items-center gap-3 rounded-full border border-white/60 bg-white/80 px-3 py-2 shadow-soft backdrop-blur">
      <div className="relative h-9 w-[132px] sm:h-10 sm:w-[150px]">
        <Image src="/logo-karpan.png" alt="Karpan Climate Service" fill className="object-contain object-left" priority />
      </div>
    </Link>
  );
}
