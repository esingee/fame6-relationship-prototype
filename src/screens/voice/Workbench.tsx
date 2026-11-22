import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { useDemo } from '../../state/useDemoState';
import { DEMO_TODAY, fmtDate, isOpen } from '../../data/ideas';

const KPIS = [
  ['Acknowledged within 1 day', '97%'],
  ['Decision within 30 days', '82%'],
  ['Contributors taking a second action', '24%'],
];
const LOG = [
  ['19 Oct', 'Developer-mode login: Not proceeding. Reason published; fix shipped.'],
  ['28 Oct', 'Larger text option: Implemented in Profile → Display.'],
  ['2 Nov', 'Stop loan-offer calls: Offer Calls toggle added. 12-month respect window set.'],
];

export default function Workbench() {
  const { ideas, supportCount, isSpotlight, togglePick } = useDemo();
  const top10 = ideas.filter(isOpen).sort((a, b) => supportCount(b) - supportCount(a)).slice(0, 10);
  const days = (iso: string) => Math.round((Date.parse(iso) - Date.parse(DEMO_TODAY)) / 86400000);
  const lowSupport = ideas.filter((i) => isOpen(i) && i.supporters < 60).sort((a, b) => (b.aiScore ?? 0) - (a.aiScore ?? 0));
  return (
    <div className="min-h-full bg-[#EEEBE8] p-4 md:p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="rounded bg-brand-accent px-2 py-0.5 text-xs font-bold text-black">Internal view (demo)</span>
            <h1 className="mt-1 text-2xl font-semibold text-brand-dark">Customer Voice Workbench</h1>
          </div>
          <Link to="/home" className="inline-flex min-h-[44px] items-center text-sm font-semibold text-brand underline">Back to home</Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {KPIS.map(([l, v]) => (
            <div key={l} className="rounded-2xl bg-white p-4 shadow-card">
              <p className="text-3xl font-bold text-brand">{v}</p>
              <p className="text-sm text-ink-soft">{l}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 overflow-x-auto rounded-2xl bg-white shadow-card">
          <h2 className="px-4 pt-4 text-sm font-semibold uppercase tracking-wide text-brand-dark">Top-10 rule</h2>
          <p className="px-4 pb-2 text-sm text-ink-soft">Every top-10 idea needs an owner and a decision date. A red flag means the date has passed; amber means it is due within 3 days.</p>
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-ink-soft">
              <tr>{['Idea', 'Supporters', 'Owner', 'Decision by', 'Flag'].map((h) => <th key={h} className="px-3 py-3 font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {top10.map((i) => {
                const d = days(i.decisionBy);
                return (
                  <tr key={i.id} className="border-t border-gray-100">
                    <td className="px-3 py-3 font-semibold">{i.title}</td>
                    <td className="px-3 py-3">{supportCount(i).toLocaleString('en-IN')}</td>
                    <td className="px-3 py-3">{i.owner}</td>
                    <td className="px-3 py-3">{fmtDate(i.decisionBy)}</td>
                    <td className="px-3 py-3">
                      {d < 0 ? <span className="inline-flex items-center gap-1 font-semibold text-red-700"><AlertTriangle size={14} /> Overdue</span> : d <= 3 ? <span className="inline-flex items-center gap-1 font-semibold text-warn"><AlertTriangle size={14} /> Due in {d} days</span> : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 overflow-x-auto rounded-2xl bg-white shadow-card">
          <h2 className="px-4 pt-4 text-sm font-semibold uppercase tracking-wide text-brand-dark">Spotlight shortlist</h2>
          <p className="px-4 pb-2 text-sm text-ink-soft">AI shortlists, the team decides.</p>
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-ink-soft">
              <tr>{['Idea', 'Supporters', 'AI score', 'Picked'].map((h) => <th key={h} className="px-3 py-3 font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {lowSupport.map((i) => (
                <tr key={i.id} className="border-t border-gray-100">
                  <td className="px-3 py-3 font-semibold">{i.title}</td>
                  <td className="px-3 py-3">{i.supporters}</td>
                  <td className="px-3 py-3">{i.aiScore ?? 50}/100</td>
                  <td className="px-3 py-3">
                    <button type="button" role="switch" aria-checked={isSpotlight(i)} aria-label={`Pick for Spotlight: ${i.title}`} onClick={() => togglePick(i.id)} className={`min-h-[44px] rounded-full border px-4 text-sm font-semibold ${isSpotlight(i) ? 'border-brand bg-brand text-white' : 'border-gray-300 bg-white text-ink-soft'}`}>
                      {isSpotlight(i) ? 'Picked' : 'Pick'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-card">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-dark">Decision Log</h2>
          <ul className="space-y-2">
            {LOG.map(([d, t]) => (
              <li key={t} className="flex gap-3"><span className="w-14 shrink-0 text-sm text-ink-soft">{d}</span><span>{t}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
