import type { Idea } from './types';

/** The demo "today", used for overdue flags. */
export const DEMO_TODAY = '2026-11-22';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const fmtDate = (iso: string) => {
  const [, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]}`;
};

const base = { mine: false, supportersLast30: 0, aiScore: undefined } as const;

export const seedIdeas: Idea[] = [
  // ---- Open ideas: the "Most Supported" top 10 ----
  { ...base, id: 'iv-29900', code: 'IV-29900', title: 'Let me close my loan in the app', category: 'Loans', stage: 'testing', stageDates: { heard: '2 Sep', under_review: '15 Sep', testing: '9 Nov' }, supporters: 1240, supportersLast30: 210, owner: 'Loans Digital Product Team', decisionBy: '2026-12-15', note: 'A small group of customers is testing this now. Decision by 15 Dec.' },
  { ...base, id: 'iv-28110', code: 'IV-28110', title: 'Show EMIs left and amount paid', category: 'Loans', stage: 'under_review', stageDates: { heard: '3 Sep', under_review: '10 Sep' }, supporters: 980, supportersLast30: 120, owner: 'Loans Digital Product Team', decisionBy: '2026-12-20' },
  { ...base, id: 'iv-29876', code: 'IV-29876', title: 'Login OTP by email when abroad', category: 'App', stage: 'under_review', stageDates: { heard: '12 Nov', under_review: '14 Nov' }, supporters: 640, supportersLast30: 95, owner: 'Digital Identity Team', decisionBy: '2026-12-15', mine: true, note: 'We’re checking security rules and how many customers travel often. Decision by 15 Dec.' },
  { ...base, id: 'iv-29310', code: 'IV-29310', title: 'Tell me the reason when a UPI payment fails', category: 'Payments', stage: 'under_review', stageDates: { heard: '20 Sep', under_review: '1 Oct' }, supporters: 512, supportersLast30: 64, owner: 'Payments Product Team', decisionBy: '2026-11-24' },
  { ...base, id: 'iv-29205', code: 'IV-29205', title: 'Download tax-ready interest certificates anytime', category: 'Accounts', stage: 'heard', stageDates: { heard: '8 Oct' }, supporters: 455, supportersLast30: 40, owner: 'Accounts Digital Team', decisionBy: '2026-12-28' },
  { ...base, id: 'iv-29144', code: 'IV-29144', title: 'Track my debit card replacement step by step', category: 'Cards', stage: 'heard', stageDates: { heard: '30 Sep' }, supporters: 388, supportersLast30: 52, owner: 'Cards & Payments Team', decisionBy: '2026-12-30' },
  { ...base, id: 'iv-29090', code: 'IV-29090', title: 'Reach a human from any screen without long menus', category: 'Customer Service', stage: 'heard', stageDates: { heard: '14 Oct' }, supporters: 310, supportersLast30: 88, owner: 'Service Design Team', decisionBy: '2027-01-10' },
  { ...base, id: 'iv-29033', code: 'IV-29033', title: 'Joint-account view for family expenses', category: 'Accounts', stage: 'heard', stageDates: { heard: '21 Oct' }, supporters: 240, supportersLast30: 30, owner: 'Accounts Digital Team', decisionBy: '2027-01-12' },
  { ...base, id: 'iv-28990', code: 'IV-28990', title: 'Monthly spending limit with alerts on my card', category: 'Cards', stage: 'heard', stageDates: { heard: '25 Oct' }, supporters: 205, supportersLast30: 41, owner: 'Cards & Payments Team', decisionBy: '2027-01-15' },
  { ...base, id: 'iv-28955', code: 'IV-28955', title: 'Balance widget on my phone home screen', category: 'App', stage: 'heard', stageDates: { heard: '1 Nov' }, supporters: 170, supportersLast30: 25, owner: 'Mobile App Team', decisionBy: '2027-01-18' },
  // ---- Rising, low total support ----
  { ...base, id: 'iv-29700', code: 'IV-29700', title: 'Hindi and Tamil text across the whole app', category: 'Accessibility', stage: 'heard', stageDates: { heard: '17 Oct' }, supporters: 85, supportersLast30: 70, owner: 'Accessibility & Languages Team', decisionBy: '2027-01-20' },
  // ---- Spotlight: picked by the team ----
  { ...base, id: 'iv-29650', code: 'IV-29650', title: 'Let me pick my EMI date after my salary day', category: 'Loans', stage: 'under_review', stageDates: { heard: '28 Oct', under_review: '12 Nov' }, supporters: 41, supportersLast30: 12, owner: 'Loans Digital Product Team', decisionBy: '2027-01-05', spotlight: true, aiScore: 91, spotlightReasons: ['High customer impact', 'Low risk', 'Fewer missed EMIs'] },
  { ...base, id: 'iv-29640', code: 'IV-29640', title: 'Read out case updates on IVR in my language', category: 'Calls & Messages', stage: 'heard', stageDates: { heard: '5 Nov' }, supporters: 18, supportersLast30: 6, owner: 'Customer Care Team', decisionBy: '2027-01-08', spotlight: true, aiScore: 84, spotlightReasons: ['Helps people who cannot read well', 'New idea, not asked before', 'Uses a voice system we already run'] },
  // ---- New, under 25 ----
  { ...base, id: 'iv-29601', code: 'IV-29601', title: 'Dark mode for the app', category: 'App', stage: 'heard', stageDates: { heard: '12 Nov' }, supporters: 14, supportersLast30: 14, owner: 'Mobile App Team', decisionBy: '2027-01-12', aiScore: 62 },
  { ...base, id: 'iv-29602', code: 'IV-29602', title: 'Show branch queue time before I visit', category: 'Customer Service', stage: 'heard', stageDates: { heard: '16 Nov' }, supporters: 9, supportersLast30: 9, owner: 'Branch Experience Team', decisionBy: '2027-01-14', aiScore: 55 },
  // ---- Decided ----
  {
    ...base, id: 'iv-27990', code: 'IV-27990', title: 'Stop daily loan-offer calls', category: 'Calls & Messages', stage: 'decision', stageDates: { heard: '3 Sep', under_review: '10 Sep', testing: '2 Oct', decision: '2 Nov' },
    decision: 'implemented', note: 'Now live in Profile → Communication. 2,310 customers asked for this.', mine: true, supporters: 2310, supportersLast30: 0, owner: 'Customer Communications Team', decisionBy: '2026-11-02',
    decisionNote: {
      changed: 'Profile → Communication now has an Offer Calls switch. When it is Off, we stop loan-offer calls.',
      why: '2,310 customers asked for this. Many said repeated calls made it hard to trust the bank.',
      notChanged: 'We still call about your own account, such as a due payment or a fraud alert. Those are not offers.',
      decidedBy: 'Customer Communications Team',
    },
  },
  {
    ...base, id: 'iv-28050', code: 'IV-28050', title: 'Larger text option in the app', category: 'Accessibility', stage: 'decision', stageDates: { heard: '1 Aug', under_review: '9 Aug', testing: '14 Sep', decision: '28 Oct' },
    decision: 'implemented', note: 'Now live in Profile → Display. 521 customers asked for this.', supporters: 521, supportersLast30: 0, owner: 'Accessibility & Languages Team', decisionBy: '2026-10-28',
    decisionNote: {
      changed: 'Profile → Display now lets you make all text larger or smaller.',
      why: '521 customers asked for this, many of them senior citizens who found the text too small.',
      decidedBy: 'Accessibility & Languages Team',
    },
  },
  {
    ...base, id: 'iv-27455', code: 'IV-27455', title: 'Allow login with developer mode on', category: 'App', stage: 'decision', stageDates: { heard: '4 Aug', under_review: '11 Aug', testing: '15 Sep', decision: '19 Oct' },
    decision: 'not_proceeding', note: '142 customers raised this. Everyone who asked has been sent this decision.', supporters: 142, supportersLast30: 0, owner: 'Mobile App Security Team', decisionBy: '2026-10-19',
    decisionNote: {
      changed: 'The app now tells you exactly which setting to switch off, with a one-tap shortcut.',
      why: 'Developer mode lets other apps change how your phone behaves. That can be used to steal OTPs or take over a banking session. We can’t allow login with it on.',
      notChanged: 'We are not changing the rule. Login stays blocked while developer mode is on.',
      decidedBy: 'Mobile App Security Team',
    },
  },
];

export const isOpen = (i: Idea) => i.stage !== 'decision';
