import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Check, ThumbsDown, ThumbsUp } from 'lucide-react';
import { AppHeader, Button, Card, useToast } from '../../components/ui';
import { Screen } from '../../components/Shell';
import { useDemo } from '../../state/useDemoState';

export default function Recap() {
  const { momentId } = useParams();
  const nav = useNavigate();
  const toast = useToast();
  const { moments, feedback, setFeedback, resetMoment } = useDemo();
  const m = moments.find((x) => x.id === momentId);
  if (!m || !m.available) return <Navigate to="/moments" replace />;

  const done = m.tasks.filter((k) => k.status === 'done');
  const help = m.tasks.filter((k) => k.status === 'need_help');
  const skipped = m.tasks.filter((k) => k.status === 'not_relevant');
  const left = m.tasks.filter((k) => k.status === 'todo');
  const fb = feedback[m.id];

  return (
    <>
      <AppHeader title="Your Recap" back={`/moments/${m.id}`} />
      <Screen className="space-y-3 px-4 py-6">
        <div className="text-center">
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-ok text-white"><Check size={44} strokeWidth={3} /></span>
          <h1 className="mt-3 text-[24px] font-semibold text-brand-dark">{m.id === 'moving' ? 'You’re all set for your move.' : 'You’re all set for this new chapter.'}</h1>
        </div>

        <Card>
          <List title={`Done (${done.length})`} items={done.map((k) => k.title)} empty="Nothing marked done yet." />
          {skipped.length > 0 && <List title={`Skipped (${skipped.length})`} items={skipped.map((k) => k.title)} />}
          {left.length > 0 && <List title={`Still To Do (${left.length})`} items={left.map((k) => k.title)} />}
          {help.length > 0 && <List title="Open Help Request" tone="warn" items={help.map((k) => `${k.title}: ${k.helpRequest}`)} />}
        </Card>

        <p className="rounded-2xl bg-ok-tint p-4 text-center font-semibold text-ok">No sales call will be made because you used this checklist.</p>

        <Card>
          <p className="mb-2 font-semibold">Was this checklist useful?</p>
          <div className="flex gap-3">
            <Button variant={fb === 'up' ? 'primary' : 'outline'} aria-label="Yes, it was useful" aria-pressed={fb === 'up'} onClick={() => setFeedback(m.id, 'up')}><ThumbsUp size={18} /></Button>
            <Button variant={fb === 'down' ? 'primary' : 'outline'} aria-label="No, it was not useful" aria-pressed={fb === 'down'} onClick={() => setFeedback(m.id, 'down')}><ThumbsDown size={18} /></Button>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Button onClick={() => { toast('Checklist saved to your profile'); nav('/home'); }}>Save Checklist</Button>
          <Button variant="outline" onClick={() => { resetMoment(m.id); toast('Checklist deleted'); nav('/moments'); }}>Delete It</Button>
        </div>
      </Screen>
    </>
  );
}

function List({ title, items, empty, tone }: { title: string; items: string[]; empty?: string; tone?: 'warn' }) {
  return (
    <div className="mb-3 last:mb-0">
      <p className={`text-[16px] font-semibold ${tone === 'warn' ? 'text-warn' : 'text-ink'}`}>{title}</p>
      {items.length ? <ul className="mt-1 list-disc space-y-0.5 pl-5">{items.map((i) => <li key={i}>{i}</li>)}</ul> : empty && <p className="mt-1 text-sm text-ink-soft">{empty}</p>}
    </div>
  );
}
