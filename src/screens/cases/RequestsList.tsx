import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { AppHeader, Card, Chip, type Tone } from '../../components/ui';
import { Screen } from '../../components/Shell';
import { useDemo } from '../../state/useDemoState';
import type { Case } from '../../data/types';

export const statusTone = (s: Case['status']): Tone => (s === 'resolved' ? 'ok' : s === 'waiting' ? 'warn' : 'info');

export default function RequestsList() {
  const { cases, t } = useDemo();
  const nav = useNavigate();
  return (
    <>
      <AppHeader title={t('requests.title')} back="/home" />
      <Screen nav className="space-y-3 px-4 py-4">
        <p className="text-sm text-ink-soft">Everything you have asked us for, in one place, in plain words.</p>
        {cases.map((c) => (
          <Card key={c.id} onClick={() => nav(`/requests/${c.id}`)}>
            <div className="flex items-start gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] text-ink-soft">{c.product}</p>
                <p className="mt-0.5 font-semibold leading-snug">{c.title}</p>
              </div>
              <ChevronRight size={20} className="mt-1 shrink-0 text-ink-soft" />
            </div>
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              <Chip tone={statusTone(c.status)}>{c.statusLabel}</Chip>
              <span className="text-sm text-ink-soft">{c.status === 'resolved' ? `Closed ${c.closedOn}` : `Next update by ${c.nextUpdateBy}`}</span>
            </div>
            <p className="mt-1.5 text-xs text-ink-soft">Raised via {c.raisedVia}</p>
          </Card>
        ))}
      </Screen>
    </>
  );
}
