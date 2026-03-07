import { Check } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function FeatureList({ title, items }: { title: string; items: string[] }) {
  return (
    <Card>
      <h3 className="text-2xl font-semibold">{title}</h3>
      <div className="mt-6 grid gap-4">
        {items.map((item, index) => (
          <div key={`${index}-${item}`} className="flex items-start gap-3">
            <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand/10 text-brand"><Check className="h-4 w-4" /></div>
            <p className="text-sm leading-7 text-muted">{item}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
