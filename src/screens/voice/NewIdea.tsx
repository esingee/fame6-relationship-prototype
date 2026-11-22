import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Check, Mic, Square } from 'lucide-react';
import { AppHeader, Button, Card } from '../../components/ui';
import { findSimilar } from '../../lib/similarity';
import { fmtCount } from '../../components/IdeaCard';
import type { Idea } from '../../data/types';
import { Screen } from '../../components/Shell';
import { useDemo } from '../../state/useDemoState';
import { useToast } from '../../components/ui';

const CATS = ['App', 'Loans', 'Cards', 'Payments', 'Accounts', 'Calls & Messages', 'Accessibility', 'Other'];
const LANGS = ['English', 'हिंदी', 'தமிழ்', 'मराठी'];

export default function NewIdea() {
  const nav = useNavigate();
  const toast = useToast();
  const [params] = useSearchParams();
  const { addIdea, ideas, supportIdea, supportCount } = useDemo();
  const initial = params.get('category');
  const [cat, setCat] = useState(CATS.includes(initial ?? '') ? (initial as string) : 'App');
  const [text, setText] = useState('');
  const [recording, setRecording] = useState(false);
  const [voice, setVoice] = useState(false);
  const [lang, setLang] = useState('English');
  const [invite, setInvite] = useState(true);
  const timer = useRef<number>();
  const [matches, setMatches] = useState<{ idea: Idea; score: number }[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);
  // Debounced (~300 ms) similar-idea check once at least 3 words are typed.
  useEffect(() => {
    const h = window.setTimeout(() => setMatches(findSimilar(text, ideas)), 300);
    return () => window.clearTimeout(h);
  }, [text, ideas]);
  const shown = matches.filter((m) => !dismissed.includes(m.idea.id));
  const addSupport = (id: string) => {
    supportIdea(id);
    nav(`/voice/receipt/${id}?joined=1`, { replace: true });
  };
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const record = () => {
    if (recording) {
      window.clearTimeout(timer.current);
      setRecording(false);
      setVoice(true);
      return;
    }
    setVoice(false);
    setRecording(true);
    timer.current = window.setTimeout(() => {
      setRecording(false);
      setVoice(true);
    }, 2200);
  };

  const submit = () => {
    if (!text.trim() && !voice) {
      toast('Add a few words or a voice note first');
      return;
    }
    const title = text.trim() || 'Voice note (0:14)';
    const id = addIdea({ title, category: cat, language: lang, voiceNote: voice });
    nav(`/voice/receipt/${id}`, { replace: true });
  };

  return (
    <>
      <AppHeader title="Suggest An Improvement" back="/voice" />
      <Screen className="space-y-4 px-4 py-4">
        <section>
          <h2 className="mb-2 text-sm font-semibold text-ink-soft">Category</h2>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Category">
            {CATS.map((c) => (
              <button key={c} type="button" role="radio" aria-checked={cat === c} onClick={() => setCat(c)} className={`min-h-[44px] rounded-full border px-4 text-sm font-medium ${cat === c ? 'border-brand bg-brand text-white' : 'border-gray-300 bg-white'}`}>
                {c}
              </button>
            ))}
          </div>
        </section>

        <section>
          <label htmlFor="idea" className="mb-2 block text-sm font-semibold text-ink-soft">Your idea</label>
          <textarea id="idea" value={text} onChange={(e) => setText(e.target.value)} rows={4} placeholder="What should we change, and why?" className="w-full rounded-xl border border-gray-300 bg-white p-3 text-[16px] outline-none focus:border-brand" />
        </section>

        {shown.map((m) => (
          <Card key={m.idea.id} className="!bg-[#FBF4E6]" aria-live="polite">
            <p className="text-sm text-ink-soft">Looks similar to</p>
            <p className="font-semibold leading-snug">“{m.idea.title}” <span className="font-normal text-ink-soft">({fmtCount(supportCount(m.idea))})</span></p>
            <div className="mt-3 flex flex-col gap-2">
              <Button full onClick={() => addSupport(m.idea.id)}>That’s my idea, add my support</Button>
              <Button full variant="outline" onClick={() => setDismissed((d) => [...d, ...shown.map((x) => x.idea.id)])}>Mine is different, post it</Button>
            </div>
          </Card>
        ))}

        <section className="rounded-2xl bg-white p-4 shadow-card">
          <div className="flex items-center gap-3">
            <button type="button" onClick={record} aria-label={recording ? 'Stop recording' : 'Record a voice note'} className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white ${recording ? 'rec-dot bg-red-600' : 'bg-brand'}`}>
              {recording ? <Square size={18} /> : <Mic size={22} />}
            </button>
            <div className="text-sm">
              {recording ? (
                <p className="font-semibold text-red-700">Recording… tap to stop</p>
              ) : voice ? (
                <p className="flex items-center gap-1.5 font-semibold text-ok"><Check size={16} /> Voice note (0:14)</p>
              ) : (
                <p className="font-semibold">Or say it out loud</p>
              )}
              <p className="text-ink-soft">Voice notes in local languages are accepted.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-sm font-semibold text-ink-soft">Preferred language for updates</h2>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Language for updates">
            {LANGS.map((l) => (
              <button key={l} type="button" role="radio" aria-checked={lang === l} onClick={() => setLang(l)} className={`min-h-[44px] rounded-full border px-4 text-sm font-medium ${lang === l ? 'border-brand bg-brand-tint text-brand-dark' : 'border-gray-300 bg-white'}`}>
                {l}
              </button>
            ))}
          </div>
        </section>

        <label className="flex min-h-[44px] items-center gap-3">
          <input type="checkbox" checked={invite} onChange={(e) => setInvite(e.target.checked)} className="h-5 w-5 accent-[#9C1D27]" />
          <span>Invite me to test ideas like this</span>
        </label>

        <p className="rounded-xl bg-info-tint p-3 text-sm leading-relaxed text-info">This is for ideas. For a problem with your account, raise a request. It keeps your full complaint rights.</p>

        <Button full className="!min-h-[52px]" onClick={submit}>Submit My Idea</Button>
      </Screen>
    </>
  );
}
