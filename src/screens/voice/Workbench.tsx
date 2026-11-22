import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const KPIS = [
  ['Acknowledged within 1 day', '97%'],
  ['Decision within 30 days', '82%'],
  ['Contributors taking a second action', '24%'],
];
const CLUSTERS = [
  ['Loan progress view', 1240, '68% salaried · 32% self-employed', 'EN 71% · HI 22% · Other 7%', 'Loans Digital', 'Decision Published', 56, false],
  ['Stop loan-offer calls', 2310, '55% salaried · 45% retired / other', 'EN 49% · HI 38% · Other 13%', 'Customer Comms', 'Decision Published', 41, false],
  ['Developer-mode login', 142, '80% salaried · 20% self-employed', 'EN 90% · HI 6% · Other 4%', 'App Security', 'Decision Published', 77, false],
  ['Email OTP when abroad', 389, '72% salaried · 28% NRI-linked', 'EN 93% · HI 3% · Other 4%', 'Digital Identity', 'Under Review', 38, true],
  ['Larger text in app', 521, '46% senior · 54% other', 'EN 52% · HI 31% · Other 17%', 'Accessibility', 'Testing', 19, false],
] as const;
const LOG = [
  ['19 Oct', 'Developer-mode login: Not proceeding. Reason published; fix shipped.'],
  ['28 Oct', 'Loan progress view: Implemented in Loans → Repayment Progress.'],
  ['2 Nov', 'Stop loan-offer calls: Offer Calls toggle added. 12-month respect window set.'],
];

export default function Workbench() {
  return (
    <div className="min-h-full bg-[#EEEBE8] p-4 md:p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="rounded bg-brand-accent px-2 py-0.5 text-xs font-bold text-black">Internal view (demo)</span>
            <h1 className="mt-1 text-2xl font-semibold text-brand-dark">Customer Voice Workbench</h1>
          </div>
          <Link to="/" className="inline-flex min-h-[44px] items-center text-sm font-semibold text-brand underline">Back to launcher</Link>
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
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-ink-soft">
              <tr>{['Theme', 'Count', 'Segment mix', 'Language mix', 'Owner', 'Stage', 'Days open', 'Overdue'].map((h) => <th key={h} className="px-3 py-3 font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {CLUSTERS.map((r) => (
                <tr key={r[0]} className="border-t border-gray-100">
                  <td className="px-3 py-3 font-semibold">{r[0]}</td>
                  <td className="px-3 py-3">{r[1].toLocaleString('en-IN')}</td>
                  <td className="px-3 py-3 text-ink-soft">{r[2]}</td>
                  <td className="px-3 py-3 text-ink-soft">{r[3]}</td>
                  <td className="px-3 py-3">{r[4]}</td>
                  <td className="px-3 py-3">{r[5]}</td>
                  <td className="px-3 py-3">{r[6]}</td>
                  <td className="px-3 py-3">{r[7] ? <span className="inline-flex items-center gap-1 font-semibold text-warn"><AlertTriangle size={14} /> Due 15 Dec</span> : '—'}</td>
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
