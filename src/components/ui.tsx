import { createContext, useCallback, useContext, useState, type ButtonHTMLAttributes, type MouseEvent as RMouseEvent, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, X } from 'lucide-react';

/* ---------- Toast ---------- */
const ToastCtx = createContext<(msg: string) => void>(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null);
  const show = useCallback((m: string) => {
    setMsg(m);
    window.setTimeout(() => setMsg((cur) => (cur === m ? null : cur)), 2200);
  }, []);
  return (
    <ToastCtx.Provider value={show}>
      {children}
      {msg && (
        <div role="status" className="pointer-events-none absolute inset-x-0 bottom-24 z-[60] flex justify-center px-4">
          <div className="max-w-[340px] rounded-full bg-ink px-4 py-2.5 text-center text-sm font-medium text-white shadow-lg">{msg}</div>
        </div>
      )}
    </ToastCtx.Provider>
  );
}

/* ---------- Button ---------- */
type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'ghost' | 'quiet'; full?: boolean };
export function Button({ variant = 'primary', full, className = '', ...p }: BtnProps) {
  const base = 'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-4 text-[14px] font-semibold transition active:scale-[0.98] disabled:opacity-50';
  const v = {
    primary: 'bg-brand text-white active:bg-brand-dark',
    outline: 'border border-brand bg-white text-brand active:bg-brand-tint',
    ghost: 'bg-brand-tint text-brand-dark active:bg-[#f1d6d8]',
    quiet: 'bg-gray-100 text-ink-soft text-sm min-h-[36px] font-medium',
  }[variant];
  return <button type="button" className={`${base} ${v} ${full ? 'w-full' : ''} ${className}`} {...p} />;
}

/* ---------- Card / Chip ---------- */
export function Card({ children, className = '', onClick, as }: { children: ReactNode; className?: string; onClick?: () => void; as?: 'button' }) {
  const cls = `rounded-2xl bg-white p-4 text-left shadow-card ${className}`;
  if (onClick || as === 'button')
    return (
      <button type="button" onClick={onClick} className={`${cls} block w-full min-h-[44px] active:bg-gray-50`}>
        {children}
      </button>
    );
  return <div className={cls}>{children}</div>;
}

const chipTone = {
  info: 'bg-info-tint text-info',
  ok: 'bg-ok-tint text-ok',
  warn: 'bg-warn-tint text-warn',
  brand: 'bg-brand-tint text-brand-dark',
  grey: 'bg-gray-100 text-ink-soft',
};
export type Tone = keyof typeof chipTone;
export function Chip({ tone = 'grey', children, className = '' }: { tone?: Tone; children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${chipTone[tone]} ${className}`}>{children}</span>;
}

/* ---------- Flat list row (reference style: no box, hairline divider) ---------- */
export function Row({ children, onClick, className = '' }: { children: ReactNode; onClick?: () => void; className?: string }) {
  const cls = `block w-full border-b border-gray-100 py-4 text-left last:border-0 ${className}`;
  return onClick ? (
    <button type="button" onClick={onClick} className={`${cls} min-h-[44px] active:bg-gray-50`}>{children}</button>
  ) : (
    <div className={cls}>{children}</div>
  );
}

/* ---------- BottomSheet (positioned inside the phone frame) ---------- */
export function BottomSheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title?: string; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-40 flex items-end bg-black/45" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()} className="max-h-[85%] w-full overflow-y-auto rounded-t-3xl bg-white p-5 pb-7 shadow-2xl">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold text-brand-dark">{title}</h2>
          <button type="button" aria-label="Close" onClick={onClose} className="-mr-2 -mt-1 flex h-11 w-11 items-center justify-center rounded-full text-ink-soft">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ---------- App header (inner screens) ---------- */
export function AppHeader({ title, back, right }: { title: string; back?: string; right?: ReactNode }) {
  const nav = useNavigate();
  return (
    <header className="flex shrink-0 items-center gap-1 bg-white px-2 py-2 text-ink shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      <button type="button" aria-label="Go back" onClick={() => (back ? nav(back) : nav(-1))} className="flex h-11 w-11 items-center justify-center rounded-full text-ink active:bg-gray-100">
        <ChevronLeft size={24} />
      </button>
      <h1 className="flex-1 truncate text-[15px] font-semibold">{title}</h1>
      {right}
    </header>
  );
}

/* ---------- Progress / Stage / Timeline ---------- */
export function ProgressMeter({ done, total, label }: { done: number; total: number; label: string }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-sm font-semibold">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/30" role="progressbar" aria-valuenow={done} aria-valuemin={0} aria-valuemax={total}>
        <div className="h-full rounded-full bg-brand-accent transition-all duration-700 ease-out" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export const STAGES = ['Heard', 'Under Review', 'Testing With Customers', 'Decision Published'] as const;
const STAGE_KEYS = ['heard', 'under_review', 'testing', 'decision'] as const;
export function StageTracker({ stage, dates }: { stage: (typeof STAGE_KEYS)[number]; dates?: Partial<Record<(typeof STAGE_KEYS)[number], string>> }) {
  const idx = STAGE_KEYS.indexOf(stage);
  return (
    <ol className="flex items-start" aria-label="Idea progress">
      {STAGES.map((label, i) => {
        const lit = i <= idx;
        return (
          <li key={label} className="relative flex flex-1 flex-col items-center text-center">
            {i > 0 && <span className={`absolute right-1/2 top-3 h-0.5 w-full ${i <= idx ? 'bg-ok' : 'bg-gray-200'}`} />}
            <span className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${lit ? 'bg-ok text-white' : 'bg-gray-200 text-ink-soft'}`}>{lit ? '✓' : i + 1}</span>
            <span className={`mt-1.5 px-0.5 text-[11px] leading-tight ${lit ? 'font-semibold text-ink' : 'text-ink-soft'}`}>{label}</span>
            {dates?.[STAGE_KEYS[i]] && <span className="mt-0.5 text-[11px] text-ink-soft">{dates[STAGE_KEYS[i]]}</span>}
          </li>
        );
      })}
    </ol>
  );
}

