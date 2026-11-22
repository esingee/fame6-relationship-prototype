import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { AppHeader, Row, type Tone } from '../../components/ui';
import { Screen } from '../../components/Shell';
import { useDemo } from '../../state/useDemoState';
import type { Case } from '../../data/types';

export const statusTone = (s: Case['status']): Tone => (s === 'resolved' ? 'ok' : s === 'waiting' ? 'warn' : 'info');

export default function RequestsList() {
  const { cases, t } = useDemo();
  const nav = useNavigate();
  return (
    <>
      <AppHeader title={t('requests.title')} back="/service" />
      <Screen nav className="px-4 py-3">
        <p className="pb-2 text-sm text-ink-soft">Everything you have asked us for, in one place, in plain words.</p>
        {cases.map((c) => (
          <Row key={c.id} onClick={() => nav(`/requests/${c.id}`)}>
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-ink-soft">ID: {c.caseNo} · {c.product}</p>
                <p className="mt-0.5 font-semibold leading-snug">{c.title}</p>
                <p className="mt-1 text-xs text-ink-soft">Raised on {c.raisedOn} 2026 via {c.raisedVia}</p>
              </div>
              <span className={`shrink-0 rounded-md border px-2 py-1 text-xs font-medium ${c.status === 'resolved' ? 'border-indigo-300 bg-indigo-50 text-indigo-800' : c.status === 'waiting' ? 'border-warn/50 bg-warn-tint text-warn' : 'border-info/40 bg-info-tint text-info'}`}>{c.statusLabel}</span>
            </div>
            <div className="mt-2.5 flex items-center justify-between">
              <span className="text-sm font-medium text-brand-dark">{c.status === 'resolved' ? `Closed ${c.closedOn}` : `Next update by ${c.nextUpdateBy}`}</span>
              <ChevronRight size={18} className="text-ink-soft" />
            </div>
          </Row>
        ))}
      </Screen>
    </>
  );
}
