import { useNavigate } from 'react-router-dom';
import { ArrowRight, Briefcase, Baby, Heart, HelpCircle, HeartHandshake, MapPin, Sunset } from 'lucide-react';
import { AppHeader, useToast } from '../../components/ui';
import { Screen } from '../../components/Shell';
import { useDemo } from '../../state/useDemoState';

const ICONS: Record<string, typeof MapPin> = { job: Briefcase, moving: MapPin, marriage: Heart, child: Baby, retirement: Sunset, parent: HeartHandshake, other: HelpCircle };

function Signpost() {
  return (
    <svg viewBox="0 0 150 130" className="absolute bottom-0 right-0 h-full max-h-[130px]" aria-hidden="true">
      <path d="M0 130 C30 95 80 85 150 70 V130Z" fill="#F4CFCB" />
      <rect x="78" y="8" width="6" height="104" rx="3" fill="#9C1D27" />
      <path d="M40 22 H100 L112 33 L100 44 H40Z" fill="#EFB9B7" />
      <path d="M118 52 H62 L50 63 L62 74 H118Z" fill="#F4CFCB" />
    </svg>
  );
}

export default function MomentsPicker() {
  const { t, moments } = useDemo();
  const nav = useNavigate();
  const toast = useToast();
  return (
    <>
      <AppHeader title={t('moments.title')} back="/service" />
      <Screen nav className="bg-white pb-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#FDF3F1] to-white px-4 pb-8 pt-6">
          <Signpost />
          <h1 className="relative max-w-[240px] text-[22px] font-semibold leading-tight text-ink">Key life moments, simpler banking.</h1>
          <p className="relative mt-2 max-w-[250px] text-[14px] leading-snug text-ink-soft">Tell us what’s new, and we’ll show you the right things to do, in one place.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 px-4 pt-4">
          {moments.map((m) => {
            const Icon = ICONS[m.id] ?? HelpCircle;
            const done = m.tasks.filter((k) => k.status === 'done').length;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => (m.available ? nav(`/moments/${m.id}`) : toast('Coming soon'))}
                className={`flex min-h-[132px] flex-col items-start rounded-2xl border p-3.5 text-left active:opacity-90 ${m.available ? 'border-brand bg-brand-tint/60' : 'border-gray-200 bg-white'}`}
              >
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${m.available ? 'bg-brand-tint text-brand' : 'bg-[#F1EEEE] text-ink-soft'}`}>
                  <Icon size={22} />
                </span>
                <span className="mt-2.5 text-[15px] font-semibold leading-tight text-ink">{m.title}</span>
                {m.available ? (
                  <span className="mt-auto inline-flex items-center gap-1.5 rounded-full bg-brand-tint px-2.5 py-1 text-[12.5px] font-semibold text-brand-dark">
                    {done > 0 ? `${done} of ${m.tasks.length} done` : `${m.tasks.length} simple tasks`} <ArrowRight size={14} />
                  </span>
                ) : (
                  <span className="mt-auto rounded-full bg-gray-100 px-2.5 py-1 text-[12.5px] font-medium text-ink-soft">Coming soon</span>
                )}
              </button>
            );
          })}
        </div>
      </Screen>
    </>
  );
}
