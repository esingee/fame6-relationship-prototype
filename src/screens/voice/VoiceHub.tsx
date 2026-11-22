import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronUp, FlaskConical, Lightbulb, ListChecks, Megaphone } from 'lucide-react';
import { AppHeader, BottomSheet, Button, Card, Row } from '../../components/ui';
import { Screen } from '../../components/Shell';
import { useDemo } from '../../state/useDemoState';

const TOP_ASKS = [
  { id: 'ta-1', title: 'Show my full loan statement in one tap', category: 'Loans' },
  { id: 'ta-2', title: 'Let me pause or change an EMI date from the app', category: 'Loans' },
  { id: 'ta-3', title: 'Get login OTP by email when I am abroad', category: 'App' },
  { id: 'ta-4', title: 'Track a debit card replacement step by step', category: 'Cards' },
  { id: 'ta-5', title: 'Tell me the reason when a UPI payment fails', category: 'Payments' },
  { id: 'ta-6', title: 'Download tax-ready interest certificates anytime', category: 'Savings' },
  { id: 'ta-7', title: 'Add a joint-account view for family expenses', category: 'Accounts' },
  { id: 'ta-8', title: 'Reach a human from any screen without long menus', category: 'Customer Service' },
  { id: 'ta-9', title: 'Set a monthly spending limit with alerts', category: 'Cards' },
  { id: 'ta-10', title: 'Keep a simple Hindi and English toggle on every screen', category: 'App' },
];

export default function VoiceHub() {
  const { t, ideas, testPanelJoined, joinTestPanel, votes, toggleVote } = useDemo();
  const nav = useNavigate();
  const [sheet, setSheet] = useState(false);
  const mine = ideas.filter((i) => i.mine).length;

  return (
    <>
      <AppHeader title={t('voice.title')} back="/home" />
      <Screen nav className="space-y-1 px-4 py-4">
        <p className="text-[15px] leading-snug text-ink">{t('voice.intro')}</p>

        <Button full className="!min-h-[52px] justify-start" onClick={() => nav('/voice/new')}>
          <Lightbulb size={20} /> {t('voice.suggest')}
        </Button>
        <NavRow icon={ListChecks} label={`${t('voice.ideas')} (${mine})`} onClick={() => nav('/voice/ideas')} />
        <NavRow icon={Megaphone} label={t('voice.changed')} onClick={() => nav('/voice/changed')} />

        <section className="pt-5" aria-labelledby="top-asks">
          <h2 id="top-asks" className="text-[16px] font-semibold">Most Requested Changes</h2>
          <p className="mb-1 text-sm text-ink-soft">Upvote the changes you would like to see. We look at these first.</p>
          {TOP_ASKS.map((a) => (
            <div key={a.id} className="flex items-center gap-3 border-b border-gray-100 py-3 last:border-0">
              <div className="min-w-0 flex-1">
                <p className="font-medium leading-snug">{a.title}</p>
                <p className="mt-0.5 text-xs text-ink-soft">{a.category}</p>
              </div>
              <button type="button" aria-pressed={!!votes[a.id]} aria-label={`${votes[a.id] ? 'Remove upvote from' : 'Upvote'}: ${a.title}`} onClick={() => toggleVote(a.id)} className={`flex min-h-[44px] shrink-0 items-center gap-1 rounded-full border px-3 text-[13px] font-semibold ${votes[a.id] ? 'border-brand bg-brand text-white' : 'border-gray-300 bg-white text-ink-soft'}`}>
                <ChevronUp size={16} /> {votes[a.id] ? 'Upvoted' : 'Upvote'}
              </button>
            </div>
          ))}
        </section>

        <Card className="mt-4 !bg-[#FBF4E6]">
          <p className="flex items-center gap-2 font-semibold text-brand-dark">
            <FlaskConical size={18} /> Ideas Being Tested Now
          </p>
          <p className="mt-1.5 leading-relaxed">Help us test: Close your loan from the app. 5 minutes, earn nothing but our thanks.</p>
          <Button variant="outline" className="mt-3" onClick={() => setSheet(true)}>
            {testPanelJoined ? 'You’re On The Test Panel' : 'Take A Look'}
          </Button>
        </Card>
      </Screen>

      <BottomSheet open={sheet} onClose={() => setSheet(false)} title="Join The Test Panel">
        <p className="text-ink-soft">
          {testPanelJoined
            ? 'You are already on the panel. We will message you once, when a test is ready.'
            : 'We will message you only when a test matches. It takes about 5 minutes. You can leave the panel anytime, and we will never use it to sell you anything.'}
        </p>
        <Button
          full
          className="mt-4"
          onClick={() => {
            joinTestPanel();
            setSheet(false);
          }}
        >
          {testPanelJoined ? 'Close' : 'Join The Test Panel'}
        </Button>
      </BottomSheet>
    </>
  );
}

function NavRow({ icon: Icon, label, onClick }: { icon: typeof Lightbulb; label: string; onClick: () => void }) {
  return (
    <Row onClick={onClick} className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-tint text-brand">
        <Icon size={20} />
      </span>
      <span className="flex-1 font-semibold">{label}</span>
      <ChevronRight size={20} className="text-ink-soft" />
    </Row>
  );
}
