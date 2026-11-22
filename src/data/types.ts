export type CaseStatus = 'in_progress' | 'waiting' | 'resolved';
export interface CaseStep {
  at: string;
  label: string;
  channel?: 'app' | 'phone' | 'branch' | 'email' | 'whatsapp';
  by: 'customer' | 'bank';
}
export interface Case {
  id: string;
  caseNo: string;
  title: string;
  product: string;
  raisedVia: string;
  raisedOn: string;
  status: CaseStatus;
  statusLabel: string;
  nextUpdateBy?: string;
  closedOn?: string;
  dateChangedReason?: string;
  toldUs: string;
  checked: string[];
  team: string;
  found?: string;
  nextStep: string;
  creditNote?: string;
  /** Extra ticks shown once the case is resolved. */
  resolvedChecks: string[];
  resolvedNote: string;
  timeline: CaseStep[];
  internalNotes: string; // agent view only
  customerNoteDraft: string; // AI draft shown in agent view
}

export type IdeaStage = 'heard' | 'under_review' | 'testing' | 'decision';
export type Decision = 'implemented' | 'testing_further' | 'not_proceeding';
export interface Idea {
  id: string;
  code: string;
  title: string;
  category: string;
  stage: IdeaStage;
  stageDates: Partial<Record<IdeaStage, string>>;
  decision?: Decision;
  decisionNote?: { changed: string; why: string; notChanged?: string; decidedBy: string };
  note?: string;
  askedBy?: number;
  mine: boolean;
  language?: string;
  voiceNote?: boolean;
}

export type TaskStatus = 'todo' | 'done' | 'need_help' | 'not_relevant';
export interface MomentTask {
  id: string;
  title: string;
  detail: string;
  tip?: string;
  status: TaskStatus;
  helpRequest?: string;
}
export interface Moment {
  id: string;
  title: string;
  blurb: string;
  available: boolean;
  tasks: MomentTask[];
  reminder: boolean;
}
