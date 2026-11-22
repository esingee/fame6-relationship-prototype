import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Eye, Lock, Sparkles } from 'lucide-react';
import { Button, Timeline, useToast } from '../../components/ui';
import { useDemo } from '../../state/useDemoState';

export default function AgentView() {
  const { id } = useParams();
  const toast = useToast();
  const { cases, agentPublished, publishAgentNote } = useDemo();
  const c = cases.find((x) => x.id === id);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(c?.customerNoteDraft ?? '');
  if (!c) return <p className="p-6">Case not found.</p>;
  const published = !!agentPublished[c.id];

  return (
    <div className="min-h-full bg-[#EEEBE8]">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#2f2f2f] px-5 py-3 text-white">
        <p className="font-semibold">Agent Console <span className="ml-2 rounded bg-brand-accent px-2 py-0.5 text-xs font-bold text-black">Internal view (demo)</span></p>
        <Link to={`/requests/${c.id}`} className="inline-flex min-h-[44px] items-center text-sm underline">Back to customer’s case page</Link>
      </div>

      <div className="mx-auto max-w-5xl p-4 md:p-6">
        <div className="mb-4 rounded-2xl bg-white p-4 shadow-card">
          <p className="text-sm text-ink-soft">Case <span className="font-mono font-semibold text-ink">{c.caseNo}</span> · Priya Sharma · {c.product}</p>
          <h1 className="text-xl font-semibold text-brand-dark">{c.title}</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr]">
          <section aria-label="Internal notes" className="rounded-2xl border-2 border-dashed border-gray-400 bg-[#E4E2E0] p-4">
            <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-700">
              <Lock size={14} /> Internal only, never shown to customer
            </p>
            <p className="font-mono text-[14px] leading-relaxed text-gray-800">{c.internalNotes}</p>
            <p className="mt-3 font-mono text-xs text-gray-600">Owner: Loans Servicing, L1 · Queue: Payments Mismatch</p>
          </section>

          <div className="hidden w-px bg-gray-400 md:block" aria-hidden />

          <section aria-label="Customer note" className="rounded-2xl bg-white p-4 shadow-card ring-2 ring-ok/40">
            <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ok">
              <Eye size={14} /> Customer sees
            </p>
            <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-info-tint px-2.5 py-1 text-xs font-semibold text-info">
              <Sparkles size={13} /> AI draft, needs your approval
            </p>
            {editing ? (
              <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={7} className="w-full rounded-xl border border-gray-300 p-3 text-[15px]" aria-label="Edit customer note" />
            ) : (
              <p className="leading-relaxed">{published ? c.customerNoteDraft : draft}</p>
            )}
            <div className="mt-4 flex flex-wrap gap-2.5">
              <Button
                disabled={published}
                onClick={() => {
                  publishAgentNote(c.id, draft);
                  setEditing(false);
                  toast('Published to customer’s case page');
                }}
              >
                {published ? 'Published ✓' : 'Approve & Publish'}
              </Button>
              {!published && (
                <Button variant="outline" onClick={() => setEditing((e) => !e)}>
                  {editing ? 'Done Editing' : 'Edit'}
                </Button>
              )}
            </div>
          </section>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-card">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-dark">Shared Timeline (same one the customer sees)</h2>
          <Timeline items={c.timeline} />
        </div>
      </div>
    </div>
  );
}
