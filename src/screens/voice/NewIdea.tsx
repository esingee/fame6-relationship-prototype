import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Check, Mic, Square } from 'lucide-react';
import { AppHeader, Button } from '../../components/ui';
import { Screen } from '../../components/Shell';
import { useDemo } from '../../state/useDemoState';
import { useToast } from '../../components/ui';

const CATS = ['App', 'Loans', 'Cards', 'Payments', 'Accounts', 'Calls & Messages', 'Accessibility', 'Other'];
const LANGS = ['English', 'हिंदी', 'தமிழ்', 'मराठी'];

export default function NewIdea() {
  const nav = useNavigate();
  const toast = useToast();
  const [params] = useSearchParams();
  const { addIdea } = useDemo();
  const initial = params.get('category');
  const [cat, setCat] = useState(CATS.includes(initial ?? '') ? (initial as string) : 'App');
  const [text, setText] = useState('');
  const [recording, setRecording] = useState(false);
  const [voice, setVoice] = useState(false);
  const [lang, setLang] = useState('English');
  const [invite, setInvite] = useState(true);
  const timer = useRef<number>();
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