export function Timeline({ items }: { items: { at: string; label: string; by: 'customer' | 'bank'; channel?: string }[] }) {
  return (
    <ol className="relative ml-2 border-l-2 border-gray-200">
      {items.map((it, i) => (
        <li key={i} className="relative pb-4 pl-5 last:pb-0">
          <span className={`absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-white ${it.by === 'customer' ? 'bg-brand-accent' : 'bg-brand'}`} />
          <p className="text-[14px] font-medium leading-snug">
            {it.label}
            {it.channel && <span className="font-normal text-ink-soft"> ({cap(it.channel)})</span>}
          </p>
          <p className="text-xs text-ink-soft">{it.at}</p>
        </li>
      ))}
    </ol>
  );
}
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)} className={`relative h-7 w-12 shrink-0 rounded-full transition ${on ? 'bg-ok' : 'bg-gray-300'}`}>
      <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${on ? 'left-[22px]' : 'left-0.5'}`} />
    </button>
  );
}

/* ---------- StarRating: 0.5 to 5 in steps of 0.5 ---------- */
export function StarRating({ value, onChange, size = 36 }: { value: number; onChange?: (v: number) => void; size?: number }) {
  const readOnly = !onChange;
  const pick = (i: number, e: RMouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    onChange?.(e.clientX - r.left < r.width / 2 ? i + 0.5 : i + 1);
  };
  const star = (fill: number) => (
    <span className="relative inline-block" style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} className="absolute inset-0 text-gray-300" fill="currentColor"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" /></svg>
      <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
        <svg viewBox="0 0 24 24" width={size} height={size} className="text-gold" fill="currentColor"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" /></svg>
      </span>
    </span>
  );
  return (
    <div
      role={readOnly ? 'img' : 'slider'}
      aria-label={readOnly ? `Rated ${value} out of 5` : 'Rating'}
      aria-valuemin={readOnly ? undefined : 0.5}
      aria-valuemax={readOnly ? undefined : 5}
      aria-valuenow={readOnly ? undefined : value || undefined}
      aria-valuetext={value ? `${value} out of 5 stars` : 'No rating yet'}
      tabIndex={readOnly ? undefined : 0}
      onKeyDown={(e) => {
        if (readOnly) return;
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); onChange!(Math.min(5, (value || 0) + 0.5)); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); onChange!(Math.max(0.5, (value || 1) - 0.5)); }
      }}
      className="inline-flex gap-1 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return readOnly ? (
          <span key={i}>{star(fill)}</span>
        ) : (
          <button key={i} type="button" tabIndex={-1} aria-hidden onClick={(e) => pick(i, e)} className="min-h-[44px] min-w-[40px] p-0 flex items-center justify-center">
            {star(fill)}
          </button>
        );
      })}
    </div>
  );
}
