import type { Moment } from './types';

const t = (id: string, title: string, detail: string, tip?: string) => ({
  id,
  title,
  detail,
  tip,
  status: 'todo' as const,
});

export const seedMoments: Moment[] = [
  { id: 'job', title: 'New Job', blurb: 'Salary account, nominee and more', available: false, reminder: true, tasks: [] },
  {
    id: 'moving',
    title: 'Moving To A New City',
    blurb: '5 simple tasks',
    available: true,
    reminder: true,
    tasks: [
      t(
        'm1',
        'Update your communication address',
        'You can do this in the app with Aadhaar.',
        'If you want cards or documents sent to a different address than your Aadhaar address, update the delivery address separately (Task 2).',
      ),
      t('m2', 'Check where your cards and documents will be delivered', 'Confirm the address where new cards, cheque books and statements will be sent.'),
      t('m3', 'Review recurring payments and standing instructions', 'Check the payments that leave your account on their own. Keep the ones you still need.'),
      t('m4', 'Choose alert and communication preferences', 'Pick how you want to hear from us, and in which language.'),
      t('m5', 'Find your new nearest branch or ATM', 'Know where to go if you need us in person.'),
    ],
  },
  { id: 'marriage', title: 'Marriage', blurb: 'Names, nominees, joint accounts', available: false, reminder: true, tasks: [] },
  { id: 'child', title: 'New Child', blurb: 'Nominees and savings goals', available: false, reminder: true, tasks: [] },
  {
    id: 'retirement',
    title: 'Retirement',
    blurb: '4 simple tasks',
    available: true,
    reminder: true,
    tasks: [
      t('r1', 'Check pension credit details', 'Make sure your pension is credited to the account you want, on the right date.'),
      t('r2', 'Review FD maturity instructions', 'Choose what happens when a fixed deposit ends: auto-renew or auto-close.'),
      t('r3', 'Update contact preferences', 'Choose how and when we contact you. Larger text and voice options are available.'),
      t('r4', 'Learn about senior support and doorstep banking', 'See what help is available at home, on the phone and at the branch.'),
    ],
  },
  { id: 'parent', title: 'Supporting A Parent', blurb: 'Help with their banking', available: false, reminder: true, tasks: [] },
  { id: 'other', title: 'Other', blurb: 'Something else changed', available: false, reminder: true, tasks: [] },
];
