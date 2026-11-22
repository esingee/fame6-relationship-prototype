import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Case, Idea, Moment, TaskStatus } from '../data/types';
import { seedCases } from '../data/cases';
import { seedIdeas } from '../data/ideas';
import { seedMoments } from '../data/moments';
import { tr, type Lang, type StringKey } from '../i18n/strings';

const KEY = 'fr2r-demo-state';

interface Persisted {
  lang: Lang;
  cases: Case[];
  ideas: Idea[];
  moments: Moment[];
  agentPublished: Record<string, boolean>;
  feedback: Record<string, 'up' | 'down'>;
  testPanelJoined: boolean;
  ratings: Record<string, { stars: number; review: string }>;
  votes: Record<string, boolean>;
}

const seed = (): Persisted => ({
  lang: 'en',
  cases: structuredClone(seedCases),
  ideas: structuredClone(seedIdeas),
  moments: structuredClone(seedMoments),
  agentPublished: {},
  feedback: {},
  testPanelJoined: false,
  ratings: {},
  votes: {},
});

const load = (): Persisted => {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...seed(), ...JSON.parse(raw) };
  } catch {
    /* storage unavailable: fall back to seed */
  }
  return seed();
};

export interface NewIdeaInput {
  title: string;
  category: string;
  language: string;
  voiceNote: boolean;
}

interface Ctx extends Persisted {
  t: (key: StringKey) => string;
  setLang: (l: Lang) => void;
  resetDemo: () => void;
  addTimeline: (caseId: string, label: string, channel?: Case['timeline'][number]['channel'], by?: 'customer' | 'bank') => void;
  simulateResolve: (caseId: string) => void;
  reopenCase: (caseId: string) => void;
  publishAgentNote: (caseId: string, text: string) => void;
  addIdea: (input: NewIdeaInput) => string;
  joinTestPanel: () => void;
  setTaskStatus: (momentId: string, taskId: string, status: TaskStatus, helpRequest?: string) => void;
  setReminder: (momentId: string, on: boolean) => void;
  resetMoment: (momentId: string) => void;
  setFeedback: (momentId: string, v: 'up' | 'down') => void;
  rateCase: (caseId: string, stars: number, review: string) => void;
  toggleVote: (id: string) => void;
  openCount: number;
}

const DemoCtx = createContext<Ctx | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [s, setS] = useState<Persisted>(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
    } catch {
      /* ignore */
    }
  }, [s]);

  const patchCase = useCallback((id: string, fn: (c: Case) => Case) => {
    setS((p) => ({ ...p, cases: p.cases.map((c) => (c.id === id ? fn(c) : c)) }));
  }, []);

  const value = useMemo<Ctx>(() => {
    const addTimeline: Ctx['addTimeline'] = (id, label, channel, by = 'customer') =>
      patchCase(id, (c) => ({ ...c, timeline: [...c.timeline, { at: '22 Nov, ' + nowTime(), label, channel, by }] }));

    return {
      ...s,
      t: (key) => tr(s.lang, key),
      openCount: s.cases.filter((c) => c.status !== 'resolved').length,
      setLang: (lang) => setS((p) => ({ ...p, lang })),
      resetDemo: () => {
        try {
          localStorage.removeItem(KEY);
        } catch {
          /* ignore */
        }
        setS(seed());
      },
      addTimeline,
      simulateResolve: (id) =>
        patchCase(id, (c) => ({
          ...c,
          status: 'resolved',
          statusLabel: 'Resolved',
          nextUpdateBy: undefined,
          closedOn: '26 Nov',
          timeline: [
            ...c.timeline,
            { at: '26 Nov, 09:15', label: c.id === 'cn-24817' ? 'Payment matched and charge reversed. Request resolved' : 'Toll operator confirmed. ₹185 returned. Request resolved', by: 'bank' },
          ],
        })),
      reopenCase: (id) =>
        patchCase(id, (c) => {
          const seedCase = seedCases.find((x) => x.id === id)!;
          return {
            ...c,
            status: seedCase.status,
            statusLabel: seedCase.statusLabel,
            nextUpdateBy: seedCase.nextUpdateBy,
            closedOn: undefined,
            timeline: [...c.timeline, { at: '26 Nov, ' + nowTime(), label: 'You reopened this request', by: 'customer' }],
          };
        }),
      publishAgentNote: (id, text) => {
        setS((p) => ({ ...p, agentPublished: { ...p.agentPublished, [id]: true } }));
        patchCase(id, (c) => ({
          ...c,
          customerNoteDraft: text,
          timeline: [...c.timeline, { at: '22 Nov, ' + nowTime(), label: 'We shared an update with you', by: 'bank' }],
        }));
      },
      addIdea: (input) => {
        const n = 30412 + s.ideas.filter((i) => i.id >= 'iv-30412').length;
        const idea: Idea = {
          id: `iv-${n}`,
          code: `IV-${n}`,
          title: input.title,
          category: input.category,
          stage: 'heard',
          stageDates: { heard: '22 Nov' },
          mine: true,
          language: input.language,
          voiceNote: input.voiceNote,
        };
        setS((p) => ({ ...p, ideas: [...p.ideas, idea] }));
        return idea.id;
      },
      joinTestPanel: () => setS((p) => ({ ...p, testPanelJoined: true })),
      setTaskStatus: (mid, tid, status, helpRequest) =>
        setS((p) => ({
          ...p,
          moments: p.moments.map((m) =>
            m.id !== mid
              ? m
              : { ...m, tasks: m.tasks.map((k) => (k.id === tid ? { ...k, status, helpRequest: status === 'need_help' ? helpRequest : undefined } : k)) },
          ),
        })),
      setReminder: (mid, on) => setS((p) => ({ ...p, moments: p.moments.map((m) => (m.id === mid ? { ...m, reminder: on } : m)) })),
      resetMoment: (mid) =>
        setS((p) => ({
          ...p,
          moments: p.moments.map((m) => (m.id === mid ? structuredClone(seedMoments.find((x) => x.id === mid)!) : m)),
          feedback: Object.fromEntries(Object.entries(p.feedback).filter(([k]) => k !== mid)),
        })),
      rateCase: (id, stars, review) =>
        setS((p) => ({ ...p, ratings: { ...p.ratings, [id]: { stars, review: review.trim() } } })),
      toggleVote: (id) => setS((p) => ({ ...p, votes: { ...p.votes, [id]: !p.votes[id] } })),
      setFeedback: (mid, v) => setS((p) => ({ ...p, feedback: { ...p.feedback, [mid]: v } })),
    };
  }, [s, patchCase]);

  return <DemoCtx.Provider value={value}>{children}</DemoCtx.Provider>;
}

export function useDemo(): Ctx {
  const c = useContext(DemoCtx);
  if (!c) throw new Error('useDemo must be used inside DemoProvider');
  return c;
}

function nowTime() {
  return '18:30';
}
