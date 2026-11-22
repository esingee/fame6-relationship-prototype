import { AppHeader, Row, Chip } from '../../components/ui';
import { Screen } from '../../components/Shell';
import { Megaphone } from 'lucide-react';
import { useDemo } from '../../state/useDemoState';
import { fmtCount } from '../../components/IdeaCard';

export default function Changed() {
  const { t, ideas, votes } = useDemo();
  const cards = ideas.filter((i) => i.decision && i.decisionNote);
  return (
    <>
      <AppHeader title={t('voice.changed')} back="/voice" />
      <Screen nav className="px-4 py-3">
        <p className="text-sm text-ink-soft">This month’s digest. {cards.length} decisions, made because customers asked.</p>
        {cards.map((i) => (
          <Row key={i.id}>
            <div className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-accent/25 text-brand-dark"><Megaphone size={19} /></span>
              <div>
                <p className="font-semibold leading-snug">Customers asked: {i.title}</p>
                <p className="mt-1.5 leading-relaxed">{i.decisionNote!.changed}</p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  <Chip tone="brand">Asked by {fmtCount(i.supporters)}</Chip>
                  <Chip tone={i.decision === 'implemented' ? 'ok' : 'warn'}>{i.decision === 'implemented' ? 'Implemented' : 'Not proceeding'}</Chip>
                  {(i.mine || votes[i.id]) && <Chip tone="info">Your idea</Chip>}
                </div>
              </div>
            </div>
          </Row>
        ))}
      </Screen>
    </>
  );
}
