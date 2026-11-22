import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, FlaskConical, Lightbulb, Megaphone, Plus, Sparkles } from 'lucide-react';
import { AppHeader, BottomSheet, Button, Card, Chip } from '../../components/ui';
import { Screen } from '../../components/Shell';
import { BoardCard, fmtCount } from '../../components/IdeaCard';
import { useDemo } from '../../state/useDemoState';
import { fmtDate, isOpen } from '../../data/ideas';
import { ideaChip } from './MyIdeas';

type Tab = 'top' | 'rising' | 'decided';
const TABS: { id: Tab; label: string }[] = [
  { id: 'top', label: 'Most Supported' },
  { id: 'rising', label: 'Rising This Month' },
  { id: 'decided', label: 'Decided' },
];
const INITIAL = 5;

export default function VoiceHub() {
  const { t, ideas, testPanelJoined, joinTestPanel, supportCount, isSpotlight } = useDemo();
  const nav = useNavigate();
  const [sheet, setSheet] = useState(false);
  const [tab, setTab] = useState<Tab>('top');
  const [all, setAll] = useState(false);

  const mine = ideas.filter((i) => i.mine).sort((a, b) => (a.id < b.id ? 1 : -1));
  const open = ideas.filter(isOpen);
  const top = [...open].sort((a, b) => supportCount(b) - supportCount(a));
  const rising = [...open].sort((a, b) => b.supportersLast30 - a.supportersLast30).slice(0, 8);
  const decided = ideas.filter((i) => i.decision);
  const spot = open.filter(isSpotlight).slice(0, 2);
  const real = decided.find((i) => i.decision === 'implemented');
  const list = tab === 'top' ? (all ? top : top.slice(0, INITIAL)) : tab === 'rising' ? rising : decided;

  return (
    <>
      <AppHeader title={t('voice.title')} back="/home" />
      <Screen nav className="px-4 pb-6 pt-4">
        <h1 className="text-[20px] font-semibold leading-tight">We’d love to hear from you.</h1>
        <p className="mt-0.5 text-ink-soft">{t('voice.intro')}</p>

        <div className="mt-4 rounded-2xl bg-gradient-to-br from-[#B3222B] to-[#8F161D] p-4 text-white">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold text-brand-dark"><Lightbulb size={22} /></span>
            <p className="text-[16px] font-semibold">Have an improvement in mind?</p>
          </div>
          <button type="button" onClick={() => nav('/voice/new')} className="mt-3 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-white font-semibold text-brand">
            <Plus size={18} /> {t('voice.suggest')}
          </button>
        </div>

        <div className="mb-1 mt-6 flex items-center justify-between">
          <h2 className="text-[16px] font-semibold">{t('voice.ideas')} ({mine.length})</h2>
          <button type="button" onClick={() => nav('/voice/ideas')} className="inline-flex min-h-[44px] items-center text-[13px] font-semibold text-brand">View all <ChevronRight size={16} /></button>
        </div>
        {mine.slice(0, 2).map((i) => {
          const c = ideaChip(i);
          return (
            <button key={i.id} type="button" onClick={() => nav(`/voice/ideas/${i.id}`)} className="flex min-h-[44px] w-full items-center gap-3 border-b border-gray-100 py-3 text-left last:border-0">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand"><Lightbulb size={19} /></span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold leading-snug">{i.title}</span>
                <span className="block text-xs text-ink-soft">{fmtCount(supportCount(i))} agree{i.decision ? '' : ` · Decision by ${fmtDate(i.decisionBy)}`}</span>
              </span>
              <Chip tone={c.tone} className="shrink-0">{c.label.replace('Decision Published: ', '')}</Chip>
            </button>
          );
        })}

        {real?.decisionNote && (
          <button type="button" onClick={() => nav('/voice/changed')} className="mt-5 block w-full rounded-2xl bg-[#FBF4E6] p-4 text-left active:opacity-90">
            <span className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-brand"><Megaphone size={18} /></span>
              <span className="flex-1 text-[16px] font-semibold">{t('voice.changed')}</span>
              <Chip tone="ok">Implemented</Chip>
            </span>
            <span className="mt-2 block font-semibold leading-snug">{real.title}</span>
            <span className="mt-0.5 block text-sm leading-snug text-ink-soft">{real.decisionNote.changed}</span>
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand">See what changed <ChevronRight size={16} /></span>
          </button>
        )}

        {spot.length > 0 && (
          <section className="mt-6" aria-labelledby="spot">
            <h2 id="spot" className="flex items-center gap-1.5 text-[16px] font-semibold"><Sparkles size={17} className="text-brand" /> Spotlight: picked by our team</h2>
            <p className="mb-2 text-sm text-ink-soft">Great ideas don’t always start popular.</p>
            <div className="grid grid-cols-1 gap-2.5">
              {spot.map((i) => (
                <button key={i.id} type="button" onClick={() => nav(`/voice/ideas/${i.id}`)} className="rounded-2xl border border-brand/30 bg-brand-tint p-3.5 text-left active:opacity-90">
                  <span className="block font-semibold leading-snug">{i.title}</span>
                  <span className="mt-1.5 flex flex-wrap gap-1.5">
                    <Chip tone="brand">Spotlight</Chip>
                    <Chip tone="grey">{i.supporters < 25 ? 'New' : fmtCount(i.supporters)}</Chip>
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="mt-6" aria-labelledby="board">
          <h2 id="board" className="text-[16px] font-semibold">Idea Board</h2>
          <p className="mb-2 text-sm leading-snug text-ink-soft">Support shows us demand. Decisions also weigh safety, rules and cost. Every idea gets an answer.</p>
          <div role="tablist" aria-label="Idea board" className="flex overflow-hidden rounded-xl border border-gray-200">
            {TABS.map((x) => (
              <button key={x.id} type="button" role="tab" aria-selected={tab === x.id} onClick={() => setTab(x.id)} className={`min-h-[44px] flex-1 px-1 text-[12.5px] font-semibold ${tab === x.id ? 'bg-brand text-white' : 'bg-white text-ink-soft'}`}>
                {x.label}
              </button>
            ))}
          </div>
          <div role="tabpanel">
            {list.map((i) =>
              tab === 'decided' ? (
                <button key={i.id} type="button" onClick={() => nav(`/voice/ideas/${i.id}`)} className="flex min-h-[44px] w-full items-center gap-3 border-b border-gray-100 py-3 text-left last:border-0">
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold leading-snug">{i.title}</span>
                    <span className="text-xs text-ink-soft">Decided {i.stageDates.decision} · {fmtCount(i.supporters)} asked</span>
                  </span>
                  <Chip tone={ideaChip(i).tone} className="shrink-0">{ideaChip(i).label.replace('Decision Published: ', '')}</Chip>
                  <ChevronRight size={18} className="shrink-0 text-ink-soft" />
                </button>
              ) : (
                <BoardCard key={i.id} idea={i} rising={tab === 'rising'} />
              ),
            )}
          </div>
          {tab === 'top' && top.length > INITIAL && (
            <Button variant="quiet" full className="mt-2" onClick={() => setAll((v) => !v)}>{all ? 'Show Fewer' : 'Show More Ideas'}</Button>
          )}
        </section>

        <Card className="mt-6 !bg-[#FBF4E6]">
          <p className="flex items-center gap-2 font-semibold text-brand-dark"><FlaskConical size={18} /> Ideas Being Tested Now</p>
          <p className="mt-1.5 leading-relaxed">Help us test: Close your loan from the app. 5 minutes, earn nothing but our thanks.</p>
          <Button variant="outline" className="mt-3" onClick={() => setSheet(true)}>
            {testPanelJoined ? 'You’re On The Test Panel' : 'Take A Look'}
          </Button>
        </Card>
      </Screen>

      <BottomSheet open={sheet} onClose={() => setSheet(false)} title="Join The Test Panel">
        <p className="text-ink-soft">
          {testPanelJoined
            ? 'You are already on the panel. We will message you once, when a test is ready.'
            : 'We will message you only when a test matches. It takes about 5 minutes. You can leave the panel anytime, and we will never use it to sell you anything.'}
        </p>
        <Button full className="mt-4" onClick={() => { joinTestPanel(); setSheet(false); }}>
          {testPanelJoined ? 'Close' : 'Join The Test Panel'}
        </Button>
      </BottomSheet>
    </>
  );
}
