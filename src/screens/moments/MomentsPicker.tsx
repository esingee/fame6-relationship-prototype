import { useNavigate } from 'react-router-dom';
import { Briefcase, Baby, Heart, HelpCircle, HeartHandshake, MapPin, Sunset } from 'lucide-react';
import { AppHeader, Chip, useToast } from '../../components/ui';
import { Screen } from '../../components/Shell';
import { useDemo } from '../../state/useDemoState';

const ICONS: Record<string, typeof MapPin> = { job: Briefcase, moving: MapPin, marriage: Heart, child: Baby, retirement: Sunset, parent: HeartHandshake, other: HelpCircle };

export default function MomentsPicker() {
  const { t, moments } = useDemo();
  const nav = useNavigate();
  const toast = useToast();
  return (
    <>
      <AppHeader title={t('moments.title')} back="/home" />
      <Screen nav className="px-4 py-4">
        <p className="leading-relaxed">
          {t('moments.intro')} <strong>{t('moments.never')}</strong>
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {moments.map((m) => {
            const Icon = ICONS[m.id] ?? HelpCircle;
            const done = m.tasks.filter((k) => k.status === 'done').length;
            return (
              <button key={m.id} type="button" onClick={() => (m.available ? nav(`/moments/${m.id}`) : toast('Coming soon'))} className={`flex min-h-[120px] flex-col items-start rounded-2xl bg-white p-4 text-left shadow-card active:bg-gray-50 ${m.available ? 'ring-2 ring-brand/30' : ''}`}>
                <span className={`flex h-11 w-11 items-center justify-center rounded-full ${m.available ? 'bg-brand text-white' : 'bg-gray-100 text-ink-soft'}`}>
                  <Icon size={22} />
                </span>
                <span className="mt-2 font-semibold leading-tight">{m.title}</span>
                {m.available ? (
                  <span className="mt-1 text-xs text-ink-soft">{done > 0 ? `${done} of ${m.tasks.length} done` : m.blurb}</span>
                ) : (
                  <Chip className="mt-1.5">Coming soon</Chip>
                )}
              </button>
            );
          })}
        </div>
        <p className="mt-4 rounded-xl bg-info-tint p-3 text-sm leading-relaxed text-info">{t('moments.privacy')}</p>
      </Screen>
    </>
  );
}
