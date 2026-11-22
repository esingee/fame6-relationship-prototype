import { AppHeader, Row, Chip } from '../../components/ui';
import { Screen } from '../../components/Shell';
import { Megaphone } from 'lucide-react';
import { useDemo } from '../../state/useDemoState';

const CARDS = [
  { ask: 'You asked to stop daily loan-offer calls.', did: 'We added Offer Calls: Off in Profile → Communication. Your choice is respected for 12 months.', n: 2310 },
  { ask: 'You asked to see EMIs left and amount paid.', did: 'Now in Loans → Repayment Progress.', n: 1240 },
  { ask: 'You asked why you can’t log in with developer mode on.', did: 'We explained why, and added a one-tap fix.', n: 142 },
];

export default function Changed() {
  const { t } = useDemo();
  return (
    <>
      <AppHeader title={t('voice.changed')} back="/voice" />
      <Screen nav className="px-4 py-3">
        <p className="text-sm text-ink-soft">This month’s digest. Three changes, made because customers asked.</p>
        {CARDS.map((c) => (
          <Row key={c.ask}>
            <div className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-accent/25 text-brand-dark"><Megaphone size={19} /></span>
              <div>
                <p className="font-semibold leading-snug">{c.ask}</p>
                <p className="mt-1.5 leading-relaxed">{c.did}</p>
                <Chip tone="brand" className="mt-2.5">Asked by {c.n.toLocaleString('en-IN')} customers</Chip>
              </div>
            </div>
          </Row>
        ))}
      </Screen>
    </>
  );
}
