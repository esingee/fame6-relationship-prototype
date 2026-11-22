import type { Case } from './types';

export const seedCases: Case[] = [
  {
    id: 'cn-24817',
    caseNo: 'CN-24817',
    title: 'EMI paid but showing as due',
    product: 'Two-wheeler loan',
    raisedVia: 'Phone',
    raisedOn: '18 Nov',
    status: 'in_progress',
    statusLabel: 'In progress',
    nextUpdateBy: '26 Nov',
    dateChangedReason:
      'We originally said 24 Nov. We moved it to 26 Nov because the reversal needs a second approval. Sorry for the delay.',
    toldUs:
      'You paid your EMI of ₹3,450 on 2 Nov through the app. Your loan still shows it as due, and a ₹590 bounce charge was added.',
    checked: [
      'Your payment of ₹3,450 reached us on 2 Nov',
      'It was not matched to your loan account because of a reference mismatch',
      'The bounce charge was added automatically on 3 Nov',
    ],
    team: 'Loans Servicing Team, Mumbai',
    found: 'This was our error. Your payment arrived on time but was recorded against the wrong reference.',
    nextStep:
      'We will match your payment and reverse the ₹590 charge by 26 Nov. You’ll get a message here and by SMS when it’s done.',
    creditNote:
      'We will also correct the record we send to credit bureaus, so your score is not affected.',
    resolvedChecks: ['Payment matched', 'Charge reversed'],
    resolvedNote: 'Resolved on 26 Nov. If anything looks wrong, tap Reopen within 30 days.',
    timeline: [
      { at: '18 Nov, 10:42', label: 'You raised this request', channel: 'phone', by: 'customer' },
      { at: '18 Nov, 10:50', label: 'We acknowledged your request', by: 'bank' },
      { at: '19 Nov, 15:10', label: 'We found your payment of ₹3,450', by: 'bank' },
      { at: '20 Nov, 11:30', label: 'We confirmed this was our error', by: 'bank' },
      { at: '21 Nov, 17:05', label: 'Reversal scheduled for 26 Nov', by: 'bank' },
    ],
    internalNotes:
      'Ref mismatch NACH-UTR vs loan a/c. Ops ticket #OPS-5521. Bounce reversal needs L2 approval.',
    customerNoteDraft:
      'Hello Priya, we have confirmed that your EMI payment of ₹3,450 reached us on time but was recorded against the wrong reference. Our team is matching it to your loan account. The ₹590 charge will be reversed by 26 Nov, and we will correct your credit record too. We are sorry for the trouble.',
  },
  {
    id: 'cn-24902',
    caseNo: 'CN-24902',
    title: 'FASTag toll charged for a trip I didn’t make',
    product: 'FASTag',
    raisedVia: 'App',
    raisedOn: '16 Nov',
    status: 'waiting',
    statusLabel: 'Waiting for toll operator',
    nextUpdateBy: '28 Nov',
    toldUs: 'A toll of ₹185 was charged on 14 Nov for a plaza on a route you did not travel.',
    checked: [
      'We found the toll entry of ₹185 on 14 Nov',
      'Your vehicle was not recorded at any other plaza that day',
    ],
    team: 'Cards & Payments Support Team, Pune',
    found: 'The charge looks wrong. We have asked the toll operator to confirm the vehicle number they read.',
    nextStep:
      'The toll operator has up to 10 working days to reply. If they agree, we will return ₹185 to your FASTag wallet by 28 Nov.',
    resolvedChecks: ['Toll operator confirmed', '₹185 returned to your FASTag wallet'],
    resolvedNote: 'Resolved. If anything looks wrong, tap Reopen within 30 days.',
    timeline: [
      { at: '16 Nov, 08:15', label: 'You raised this request', channel: 'app', by: 'customer' },
      { at: '16 Nov, 08:20', label: 'We acknowledged your request', by: 'bank' },
      { at: '18 Nov, 12:40', label: 'We asked the toll operator to check', by: 'bank' },
    ],
    internalNotes: 'Dispute raised on NETC portal. TAT 10 working days from 18 Nov.',
    customerNoteDraft:
      'Hello Priya, we have asked the toll operator to check the vehicle number on your 14 Nov toll. We will update you by 28 Nov.',
  },
  {
    id: 'cn-24511',
    caseNo: 'CN-24511',
    title: 'Debit card replacement',
    product: 'Debit card',
    raisedVia: 'Branch',
    raisedOn: '4 Nov',
    status: 'resolved',
    statusLabel: 'Resolved',
    closedOn: '10 Nov',
    toldUs: 'Your debit card was damaged and you asked for a new one.',
    checked: ['Your old card was blocked on 4 Nov', 'Your new card was sent to your address on 6 Nov'],
    team: 'Cards Servicing Team, Mumbai',
    found: 'Your new card reached you on 10 Nov.',
    nextStep: 'Nothing more to do. Your new card is active.',
    resolvedChecks: ['New card delivered'],
    resolvedNote: 'Closed on 10 Nov. If anything looks wrong, tap Reopen within 30 days.',
    timeline: [
      { at: '4 Nov, 11:05', label: 'You raised this request', channel: 'branch', by: 'customer' },
      { at: '4 Nov, 11:10', label: 'Old card blocked', by: 'bank' },
      { at: '6 Nov, 16:00', label: 'New card sent to you', by: 'bank' },
      { at: '10 Nov, 13:20', label: 'New card delivered. Request closed', by: 'bank' },
    ],
    internalNotes: 'Replacement dispatched via courier. POD received.',
    customerNoteDraft: 'Hello Priya, your new debit card was delivered on 10 Nov. This request is now closed.',
  },
];
