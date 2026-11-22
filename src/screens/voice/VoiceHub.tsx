import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, FlaskConical, Lightbulb, ListChecks, Megaphone } from 'lucide-react';
import { AppHeader, BottomSheet, Button, Card } from '../../components/ui';
import { Screen } from '../../components/Shell';
import { useDemo } from '../../state/useDemoState';

export default function VoiceHub() {
  const { t, ideas, testPanelJoined, joinTestPanel } = useDemo();
  const nav = useNavigate();
  const [sheet, setSheet] = useState(false);
  const mine = ideas.filter((i) => i.mine).length;

  return (
    <>
      <AppHeader title={t('voice.title')} back="/home" />
      <Screen nav className="space-y-3 px-4 py-4">
        <p className="text-[17px] leading-snug text-ink">{t('voice.intro')}</p>

        <Button full className="!min-h-[52px] justify-start" onClick={() => nav('/voice/new')}>
          <Lightbulb size={20} /> {t('voice.suggest')}
        </Button>
        <Row icon={ListChecks} label={`${t('voice.ideas')} (${mine})`} onClick={() => nav('/voice/ideas')} />
        <Row icon={Megaphone} label={t('voice.changed')} onClick={() => nav('/voice/changed')} />

        <Card className="!bg-[#FBF4E6]">
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

function Row({ icon: Icon, label, onClick }: { icon: typeof Lightbulb; label: string; onClick: () => void }) {
  return (
    <Card onClick={onClick} className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-tint text-brand">
        <Icon size={20} />
      </span>
      <span className="flex-1 font-semibold">{label}</span>
      <ChevronRight size={20} className="text-ink-soft" />
    </Card>
  );
}
