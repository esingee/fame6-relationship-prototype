import { useNavigate, useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { AppHeader, Button, Card, StageTracker } from '../../components/ui';
import { Screen } from '../../components/Shell';
import { useDemo } from '../../state/useDemoState';

export default function Receipt() {
  const { id } = useParams();
  const nav = useNavigate();
  const { ideas } = useDemo();
  const idea = ideas.find((i) => i.id === id);
  if (!idea)
    return (
      <>
        <AppHeader title="Idea Receipt" back="/voice" />
        <Screen className="p-4">We couldn’t find that idea.</Screen>
      </>
    );
  return (
    <>
      <AppHeader title="Idea Receipt" back="/voice" />
      <Screen className="space-y-4 px-4 py-6">
        <div className="text-center">
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-ok text-white">
            <Check size={44} strokeWidth={3} />
          </span>
          <h1 className="mt-3 text-[26px] font-semibold text-brand-dark">We heard you.</h1>
          <p className="mt-1 text-ink-soft">Idea ID: <span className="font-mono font-semibold text-ink">{idea.code}</span></p>
        </div>

        <Card>
          <p className="text-[13px] font-semibold uppercase tracking-wide text-brand-dark">What we recorded</p>
          <p className="mt-1 leading-relaxed">{idea.title}</p>
          <p className="mt-1 text-sm text-ink-soft">Category: {idea.category}{idea.voiceNote ? ' · Voice note (0:14) attached' : ''}{idea.language ? ` · Updates in ${idea.language}` : ''}</p>
        </Card>

        <Card>
          <p className="text-[13px] font-semibold uppercase tracking-wide text-brand-dark">What happens next</p>
          <p className="mt-1 leading-relaxed">We’ll decide whether to take this forward within 30 days and tell you why, either way.</p>
        </Card>

        <Card>
          <StageTracker stage="heard" dates={idea.stageDates} />
        </Card>

        <div className="space-y-2.5">
          <Button full onClick={() => nav('/voice/ideas')}>See My Ideas</Button>
          <Button full variant="outline" onClick={() => nav('/home')}>Back To Home</Button>
        </div>
      </Screen>
    </>
  );
}
