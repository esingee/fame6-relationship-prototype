import { useNavigate } from 'react-router-dom';
import { ChevronRight, Plus } from 'lucide-react';
import { AppHeader, Button, Card, Chip, type Tone } from '../../components/ui';
import { Screen } from '../../components/Shell';
import { useDemo } from '../../state/useDemoState';
import type { Idea } from '../../data/types';

const STAGE_LABEL = { heard: 'Heard', under_review: 'Under Review', testing: 'Testing With Customers', decision: 'Decision Published' } as const;

export function ideaChip(i: Idea): { label: string; tone: Tone } {
  if (i.stage === 'decision' && i.decision === 'implemented') return { label: 'Decision Published: Implemented', tone: 'ok' };
  if (i.stage === 'decision' && i.decision === 'not_proceeding') return { label: 'Decision Published: Not Proceeding', tone: 'warn' };
  if (i.stage === 'heard') return { label: 'Heard', tone: 'grey' };
  return { label: STAGE_LABEL[i.stage], tone: 'info' };
}

export default function MyIdeas() {
  const { ideas } = useDemo();
  const nav = useNavigate();
  const mine = [...ideas.filter((i) => i.mine)].sort((a, b) => (a.id < b.id ? 1 : -1));
  const pub = ideas.filter((i) => !i.mine && i.decision);

  const row = (i: Idea) => {
    const c = ideaChip(i);
    return (
      <Card key={i.id} onClick={() => nav(`/voice/ideas/${i.id}`)}>
        <div className="flex items-start gap-2">
          <p className="flex-1 font-semibold leading-snug">{i.title}</p>
          <ChevronRight size={20} className="mt-0.5 shrink-0 text-ink-soft" />
        </div>
        <div className="mt-2"><Chip tone={c.tone}>{c.label}</Chip></div>
        {i.note && <p className="mt-2 text-sm leading-relaxed text-ink-soft">{i.note}</p>}
      </Card>
    );
  };

  return (
    <>
      <AppHeader title="My Ideas" back="/voice" />
      <Screen nav className="space-y-3 px-4 py-4">
        <Button full className="!min-h-[50px]" onClick={() => nav('/voice/new')}>
          <Plus size={18} /> Suggest An Improvement
        </Button>
        {mine.map(row)}
        {pub.length > 0 && (
          <>
            <h2 className="pt-2 text-sm font-semibold text-ink-soft">Decisions Everyone Can See</h2>
            {pub.map(row)}
          </>
        )}
      </Screen>
    </>
  );
}
