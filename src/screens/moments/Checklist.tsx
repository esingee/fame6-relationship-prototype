import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AlertTriangle, MapPin } from 'lucide-react';
import { AppHeader, BottomSheet, Button, ProgressMeter, Toggle, useToast } from '../../components/ui';
import { TaskCard } from '../../components/TaskCard';
import { Screen } from '../../components/Shell';
import { useDemo } from '../../state/useDemoState';
import type { MomentTask } from '../../data/types';

const HELP = ['Call me back', 'Chat', 'Visit a branch'];

export default function Checklist() {
  const { momentId } = useParams();
  const nav = useNavigate();
  const toast = useToast();
  const { moments, setTaskStatus, setReminder } = useDemo();
  const m = moments.find((x) => x.id === momentId);
  const [openId, setOpenId] = useState<string | null>(null);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [helping, setHelping] = useState(false);

  if (!m || !m.available) return <Navigate to="/moments" replace />;

  const active = m.tasks.filter((k) => k.status !== 'not_relevant');
  const done = m.tasks.filter((k) => k.status === 'done').length;
  const open = m.tasks.find((k) => k.id === openId);
  const menu = m.tasks.find((k) => k.id === menuId);
  const allSettled = m.tasks.every((k) => k.status === 'done' || k.status === 'not_relevant');
  const closeSheet = () => { setOpenId(null); setHelping(false); };
  const markDone = (k: MomentTask) => { setTaskStatus(m.id, k.id, 'done'); closeSheet(); };

  return (
    <>
      <AppHeader title={m.title} back="/moments" />
      <Screen className="space-y-3 px-4 py-4">
        <div className="rounded-2xl bg-gradient-to-br from-[#B3222B] to-[#8F161D] p-4 text-white shadow-card">
          <ProgressMeter done={done} total={active.length} label={`${done} of ${active.length} done`} />
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-card">
          <div className="flex-1">
            <p className="font-semibold">Remind me once in 3 days</p>
            <p className="text-xs text-ink-soft">At most one reminder per task. We never use reminders to sell.</p>
          </div>
          <Toggle on={m.reminder} onChange={(v) => setReminder(m.id, v)} label="Remind me once in 3 days" />
        </div>

        {m.tasks.map((k, i) => (
          <TaskCard key={k.id} n={i + 1} task={k} onOpen={() => setOpenId(k.id)} onMenu={() => setMenuId(k.id)} />
        ))}

        <Button full className="!min-h-[52px]" onClick={() => nav(`/moments/${m.id}/done`)}>
          {allSettled ? 'See My Recap' : 'Finish For Now'}
        </Button>
      </Screen>

      <BottomSheet open={!!open} onClose={closeSheet} title={open?.title}>
        {open && !helping && (
          <>
            <p className="leading-relaxed">{open.detail}</p>
            {open.tip && (
              <p className="mt-3 flex gap-2 rounded-xl bg-warn-tint p-3 text-sm leading-relaxed text-ink ring-1 ring-warn/30">
                <AlertTriangle size={18} className="mt-0.5 shrink-0 text-warn" aria-hidden />
                <span><strong className="text-warn">Good to know: </strong>{open.tip}</span>
              </p>
            )}
            <TaskExtras id={open.id} />
            <div className="mt-4 space-y-2.5">
              {open.id === 'm1' || open.id === 'm2' || open.id === 'r1' ? (
                <Button full onClick={() => { markDone(open); toast('Opened the journey (demo). Marked as done'); }}>Go To This Journey</Button>
              ) : null}
              <Button full variant={open.id === 'm1' || open.id === 'm2' || open.id === 'r1' ? 'outline' : 'primary'} onClick={() => markDone(open)}>Mark As Done</Button>
              <Button full variant="ghost" onClick={() => setHelping(true)}>I Need Help</Button>
            </div>
          </>
        )}
        {open && helping && (
          <>
            <p className="mb-3 text-ink-soft">How would you like us to help? We’ll note it on this task.</p>
            <div className="space-y-2.5">
              {HELP.map((h) => (
                <Button key={h} full variant="outline" onClick={() => { setTaskStatus(m.id, open.id, 'need_help', h); closeSheet(); toast(`Help requested: ${h}`); }}>{h}</Button>
              ))}
            </div>
          </>
        )}
      </BottomSheet>

      <BottomSheet open={!!menu} onClose={() => setMenuId(null)} title="Task Options">
        {menu && (
          <div className="space-y-2.5">
            {menu.status === 'not_relevant' ? (
              <Button full variant="outline" onClick={() => { setTaskStatus(m.id, menu.id, 'todo'); setMenuId(null); }}>Bring It Back</Button>
            ) : (
              <Button full variant="outline" onClick={() => { setTaskStatus(m.id, menu.id, 'not_relevant'); setMenuId(null); }}>Not Relevant To Me</Button>
            )}
            {menu.status === 'done' && <Button full variant="ghost" onClick={() => { setTaskStatus(m.id, menu.id, 'todo'); setMenuId(null); }}>Mark As To Do</Button>}
          </div>
        )}
      </BottomSheet>
    </>
  );
}

