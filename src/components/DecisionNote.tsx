import { Chip } from './ui';
import type { Idea } from '../data/types';

const LABEL: Record<NonNullable<Idea['decision']>, string> = {
  implemented: 'Decision Published: Implemented',
  testing_further: 'Decision Published: Testing Further',
  not_proceeding: 'Decision Published: Not Proceeding',
};

export function DecisionNote({ idea }: { idea: Idea }) {
  const n = idea.decisionNote;
  if (!idea.decision || !n) return null;
  const declined = idea.decision === 'not_proceeding';
  const heading = declined ? ['What we did instead', 'Why we can’t do this', 'What stays the same'] : ['What we changed', 'Why', 'What we didn’t change, and why'];
  return (
    <div className={`rounded-2xl bg-white p-4 shadow-card ring-1 ${declined ? 'ring-warn/40' : 'ring-ok/40'}`}>
      <Chip tone={declined ? 'warn' : 'ok'}>{LABEL[idea.decision]}</Chip>
      <div className="mt-3 space-y-3">
        {declined ? (
          <>
            <Block h={heading[1]} text={n.why} />
            <Block h={heading[0]} text={n.changed} />
          </>
        ) : (
          <>
            <Block h={heading[0]} text={n.changed} />
            <Block h={heading[1]} text={n.why} />
          </>
        )}
        {n.notChanged && <Block h={heading[2]} text={n.notChanged} />}
      </div>
      <p className="mt-3 border-t border-gray-100 pt-3 text-sm text-ink-soft">
        Who decided: <strong className="text-ink">{n.decidedBy}</strong>
      </p>
      {idea.askedBy !== undefined && declined && (
        <p className="mt-1 text-sm text-ink-soft">{idea.askedBy} customers raised this. Everyone who asked has been sent this decision.</p>
      )}
    </div>
  );
}

function Block({ h, text }: { h: string; text: string }) {
  return (
    <div>
      <p className="text-[13px] font-semibold uppercase tracking-wide text-brand-dark">{h}</p>
      <p className="mt-0.5 leading-relaxed">{text}</p>
    </div>
  );
}
