import { useNavigate } from 'react-router-dom';
import { FileText, Lightbulb, MapPin, RotateCcw, ArrowRight } from 'lucide-react';
import { Screen } from '../components/Shell';
import { Button, Card, useToast } from '../components/ui';
import { useDemo } from '../state/useDemoState';

export default function Launcher() {
  const nav = useNavigate();
  const toast = useToast();
  const { lang, setLang, resetDemo } = useDemo();
  const go = (next: string) => nav(`/signin?next=${encodeURIComponent(next)}`);

  return (
    <Screen className="px-4 pb-8 pt-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-brand-tint px-3 py-1 text-xs font-semibold text-brand-dark">Demo Launcher</span>
        <div className="flex overflow-hidden rounded-full border border-gray-300 bg-white text-sm font-semibold" role="group" aria-label="Language">
          {(['en', 'hi'] as const).map((l) => (
            <button key={l} type="button" onClick={() => setLang(l)} aria-pressed={lang === l} className={`min-h-[36px] px-3 ${lang === l ? 'bg-brand text-white' : 'text-ink-soft'}`}>
              {l === 'en' ? 'English' : 'हिंदी'}
            </button>
          ))}
        </div>
      </div>

      <h1 className="text-[22px] font-semibold leading-tight text-brand-dark">Prototype: From Resolution to Relationship</h1>
      <p className="mt-1 text-sm text-ink-soft">Three new ideas for how a bank can keep customers informed, heard and helped.</p>

      <Card className="mt-4 border-l-4 border-brand-accent">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Persona</p>
        <p className="mt-1 text-[17px] font-semibold">Priya Sharma, 29, salaried, Mumbai</p>
        <p className="text-sm text-ink-soft">Savings account, credit card, two-wheeler loan.</p>
      </Card>

      <div className="mt-4 space-y-3">
        <Scenario icon={FileText} title="1. Open Case Notes" sub="Track my EMI complaint" onClick={() => go('/home')} />
        <Scenario icon={Lightbulb} title="2. FIRST VOICE" sub="Suggest an improvement" onClick={() => go('/voice')} />
        <Scenario icon={MapPin} title="3. FIRST MOMENTS" sub="I’m moving to a new city" onClick={() => go('/moments')} />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={() => go('/home')}>Go To Home</Button>
        <Button
          variant="ghost"
          onClick={() => {
            resetDemo();
            toast('Demo reset to the starting state');
          }}
        >
          <RotateCcw size={16} /> Reset Demo
        </Button>
      </div>
      <p className="mt-4 text-center text-xs text-ink-soft">Your changes are saved in this browser only. Reset Demo clears them.</p>
    </Screen>
  );
}

function Scenario({ icon: Icon, title, sub, onClick }: { icon: typeof FileText; title: string; sub: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex min-h-[64px] w-full items-center gap-3 rounded-2xl bg-brand p-4 text-left text-white shadow-card active:bg-brand-dark">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15">
        <Icon size={22} />
      </span>
      <span className="flex-1">
        <span className="block text-[16px] font-semibold">{title}</span>
        <span className="block text-sm text-white/85">{sub}</span>
      </span>
      <ArrowRight size={20} />
    </button>
  );
}
