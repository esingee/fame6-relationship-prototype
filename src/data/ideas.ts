import type { Idea } from './types';

export const seedIdeas: Idea[] = [
  {
    id: 'iv-29876',
    code: 'IV-29876',
    title: 'Let me get the login OTP by email when I’m abroad',
    category: 'App',
    stage: 'under_review',
    stageDates: { heard: '12 Nov', under_review: '14 Nov' },
    note: 'We’re checking security rules and how many customers travel often. Decision by 15 Dec.',
    mine: true,
  },
  {
    id: 'iv-28110',
    code: 'IV-28110',
    title: 'Show how many EMIs are left and how much I’ve paid',
    category: 'Loans',
    stage: 'decision',
    stageDates: { heard: '3 Sep', under_review: '10 Sep', testing: '2 Oct', decision: '28 Oct' },
    decision: 'implemented',
    note: 'Now live in Loans → Repayment Progress. 1,240 customers asked for this.',
    askedBy: 1240,
    mine: true,
    decisionNote: {
      changed: 'Loans → Repayment Progress now shows how many EMIs are left and how much you have paid so far.',
      why: '1,240 customers asked for this. Many said they could not tell how close they were to finishing their loan.',
      notChanged:
        'We have not added “loan closure date” forecasts. They depend on rate changes we cannot predict, so we would risk showing a wrong date. We will look at this again next year.',
      decidedBy: 'Loans Digital Product Team',
    },
  },
  {
    id: 'iv-27455',
    code: 'IV-27455',
    title: 'Allow login with developer mode on',
    category: 'App',
    stage: 'decision',
    stageDates: { heard: '4 Aug', under_review: '11 Aug', testing: '15 Sep', decision: '19 Oct' },
    decision: 'not_proceeding',
    note: '142 customers raised this. Everyone who asked has been sent this decision.',
    askedBy: 142,
    mine: false,
    decisionNote: {
      changed:
        'The app now tells you exactly which setting to switch off, with a one-tap shortcut.',
      why: 'Developer mode lets other apps change how your phone behaves. That can be used to steal OTPs or take over a banking session. We can’t allow login with it on.',
      notChanged: 'We are not changing the rule. Login stays blocked while developer mode is on.',
      decidedBy: 'Mobile App Security Team',
    },
  },
];
