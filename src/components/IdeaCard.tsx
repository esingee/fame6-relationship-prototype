import { useNavigate } from 'react-router-dom';
import { Check, ChevronUp } from 'lucide-react';
import { Chip } from './ui';
import { ideaChip } from '../screens/voice/MyIdeas';
import { useDemo } from '../state/useDemoState';
import { fmtDate } from '../data/ideas';
import type { Idea } from '../data/types';

export const fmtCount = (n: number) => `${n.toLocaleString('en-IN')} ${n === 1 ? 'customer' : 'customers'}`;

export function SupportButton({ idea }: { idea: Idea }) {
  const { isSupported, toggleVote } = useDemo();
  if (idea.mine)
    return <span className="shrink-0 rounded-full bg-brand-tint px-3 py-2 text-[13px] font-semibold text-brand-dark">Your idea</span>;
  const on = isSupported(idea);
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={`${on ? 'Remove your support from' : 'Support'}: ${idea.title}`}
      onClick={() => toggleVote(idea.id)}
      className={`flex min-h-[44px] shrink-0 items-center gap-1 rounded-full border px-3 text-[13px] font-semibold ${on ? 'border-brand bg-brand text-white' : 'border-brand bg-white text-brand'}`}
    >
      {on ? <Check size={15} /> : <ChevronUp size={16} />} {on ? 'Supported' : 'Support'}
    </button>
  );
}

/** One idea on the board. No rank numbers anywhere. */
export function BoardCard({ idea, rising }: { idea: Idea; rising?: boolean }) {
  const nav = useNavigate();
  const { supportCount } = useDemo();
  const n = supportCount(idea);
  const chip = ideaChip(idea);
  return (
    <div className="flex items-center gap-3 border-b border-gray-100 py-3 last:border-0">
      <button type="button" onClick={() => nav(`/voice/ideas/${idea.id}`)} className="min-h-[44px] min-w-0 flex-1 text-left">
        <p className="font-semibold leading-snug">{idea.title}</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
          {idea.stage !== 'heard' && <Chip tone={chip.tone}>{chip.label}</Chip>}
          {n < 25 ? <Chip tone="brand">New</Chip> : <span className="text-xs text-ink-soft">{fmtCount(n)}</span>}
          {rising && <span className="text-xs font-semibold text-ok">+{idea.supportersLast30} this month</span>}
        </div>
        {idea.stage !== 'heard' && <p className="mt-1 text-xs text-ink-soft">Decision by {fmtDate(idea.decisionBy)}</p>}
      </button>
      <SupportButton idea={idea} />
    </div>
  );
}
