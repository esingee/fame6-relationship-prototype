import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Smartphone } from 'lucide-react';
import { Screen, Logo } from '../components/Shell';
import { Button } from '../components/ui';
import { useDemo } from '../state/useDemoState';

export default function SignIn() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const { t } = useDemo();
  // Typed value lives only in this component and is discarded on sign-in. Never stored, logged or sent.
  const [mobile, setMobile] = useState('98XXX XX210');

  const signIn = () => {
    setMobile('');
    const next = params.get('next');
    nav(next && next.startsWith('/') ? next : '/home', { replace: true });
  };

  return (
    <Screen className="bg-white">
      <div className="bg-gradient-to-b from-brand to-brand-dark px-6 pb-14 pt-10 text-white">
        <div className="inline-block rounded-xl bg-white px-4 py-2.5">
          <Logo />
        </div>
        <h1 className="mt-8 text-[26px] font-semibold leading-tight">{t('signin.welcome')}</h1>
        <p className="mt-1 text-sm text-white/80">Sign in to see your accounts and requests.</p>
      </div>

      <form
        className="-mt-8 px-5"
        onSubmit={(e) => {
          e.preventDefault();
          signIn();
        }}
      >
        <div className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-black/5">
          <label htmlFor="mobile" className="text-sm font-medium text-ink-soft">
            Mobile Number
          </label>
          <div className="mt-1.5 flex min-h-[52px] items-center gap-2 rounded-xl border border-gray-300 px-3 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
            <Smartphone size={18} className="text-ink-soft" aria-hidden />
            <span className="text-[16px] text-ink-soft">+91</span>
            <input id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} inputMode="tel" autoComplete="off" className="min-w-0 flex-1 bg-transparent py-3 text-[16px] font-medium outline-none" />
          </div>
          <Button full className="mt-4 !min-h-[50px]" onClick={signIn}>
            Sign In
          </Button>
          <p className="mt-3 text-center text-xs text-ink-soft">Demo sign-in. Any number works. No OTP or PIN is used.</p>
        </div>
      </form>
    </Screen>
  );
}
