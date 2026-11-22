import { Sparkles } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { AppHeader, Card, Chip, StageTracker } from '../../components/ui';
import { DecisionNote } from '../../components/DecisionNote';
import { Screen } from '../../components/Shell';
import { useDemo } from '../../state/useDemoState';
import { ideaChip } from './MyIdeas';
import { SupportButton, fmtCount } from '../../components/IdeaCard';
import { fmtDate } from '../../data/ideas';

export default function IdeaDetail() {
  const { id } = useParams();
  const { ideas, supportCount, isSpotlight } = useDemo();
  const idea = ideas.find((i) => i.id === id);
  if (!idea)
    return (
      <>
        <AppHeader title="Idea" back="/voice" />
        <Screen className="p-4">We couldn’t find that idea.</Screen>
      </>
    );
  const chip = ideaChip(idea);
  return (
    <>
      <AppHeader title={idea.mine ? 'Your Idea' : 'Idea'} back="/voice" />
      <Screen className="space-y-3 px-4 py-4">
        <Card>
          <p className="text-sm text-ink-soft">Idea ID <span className="font-mono font-semibold text-ink">{idea.code}</span> · {idea.category}</p>
          <h1 className="mt-1 text-[18px] font-semibold leading-snug text-brand-dark">{idea.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Chip tone={chip.tone}>{chip.label}</Chip>
            {isSpotlight(idea) && <Chip tone="brand">Spotlighted by our team</Chip>}
          </div>
          <p className="mt-3 text-sm text-ink-soft">{fmtCount(supportCount(idea))} {idea.decision ? 'asked for this' : 'support this idea'}</p>
          <p className="text-sm text-ink-soft">Owner: <span className="font-medium text-ink">{idea.owner}</span></p>
          {!idea.decision && <p className="text-sm text-ink-soft">Decision by <span className="font-medium text-ink">{fmtDate(idea.decisionBy)}</span></p>}
          {!idea.decision && <div className="mt-3"><SupportButton idea={idea} /></div>}
        </Card>

        {isSpotlight(idea) && idea.spotlightReasons && (
          <Card className="!bg-brand-tint">
            <p className="flex items-center gap-1.5 text-[15px] font-semibold text-brand-dark"><Sparkles size={16} /> Why we spotlighted this</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {idea.spotlightReasons.map((r) => <span key={r} className="rounded-full bg-white px-3 py-1.5 text-[13px] font-medium text-brand-dark">{r}</span>)}
            </div>
          </Card>
        )}

        <Card>
          <StageTracker stage={idea.stage} dates={idea.stageDates} />
        </Card>

        {idea.decision ? (
          <DecisionNote idea={idea} />
        ) : (
          <Card>
            <p className="text-[15px] font-semibold text-ink">What happens next</p>
            <p className="mt-1 leading-relaxed">{idea.note ?? 'We’ll decide whether to take this forward within 30 days and tell you why, either way.'}</p>
          </Card>
        )}
      </Screen>
    </>
  );
}
