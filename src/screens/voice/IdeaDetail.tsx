import { useParams } from 'react-router-dom';
import { AppHeader, Card, Chip, StageTracker } from '../../components/ui';
import { DecisionNote } from '../../components/DecisionNote';
import { Screen } from '../../components/Shell';
import { useDemo } from '../../state/useDemoState';
import { ideaChip } from './MyIdeas';

export default function IdeaDetail() {
  const { id } = useParams();
  const { ideas } = useDemo();
  const idea = ideas.find((i) => i.id === id);
  if (!idea)
    return (
      <>
        <AppHeader title="Idea" back="/voice/ideas" />
        <Screen className="p-4">We couldn’t find that idea.</Screen>
      </>
    );
  const chip = ideaChip(idea);
  return (
    <>
      <AppHeader title="Your Idea" back="/voice/ideas" />
      <Screen className="space-y-3 px-4 py-4">
        <Card>
          <p className="text-sm text-ink-soft">Idea ID <span className="font-mono font-semibold text-ink">{idea.code}</span> · {idea.category}</p>
          <h1 className="mt-1 text-[20px] font-semibold leading-snug text-brand-dark">{idea.title}</h1>
          <div className="mt-2"><Chip tone={chip.tone}>{chip.label}</Chip></div>
        </Card>

        <Card>
          <StageTracker stage={idea.stage} dates={idea.stageDates} />
        </Card>

        {idea.decision ? (
          <DecisionNote idea={idea} />
        ) : (
          <Card>
            <p className="text-[13px] font-semibold uppercase tracking-wide text-brand-dark">What happens next</p>
            <p className="mt-1 leading-relaxed">{idea.note ?? 'We’ll decide whether to take this forward within 30 days and tell you why, either way.'}</p>
          </Card>
        )}
      </Screen>
    </>
  );
}
