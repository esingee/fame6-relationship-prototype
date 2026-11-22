import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftRight, Bell, CalendarClock, Plus, ChevronRight, CreditCard, Eye, EyeOff, Landmark, Lightbulb, Headset, Megaphone, MoreHorizontal, PiggyBank, ReceiptText, ScanLine, Send, User } from 'lucide-react';
import { Screen, Logo } from '../components/Shell';
import { BottomSheet, Card, useToast } from '../components/ui';
import { useDemo } from '../state/useDemoState';
import type { StringKey } from '../i18n/strings';

const GOLD = [
  { label: 'Add Money', icon: Plus },
  { label: 'Create FD', icon: PiggyBank },
  { label: 'Start SIP', icon: CalendarClock },
];

const TILES: { label: string; bg: string; to?: string; icon?: typeof Send }[] = [
  { label: 'Customer Service', bg: 'bg-[#4E6B4A]', to: '/service', icon: Headset },
  { label: 'My Networth', bg: 'bg-[#23252B]' },
  { label: 'Payments', bg: 'bg-[#C99A1B]' },
  { label: 'Credit Cards', bg: 'bg-[#2F4FB8]' },
  { label: 'Savings', bg: 'bg-[#B5262B]' },
  { label: 'Loans', bg: 'bg-[#2478B5]' },
  { label: 'Deposits', bg: 'bg-[#5B2C8F]' },
  { label: 'Mutual Funds', bg: 'bg-[#3C3F46]' },
];

const QUICK: { key: StringKey; icon: typeof Send }[] = [
  { key: 'qa.pay', icon: Send },
  { key: 'qa.transfer', icon: ArrowLeftRight },
  { key: 'qa.scan', icon: ScanLine },
  { key: 'qa.cards', icon: CreditCard },
  { key: 'qa.loans', icon: Landmark },
  { key: 'qa.fd', icon: PiggyBank },
  { key: 'qa.bills', icon: ReceiptText },
  { key: 'qa.more', icon: MoreHorizontal },
];

