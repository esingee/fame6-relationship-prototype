import { useState, type ReactNode } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CalendarClock, Check, FileUp, MessageSquarePlus, PhoneCall, ShieldAlert } from 'lucide-react';
import { AppHeader, BottomSheet, Button, Card, Chip, Timeline, useToast } from '../../components/ui';
import { Screen } from '../../components/Shell';
import { useDemo } from '../../state/useDemoState';
import { statusTone } from './RequestsList';

const SLOTS = ['Today, 6 to 8 pm', 'Tomorrow, 10 am to 12 pm', 'Tomorrow, 4 to 6 pm'];

function Section({ title, children, tone }: { title: string; children: ReactNode; tone?: 'warn' }) {
  return (
    <section className={tone === 'warn' ? 'rounded-2xl bg-warn-tint p-4' : 'border-b border-gray-100 pb-4'}>
      <h2 className={`mb-1.5 text-[15px] font-semibold ${tone === 'warn' ? 'text-warn' : 'text-ink'}`}>{title}</h2>
      {children}
    </section>
  );
}

export default function CasePage() {
  const { id } = useParams();
  const nav = useNavigate();
  const toast = useToast();
  const { cases, addTimeline, simulateResolve, reopenCase } = useDemo();
  const c = cases.find((x) => x.id === id);
  const [sheet, setSheet] = useState<null | 'info' | 'doc' | 'call' | 'escalate' | 'prompt'>(null);
  const [text, setText] = useState('');
  const [slot, setSlot] = useState(SLOTS[1]);

  if (!c)
    return (
      <>
        <AppHeader title="Request" back="/requests" />
        <Screen className="p-4">We couldn’t find that request.</Screen>
      </>
    );

  const resolved = c.status === 'resolved';
  const close = () => setSheet(null);

  return (
    <>
      <AppHeader title="Your Request" back="/requests" />
      <Screen className="space-y-4 px-4 py-4">
        <div className="border-b border-gray-100 pb-4">
          <h1 className="text-[18px] font-semibold leading-snug text-brand-dark">{titleCase(c.title)}</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Case ID <span className="font-mono font-semibold text-ink">{c.caseNo}</span> · Raised {c.raisedOn} via {c.raisedVia}
          </p>
          <div className="mt-2.5">
            <Chip tone={statusTone(c.status)}>{titleCase(c.statusLabel)}</Chip>
          </div>
        </div>

        <Section title="What You Told Us">
          <p className="leading-relaxed">{c.toldUs}</p>
        </Section>

        <Section title="What We’ve Checked">
          <ul className="space-y-2">
            {[...c.checked, ...(resolved && c.id === 'cn-24817' ? c.resolvedChecks : [])].map((line) => (
              <li key={line} className="flex gap-2.5">
                <Check size={18} className="mt-0.5 shrink-0 text-ok" aria-label="Done" />
                <span className="leading-snug">{line}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Who Is Working On It">
          <p>{c.team}</p>
        </Section>

        {c.found && (
          <Section title="What We Found">
            <p className="leading-relaxed">{c.found}</p>
          </Section>
        )}

        <Section title="What Happens Next">
          {resolved ? (
            <p className="leading-relaxed font-medium text-ok">{c.resolvedNote}</p>
          ) : (
            <p className="leading-relaxed">{emphasiseDate(c.nextStep, c.nextUpdateBy)}</p>
          )}
        </Section>

        {resolved && c.id === 'cn-24817' && (
          <Card className="!bg-ok-tint">
            <p className="flex items-center gap-2 font-semibold text-ok">
              <Check size={18} /> Charge reversed
            </p>
            <p className="mt-1 flex items-center gap-2 font-semibold text-ok">
              <Check size={18} /> Payment matched
            </p>
            <Button variant="outline" className="mt-3" onClick={() => { reopenCase(c.id); toast('Request reopened'); }}>
              Reopen
            </Button>
          </Card>
        )}

        {resolved && c.id !== 'cn-24817' && (
          <Button variant="outline" onClick={() => { reopenCase(c.id); toast('Request reopened'); }}>Reopen</Button>
        )}

        {c.dateChangedReason && !resolved && (
          <Section title="Date Changed?" tone="warn">
            <p className="leading-relaxed text-ink">{c.dateChangedReason}</p>
          </Section>
        )}

        {c.creditNote && (
          <Section title="Your Credit Record">
            <p className="leading-relaxed">{c.creditNote}</p>
          </Section>
        )}

        <Section title="Timeline">
          <Timeline items={c.timeline} />
        </Section>

        <Section title="Your Options">
          <div className="grid grid-cols-2 gap-2.5">
            <Button variant="ghost" onClick={() => setSheet('info')}><MessageSquarePlus size={16} /> Add Information</Button>
            <Button variant="ghost" onClick={() => setSheet('doc')}><FileUp size={16} /> Upload A Document</Button>
            <Button variant="ghost" onClick={() => setSheet('call')}><PhoneCall size={16} /> Request A Call Back</Button>
            <Button variant="ghost" onClick={() => setSheet('escalate')}><ShieldAlert size={16} /> Escalate</Button>
          </div>
        </Section>

        <p className="px-2 pt-1 text-center text-sm text-ink-soft">Every person at the bank sees this same page, so you never have to explain twice.</p>
        <p className="text-center">
          <Link to={`/agent/${c.id}`} className="inline-flex min-h-[44px] items-center text-sm font-semibold text-brand underline">
            See how the bank’s agent view works (demo)
          </Link>
        </p>

        {!resolved && (
          <div className="pb-2 text-center">
            <Button
              variant="quiet"
              onClick={() => {
                simulateResolve(c.id);
                setSheet('prompt');
              }}
            >
              Simulate Next Update (Demo Only)
            </Button>
          </div>
        )}
      </Screen>

      <BottomSheet open={sheet === 'info'} onClose={close} title="Add Information">
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} placeholder="Anything else we should know?" className="w-full rounded-xl border border-gray-300 p-3 text-[16px] outline-none focus:border-brand" />
        <Button full className="mt-3" onClick={() => { addTimeline(c.id, 'You added information'); setText(''); close(); toast('Added to your request'); }}>Send To The Team</Button>
      </BottomSheet>

      <BottomSheet open={sheet === 'doc'} onClose={close} title="Upload A Document">
        <p className="mb-3 text-ink-soft">For this demo, we will attach a sample file. No real file is read or sent.</p>
        <Button full onClick={() => { addTimeline(c.id, 'You uploaded a document'); close(); toast('Document added'); }}>Attach Sample Receipt</Button>
      </BottomSheet>

      <BottomSheet open={sheet === 'call'} onClose={close} title="Request A Call Back">
        <p className="mb-3 text-ink-soft">Pick a time that suits you. We will call from the team already working on this request.</p>
        <div className="space-y-2" role="radiogroup" aria-label="Call back time">
          {SLOTS.map((s) => (
            <button key={s} type="button" role="radio" aria-checked={slot === s} onClick={() => setSlot(s)} className={`flex min-h-[48px] w-full items-center gap-3 rounded-xl border px-3 text-left font-medium ${slot === s ? 'border-brand bg-brand-tint text-brand-dark' : 'border-gray-300'}`}>
              <CalendarClock size={18} /> {s}
            </button>
          ))}
        </div>
        <Button full className="mt-3" onClick={() => { addTimeline(c.id, `You asked for a call back (${slot})`, 'app'); close(); toast('Call back requested'); }}>Confirm Call Back</Button>
      </BottomSheet>

      <BottomSheet open={sheet === 'escalate'} onClose={close} title="Escalate This Request">
        <p className="text-ink-soft">If you are not happy with how this is going, you have two routes. You never lose any of your rights by using them.</p>
        <div className="mt-3 space-y-3">
          <div className="rounded-xl bg-soft p-3">
            <p className="font-semibold">1. Internal Ombudsman</p>
            <p className="text-sm text-ink-soft">A senior person inside the bank, separate from the team handling your case. They look at it again with fresh eyes.</p>
          </div>
          <div className="rounded-xl bg-soft p-3">
            <p className="font-semibold">2. RBI Ombudsman</p>
            <p className="text-sm text-ink-soft">An independent office run by the Reserve Bank of India. You can go here if you disagree with our final answer, or if we have not replied within 30 days. It is free.</p>
          </div>
        </div>
        <Button full className="mt-4" onClick={() => { addTimeline(c.id, 'You asked to escalate this request'); close(); toast('Escalation requested'); }}>Ask For Internal Ombudsman Review</Button>
      </BottomSheet>

      <BottomSheet open={sheet === 'prompt'} onClose={close} title="Your Request Is Resolved">
        <p className="mb-4 text-ink-soft">Thank you for your patience. Two quick things, both optional.</p>
        <div className="space-y-2.5">
          <Button full variant="outline" onClick={() => { close(); toast('Thanks for your rating'); }}>Rate This Interaction</Button>
          <Button full onClick={() => { close(); nav('/voice/new?category=Loans'); }}>Suggest An Improvement</Button>
        </div>
      </BottomSheet>
    </>
  );
}

function emphasiseDate(text: string, date?: string): ReactNode {
  if (!date || !text.includes(date)) return text;
  const [a, ...rest] = text.split(date);
  return (
    <>
      {a}
      <strong>{date}</strong>
      {rest.join(date)}
    </>
  );
}

export function titleCase(s: string) {
  const small = new Set(['a', 'an', 'the', 'for', 'of', 'to', 'but', 'and', 'as', 'at', 'in', 'on', 'i']);
  return s
    .split(' ')
    .map((w, i) => (i > 0 && small.has(w.toLowerCase()) ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ');
}
