import { useState, type ReactNode } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Landmark, ReceiptText, User, Wallet } from 'lucide-react';
import { ToastProvider, useToast } from './ui';
import { useDemo } from '../state/useDemoState';
import type { StringKey } from '../i18n/strings';

/** Persistent, non-dismissable concept strip. Rendered once by the shell, so every route has it. */
export function ConceptBanner() {
  return (
    <div role="note" className="shrink-0 bg-[#3a3a3a] px-3 py-1.5 text-center text-[10.5px] leading-snug text-amber-100">
      <strong className="font-bold text-amber-300">Concept prototype</strong> · Not an official IDFC FIRST Bank app · Not made by or affiliated with IDFC FIRST Bank · Dummy data only. Do not enter real details.
    </div>
  );
}

const WIDE_ROUTES = [/^\/agent\//, /^\/workbench/];

export function Shell() {
  const { pathname } = useLocation();
  const wide = WIDE_ROUTES.some((r) => r.test(pathname));

  return wide ? (
    <div className="relative flex min-h-full flex-col bg-app">
      <ToastProvider>
        <ConceptBanner />
        <div className="relative flex-1">
          <Outlet />
        </div>
      </ToastProvider>
    </div>
  ) : (
    <div className="flex min-h-full items-center justify-center md:p-6">
      <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-app md:h-[844px] md:w-[390px] md:rounded-[40px] md:border-[10px] md:border-black md:shadow-2xl">
        <ToastProvider>
          <ConceptBanner />
          <div className="relative flex min-h-0 flex-1 flex-col">
            <Outlet />
          </div>
        </ToastProvider>
      </div>
    </div>
  );
}

/** Scrolling page body + optional bottom nav, used by every phone screen. */
export function Screen({ children, nav, className = '' }: { children: ReactNode; nav?: boolean; className?: string }) {
  return (
    <>
      <main className={`scroll-area min-h-0 flex-1 ${className}`}>{children}</main>
      {nav && <BottomNav />}
    </>
  );
}

const NAV: { key: StringKey; icon: typeof Home; to?: string }[] = [
  { key: 'nav.home', icon: Home, to: '/home' },
  { key: 'nav.accounts', icon: Landmark },
  { key: 'nav.pay', icon: Wallet },
  { key: 'nav.requests', icon: ReceiptText, to: '/requests' },
  { key: 'nav.profile', icon: User },
];

export function BottomNav() {
  const { t } = useDemo();
  const nav = useNavigate();
  const toast = useToast();
  const { pathname } = useLocation();
  return (
    <nav aria-label="Main" className="flex shrink-0 border-t border-gray-200 bg-white pb-1">
      {NAV.map(({ key, icon: Icon, to }) => {
        const active = to ? pathname.startsWith(to) : false;
        return (
          <button key={key} type="button" onClick={() => (to ? nav(to) : toast('Not part of this prototype'))} className={`flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-medium ${active ? 'text-brand' : 'text-ink-soft'}`} aria-current={active ? 'page' : undefined}>
            <Icon size={22} strokeWidth={active ? 2.4 : 1.8} />
            {t(key)}
          </button>
        );
      })}
    </nav>
  );
}

export function Logo({ light = false, size = 'md' }: { light?: boolean; size?: 'md' | 'lg' }) {
  // Uses public/logo.png when present; otherwise falls back to a text wordmark.
  const [failed, setFailed] = useLogoState();
  if (!failed)
    return <img src={`${import.meta.env.BASE_URL}logo.png`} alt="IDFC FIRST Bank" onError={() => setFailed(true)} className={size === 'lg' ? 'h-12' : 'h-8'} />;
  return (
    <span className={`font-bold tracking-tight ${size === 'lg' ? 'text-3xl' : 'text-xl'} ${light ? 'text-white' : 'text-brand'}`}>
      IDFC <span className={light ? 'text-brand-accent' : 'text-brand-dark'}>FIRST</span> Bank
    </span>
  );
}

let logoMissing = false;
function useLogoState() {
  const [failed, set] = useState(logoMissing);
  return [failed, (v: boolean) => { logoMissing = v; set(v); }] as const;
}
