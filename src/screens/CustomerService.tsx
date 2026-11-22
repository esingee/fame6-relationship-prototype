import { useNavigate } from 'react-router-dom';
import { Banknote, ChevronRight, CreditCard, KeyRound, Landmark, MapPin, MoreHorizontal, ShieldAlert, TrendingUp, User, UserCheck, Wallet } from 'lucide-react';
import { AppHeader, Row, useToast } from '../components/ui';
import { Screen } from '../components/Shell';
import { useDemo } from '../state/useDemoState';

const SHORTCUTS = [
  { label: 'Change MPIN', icon: KeyRound },
  { label: 'Re-KYC', icon: UserCheck },
  { label: 'Dispute / Fraud', icon: ShieldAlert },
  { label: 'View More', icon: MoreHorizontal },
];

const CATEGORIES = [
  { label: 'Profile', icon: User, bg: 'bg-[#F8E1E3]', fg: 'text-brand' },
  { label: 'Accounts', icon: Landmark, bg: 'bg-[#E1F0E4]', fg: 'text-[#2E7D32]' },
  { label: 'Debit Cards', icon: CreditCard, bg: 'bg-[#E3E8F7]', fg: 'text-[#3556B5]' },
  { label: 'Deposits', icon: Banknote, bg: 'bg-[#F6E0EE]', fg: 'text-[#A22B7B]' },
  { label: 'Credit Cards', icon: Wallet, bg: 'bg-[#FAF0D8]', fg: 'text-[#B8860B]' },
  { label: 'Investments', icon: TrendingUp, bg: 'bg-[#E1F0E4]', fg: 'text-[#2E7D32]' },
];

export default function CustomerService() {
  const { t, cases } = useDemo();
  const nav = useNavigate();
  const toast = useToast();
  const notYet = () => toast('Not part of this prototype');
  const recent = cases.slice(0, 3);

  return (
    <>
      <AppHeader title={t('service.title')} back="/home" />
      <Screen nav className="px-4 pb-6 pt-3">
        <div className="grid grid-cols-4 gap-1">
          {SHORTCUTS.map(({ label, icon: Icon }) => (
            <button key={label} type="button" onClick={notYet} className="flex min-h-[72px] flex-col items-center gap-1.5 text-center text-[12px] font-medium leading-tight text-[#5a5a5a]">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F1EEEE] text-[#A0522D]"><Icon size={20} /></span>
              {label}
            </button>
          ))}
        </div>

        <button type="button" onClick={() => nav('/moments')} className="mt-4 flex min-h-[56px] w-full items-center gap-3 rounded-2xl bg-brand-tint p-3.5 text-left active:bg-[#f1d6d8]">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white"><MapPin size={20} /></span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold text-brand-dark">Something changed?</span>
            <span className="block text-[13px] text-ink-soft">See the banking tasks that may matter for what is changing in your life.</span>
          </span>
          <ChevronRight size={20} className="shrink-0 text-ink-soft" />
        </button>

        <h2 className="mb-2 mt-6 text-[17px] font-semibold">Your service categories</h2>
        <div className="grid grid-cols-4 gap-y-3">
          {CATEGORIES.map(({ label, icon: Icon, bg, fg }) => (
            <button key={label} type="button" onClick={notYet} className="flex min-h-[84px] flex-col items-center gap-1.5 text-center text-[12px] leading-tight text-[#5a5a5a]">
              <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${bg} ${fg}`}><Icon size={24} /></span>
              {label}
            </button>
          ))}
        </div>

        <div className="mb-1 mt-6 flex items-center justify-between">
          <h2 className="text-[17px] font-semibold">Your recent requests</h2>
          <button type="button" onClick={() => nav('/requests')} className="inline-flex min-h-[44px] items-center text-[13px] font-semibold text-brand">
            View all <ChevronRight size={16} />
          </button>
        </div>
        {recent.map((c) => (
          <Row key={c.id} onClick={() => nav(`/requests/${c.id}`)}>
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-ink-soft">ID: {c.caseNo}</p>
                <p className="mt-0.5 font-semibold leading-snug">{c.title}</p>
                <p className="mt-1 text-xs text-ink-soft">Raised on {c.raisedOn} 2026</p>
                {c.status !== 'resolved' && c.nextUpdateBy && <p className="mt-1 text-xs font-medium text-brand-dark">Next update by {c.nextUpdateBy}</p>}
              </div>
              <span className={`shrink-0 rounded-md border px-2 py-1 text-xs font-medium ${c.status === 'resolved' ? 'border-indigo-300 bg-indigo-50 text-indigo-800' : c.status === 'waiting' ? 'border-warn/50 bg-warn-tint text-warn' : 'border-info/40 bg-info-tint text-info'}`}>{c.statusLabel}</span>
            </div>
          </Row>
        ))}
      </Screen>
    </>
  );
}