function TaskExtras({ id }: { id: string }) {
  const [rec, setRec] = useState<Record<string, 'Keep' | 'Change'>>({ Rent: 'Keep', SIP: 'Keep', Electricity: 'Keep' });
  const [ch, setCh] = useState({ SMS: true, WhatsApp: true, Email: false });
  const [lang, setLang] = useState('English');

  if (id === 'm3')
    return (
      <ul className="mt-3 space-y-2">
        {[['Rent', '₹18,000 · 1st of every month'], ['SIP', '₹5,000 · 5th of every month'], ['Electricity', 'Auto-pay · about ₹1,350']].map(([k, d]) => (
          <li key={k} className="flex items-center gap-2 rounded-xl bg-app p-3">
            <span className="flex-1"><span className="block font-semibold">{k}</span><span className="text-xs text-ink-soft">{d}</span></span>
            {(['Keep', 'Change'] as const).map((o) => (
              <button key={o} type="button" aria-pressed={rec[k] === o} onClick={() => setRec((r) => ({ ...r, [k]: o }))} className={`min-h-[44px] rounded-full border px-3 text-sm font-medium ${rec[k] === o ? 'border-brand bg-brand text-white' : 'border-gray-300 bg-white'}`}>{o}</button>
            ))}
          </li>
        ))}
      </ul>
    );

  if (id === 'm4')
    return (
      <div className="mt-3 space-y-2">
        {(Object.keys(ch) as (keyof typeof ch)[]).map((k) => (
          <div key={k} className="flex items-center justify-between rounded-xl bg-app p-3">
            <span className="font-medium">{k}</span>
            <Toggle on={ch[k]} onChange={(v) => setCh((c) => ({ ...c, [k]: v }))} label={`${k} alerts`} />
          </div>
        ))}
        <div className="flex flex-wrap gap-2 pt-1" role="radiogroup" aria-label="Language">
          {['English', 'हिंदी', 'मराठी'].map((l) => (
            <button key={l} type="button" role="radio" aria-checked={lang === l} onClick={() => setLang(l)} className={`min-h-[44px] rounded-full border px-4 text-sm font-medium ${lang === l ? 'border-brand bg-brand-tint text-brand-dark' : 'border-gray-300'}`}>{l}</button>
          ))}
        </div>
      </div>
    );

  if (id === 'm5')
    return (
      <ul className="mt-3 space-y-2">
        {[['Andheri West Branch', '1.2 km'], ['Powai Branch', '3.4 km'], ['Bandra Kurla Complex Branch', '5.1 km']].map(([n, d]) => (
          <li key={n} className="flex items-center gap-3 rounded-xl bg-app p-3">
            <MapPin size={18} className="text-brand" aria-hidden />
            <span className="flex-1 font-medium">{n}</span>
            <span className="text-sm text-ink-soft">{d}</span>
          </li>
        ))}
      </ul>
    );
  return null;
}
