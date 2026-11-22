import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftRight, Bell, ChevronRight, CreditCard, Eye, EyeOff, Landmark, Lightbulb, MapPin, Megaphone, MoreHorizontal, PiggyBank, ReceiptText, ScanLine, Send, User } from 'lucide-react';
import { Screen, Logo } from '../components/Shell';
import { BottomSheet, Card, Chip, useToast } from '../components/ui';
import { useDemo } from '../state/useDemoState';
import type { StringKey } from '../i18n/strings';

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
  const { t, openCount } = useDemo();
  const nav = useNavigate();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [bell, setBell] = useState(false);
  const notYet = () => toast('Not part of this prototype');

  return (
    <>
      <header className="flex shrink-0 items-center justify-between bg-white px-4 py-2.5 shadow-sm">
        <Logo />
        <div className="flex items-center">
          <button type="button" aria-label="Notifications, 2 new" onClick={() => setBell(true)} className="relative flex h-11 w-11 items-center justify-center rounded-full text-brand">
            <Bell size={22} />
            <span className="absolute right-2.5 top-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">2</span>
          </button>
          <button type="button" aria-label="Profile" onClick={notYet} className="flex h-11 w-11 items-center justify-center rounded-full text-brand">
            <User size={22} />
          </button>
        </div>
      </header>

      <Screen nav className="pb-5">
        <section className="bg-gradient-to-b from-brand to-brand-dark px-4 pb-14 pt-4 text-white">
          <p className="text-[20px] font-semibold">{t('greeting')}</p>
        </section>

        <div className="-mt-10 space-y-4 px-4">
          <Card className="!p-4">
            <div className="flex items-center justify-between text-sm text-ink-soft">
              <span>{t('home.savings')} · XXXX 4821</span>
              <button type="button" aria-label={show ? 'Hide balance' : 'Show balance'} onClick={() => setShow((v) => !v)} className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-brand">
                {show ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="-mt-1 text-[28px] font-bold tracking-tight">{show ? '₹48,250.00' : '₹ ••••••'}</p>
            <p className="mt-1 text-xs text-ink-soft">{t('home.interest')}</p>
          </Card>

          <div className="grid grid-cols-4 gap-y-4 rounded-2xl bg-white p-3 shadow-card">
            {QUICK.map(({ key, icon: Icon }) => (
              <button key={key} type="button" onClick={() => toast('Not part of this prototype')} className="flex min-h-[64px] flex-col items-center gap-1.5 text-xs font-medium text-ink">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-tint text-brand">
                  <Icon size={21} />
                </span>
                {t(key)}
              </button>
            ))}
          </div>

          <Card onClick={() => nav('/requests')} className="flex items-center gap-3 border-l-4 border-brand">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand">
              <ReceiptText size={20} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold">{t('home.requests')}</span>
              <span className="block text-sm text-ink-soft">{openCount === 1 ? t('home.requests.sub') : `${openCount} open requests · Updated today`}</span>
              <Chip tone="info" className="mt-1.5">{t('home.requests.chip')}</Chip>
            </span>
            <ChevronRight size={20} className="text-ink-soft" />
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <FeatureTile icon={Lightbulb} title={t('home.voice')} text={t('home.voice.sub')} onClick={() => nav('/voice')} />
            <FeatureTile icon={MapPin} title={t('home.moments')} text={t('home.moments.sub')} onClick={() => nav('/moments')} />
          </div>

          <Card onClick={() => nav('/voice/changed')} className="flex items-center gap-3 !bg-[#FBF4E6]">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-accent/25 text-brand-dark">
              <Megaphone size={20} />
            </span>
            <span className="flex-1">
              <span className="block font-semibold">{t('home.changed')}</span>
              <span className="block text-sm text-ink-soft">{t('home.changed.sub')}</span>
            </span>
            <ChevronRight size={20} className="text-ink-soft" />
          </Card>
        </div>
      </Screen>

      <BottomSheet open={bell} onClose={() => setBell(false)} title="Notifications">
        <div className="space-y-3">
          <NoteRow title="Update on your request" text="Your EMI request has a new step. Next update by 26 Nov." onClick={() => nav('/requests/cn-24817')} />
          <NoteRow title="A decision on your idea" text="Your idea “Show how many EMIs are left” is now live." onClick={() => nav('/voice/ideas/iv-28110')} />
        </div>
      </BottomSheet>
    </>
  );
}

function FeatureTile({ icon: Icon, title, text, onClick }: { icon: typeof Lightbulb; title: string; text: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex min-h-[44px] flex-col rounded-2xl bg-white p-4 text-left shadow-card active:bg-gray-50">
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
    <button type="button" onClick={onClick} className="flex min-h-[44px] w-full items-center gap-3 rounded-xl bg-app p-3 text-left">
      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand" />
      <span className="flex-1">
        <span className="block font-semibold">{title}</span>
        <span className="block text-sm text-ink-soft">{text}</span>
      </span>
      <ChevronRight size={18} className="text-ink-soft" />
    </button>
  );
}
