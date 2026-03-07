import { Card } from '@/components/ui/card';
import type { Dictionary } from '@/lib/translations';

export function ProcessSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="section py-16">
      <span className="eyebrow">{dict.home.processTitle}</span>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {dict.home.processItems.map((item, index) => (
          <Card key={`${index}-${item.title}`}>
            <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-graphite text-sm font-semibold text-white">0{index + 1}</div>
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