export default function Home() {
  const { t, cases, ideas, lang, setLang, resetDemo } = useDemo();
  const nav = useNavigate();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [bell, setBell] = useState(false);
  const notYet = () => toast('Not part of this prototype');
  const notes: { key: string; title: string; text: string; to: string }[] = [];
  cases.forEach((c) => {
    if (c.status !== 'resolved') notes.push({ key: c.id, title: 'Update on your request', text: `${c.title}${c.nextUpdateBy ? `. Next update by ${c.nextUpdateBy}.` : '.'}`, to: `/requests/${c.id}` });
    else if (c.closedOn === '26 Nov') notes.push({ key: c.id, title: 'Your request is resolved', text: `${c.title}. Tap to rate how we did.`, to: `/requests/${c.id}` });
  });
  if (ideas.some((i) => i.id === 'iv-28110')) notes.push({ key: 'idea', title: 'A decision on your idea', text: 'Your idea “Show how many EMIs are left” is now live.', to: '/voice/ideas/iv-28110' });

  return (
    <>
      <header className="flex shrink-0 items-center justify-between bg-white px-4 py-2">
        <Logo />
        <div className="flex items-center">
          <button type="button" aria-label={`Notifications, ${notes.length} new`} onClick={() => setBell(true)} className="relative flex h-11 w-11 items-center justify-center rounded-full text-brand-dark">
            <Bell size={23} />
            {notes.length > 0 && <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">{notes.length}</span>}
          </button>
          <button type="button" aria-label="Profile" onClick={notYet} className="flex h-11 w-11 items-center justify-center rounded-full text-brand-dark">
            <User size={23} />
          </button>
        </div>
      </header>

      <Screen nav className="bg-white pb-5">
        <p className="px-4 pb-3 pt-1 text-[17px] font-semibold text-ink">{t('greeting')}</p>

        <div className="px-4">
          <div className="rounded-2xl bg-gradient-to-br from-[#B3222B] to-[#8F161D] p-4 pb-9 text-white shadow-card">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-[#F6C9CC]">{t('home.savings')} · XXXX 4821</p>
            <p className="mt-3 text-sm text-white/90">Available balance</p>
            <div className="flex items-center gap-1">
              <p className="text-[26px] font-bold tracking-tight">{show ? '₹48,250.00' : '₹ ••••••'}</p>
              <button type="button" aria-label={show ? 'Hide balance' : 'Show balance'} onClick={() => setShow((v) => !v)} className="flex h-11 w-11 items-center justify-center rounded-full text-white/90">
                {show ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="-mt-1 text-xs text-[#F6C9CC]">{t('home.interest')}</p>
          </div>

          <div className="-mt-7 grid grid-cols-3 px-2">
            {GOLD.map(({ label, icon: Icon }) => (
              <button key={label} type="button" onClick={notYet} className="flex min-h-[44px] flex-col items-center gap-1.5 text-xs font-medium text-ink">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-brand-dark shadow-card">
                  <Icon size={22} />
                </span>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-y-4 px-3">
          {QUICK.map(({ key, icon: Icon }) => (
            <button key={key} type="button" onClick={notYet} className="flex min-h-[72px] flex-col items-center gap-1.5 text-[12px] font-medium text-[#5a5a5a]">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1EEEE] text-[#A0522D]">
                <Icon size={22} />
              </span>
              {t(key)}
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-4 bg-app px-4 pb-4 pt-4">
          <div className="grid grid-cols-2 gap-2.5">
            {TILES.map((x) => (
              <button key={x.label} type="button" onClick={x.to ? () => nav(x.to!) : notYet} className={`flex min-h-[64px] items-center rounded-2xl px-4 py-3 text-left text-[14px] font-semibold leading-tight text-white active:opacity-90 ${x.bg}`}>
                {x.icon && <x.icon size={18} className="mr-2 shrink-0" />}
                {x.label}
              </button>
            ))}
          </div>

          <FeatureTile icon={Lightbulb} title={t('home.voice')} text={t('home.voice.sub')} onClick={() => nav('/voice')} />

          <Card onClick={() => nav('/voice/changed')} className="flex items-center gap-3 !bg-[#FBF4E6]">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/30 text-brand-dark">
              <Megaphone size={20} />
            </span>
            <span className="flex-1">
              <span className="block font-semibold">{t('home.changed')}</span>
              <span className="block text-sm text-ink-soft">{t('home.changed.sub')}</span>
            </span>
            <ChevronRight size={20} className="text-ink-soft" />
          </Card>

          <div className="flex items-center justify-between gap-2 border-t border-gray-100 pt-3 text-xs text-ink-soft">
            <span>Demo controls</span>
            <div className="flex items-center gap-2">
              <div className="flex overflow-hidden rounded-full border border-gray-300 font-semibold" role="group" aria-label="Language">
                {(['en', 'hi'] as const).map((l) => (
                  <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)} className={`min-h-[36px] px-3 ${lang === l ? 'bg-brand text-white' : 'bg-white text-ink-soft'}`}>
                    {l === 'en' ? 'English' : 'हिंदी'}
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => { resetDemo(); toast('Demo reset to the starting state'); nav('/signin'); }} className="min-h-[36px] rounded-full border border-gray-300 bg-white px-3 font-semibold text-ink-soft">
                Reset Demo
              </button>
            </div>
          </div>
        </div>
      </Screen>

      <BottomSheet open={bell} onClose={() => setBell(false)} title="Notifications">
        <div className="space-y-3">
          {notes.length === 0 && <p className="py-4 text-center text-ink-soft">You are all caught up.</p>}
          {notes.map((n) => (
            <NoteRow key={n.key} title={n.title} text={n.text} onClick={() => nav(n.to)} />
          ))}
        </div>
      </BottomSheet>
    </>
  );
}

function FeatureTile({ icon: Icon, title, text, onClick }: { icon: typeof Lightbulb; title: string; text: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex min-h-[44px] w-full flex-col rounded-2xl bg-white p-4 text-left shadow-card active:bg-gray-50">
      <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white">
        <Icon size={20} />
      </span>
      <span className="font-semibold leading-tight">{title}</span>
      <span className="mt-1 text-[13px] leading-snug text-ink-soft">{text}</span>
    </button>
  );
}

function NoteRow({ title, text, onClick }: { title: string; text: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex min-h-[44px] w-full items-center gap-3 rounded-xl bg-soft p-3 text-left">
      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand" />
      <span className="flex-1">
        <span className="block font-semibold">{title}</span>
        <span className="block text-sm text-ink-soft">{text}</span>
      </span>
      <ChevronRight size={18} className="text-ink-soft" />
    </button>
  );
}
