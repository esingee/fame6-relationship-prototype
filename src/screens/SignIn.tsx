import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Screen, Logo } from '../components/Shell';
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
    <Screen>
      <div className="flex min-h-full flex-col bg-gradient-to-b from-[#C9333A] to-[#A51C24] px-6 pb-10 pt-6 text-white">
        <div className="self-start">
          <Logo size="lg" />
        </div>

        <form
          className="mt-14 flex flex-1 flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          <h1 className="text-center text-[24px] font-bold">{t('signin.welcome')}</h1>
          <p className="mt-1 text-center text-sm text-white/90">Let’s get started</p>

          <fieldset className="mt-8 rounded-xl border-2 border-white/90 px-4 pb-2 pt-0 focus-within:border-white">
            <legend className="px-1.5 text-sm font-medium">
              <label htmlFor="mobile">Mobile number</label>
            </legend>
            <div className="flex min-h-[44px] items-center gap-3">
              <span className="font-semibold">+91</span>
              <input id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} inputMode="tel" autoComplete="off" className="min-w-0 flex-1 bg-transparent py-2 text-[17px] font-medium tracking-wide text-white outline-none" />
            </div>
          </fieldset>

          <button type="submit" className="mx-auto mt-8 min-h-[52px] w-3/4 rounded-full bg-white text-[16px] font-semibold text-brand-dark shadow-lg active:scale-[0.98]">
            Sign In
          </button>
          <p className="mt-4 text-center text-sm font-medium text-white/95">Demo sign-in. Any number works. No OTP or PIN is used.</p>
        </form>
      </div>
    </Screen>
  );
}
