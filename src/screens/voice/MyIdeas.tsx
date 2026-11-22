import { useNavigate } from 'react-router-dom';
import { ChevronRight, Plus } from 'lucide-react';
import { AppHeader, Button, Row, Chip, type Tone } from '../../components/ui';
import { Screen } from '../../components/Shell';
import { useDemo } from '../../state/useDemoState';
import { fmtDate } from '../../data/ideas';
import type { Idea } from '../../data/types';

const STAGE_LABEL = { heard: 'Heard', under_review: 'Under Review', testing: 'Testing With Customers', decision: 'Decision Published' } as const;

export function ideaChip(i: Idea): { label: string; tone: Tone } {
  if (i.stage === 'decision' && i.decision === 'implemented') return { label: 'Decision Published: Implemented', tone: 'ok' };
  if (i.stage === 'decision' && i.decision === 'not_proceeding') return { label: 'Decision Published: Not Proceeding', tone: 'warn' };
  if (i.stage === 'heard') return { label: 'Heard', tone: 'grey' };
  return { label: STAGE_LABEL[i.stage], tone: 'info' };
}

export default function MyIdeas() {
  const { ideas, votes, supportCount, isSpotlight } = useDemo();
  const nav = useNavigate();
  const mine = [...ideas.filter((i) => i.mine)].sort((a, b) => (a.id < b.id ? 1 : -1));
  const supported = ideas.filter((i) => !i.mine && votes[i.id]);
  const pub = ideas.filter((i) => !i.mine && i.decision && !votes[i.id]);

  const row = (i: Idea) => {
    const c = ideaChip(i);
    return (
      <Row key={i.id} onClick={() => nav(`/voice/ideas/${i.id}`)}>
        <div className="flex items-start gap-2">
          <p className="flex-1 font-semibold leading-snug">{i.title}</p>
          <ChevronRight size={20} className="mt-0.5 shrink-0 text-ink-soft" />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Chip tone={c.tone}>{c.label}</Chip>
          {isSpotlight(i) && <Chip tone="brand">Spotlighted by our team</Chip>}
        </div>
        <p className="mt-2 text-sm font-medium">{i.mine ? `${supportCount(i).toLocaleString('en-IN')} ${supportCount(i) === 1 ? 'customer agrees' : 'customers agree'} with you` : `You and ${(supportCount(i) - 1).toLocaleString('en-IN')} others asked for this`}</p>
        <p className="text-xs text-ink-soft">{i.decision ? `Decided on ${i.stageDates.decision}` : `Decision by ${fmtDate(i.decisionBy)}`}</p>
        {i.note && <p className="mt-2 text-sm leading-relaxed text-ink-soft">{i.note}</p>}
      </Row>
    );
  };

  return (
    <>
      <AppHeader title="My Ideas" back="/voice" />
      <Screen nav className="px-4 py-3">
        <Button full className="mb-1 !min-h-[50px]" onClick={() => nav('/voice/new')}>
          <Plus size={18} /> Suggest An Improvement
        </Button>
        {mine.map(row)}
        {supported.length > 0 && (
          <>
            <h2 className="pt-5 text-[15px] font-semibold">Ideas You Support</h2>
            {supported.map(row)}
          </>
        )}
        {pub.length > 0 && (
          <>
            <h2 className="pt-5 text-[15px] font-semibold">Decisions Everyone Can See</h2>
            {pub.map(row)}
          </>
        )}
      </Screen>
    </>
  );
}
