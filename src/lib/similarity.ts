/**
 * Prototype stand-in. Production would use a multilingual sentence-embedding model
 * with human review of merges.
 *
 * Steps: lowercase, strip punctuation, drop English + Hinglish stopwords, map synonyms
 * to one canonical word, then score by Jaccard overlap of the remaining word sets.
 */
import type { Idea } from '../data/types';

const STOP = new Set(
  ('i me my mine we our you your the a an and or but of to in on at by for from with into is are was be been am do does did can could would should will ' +
    'want wants need please let lets get make it its this that these those so as if when how what why not no yes ' +
    'mujhe mera meri mere hum humein chahiye chahie karna karne karo kar kare ke ka ki ko se me mein par pe hai hain ho hona tha thi aur ya bhi ' +
    'app apna apni show give have has').split(' '),
);
// "app" is kept out of the stoplist below by being mapped to a token; see SYN.
STOP.delete('app');

const SYN: Record<string, string> = {
  close: 'close', closure: 'close', foreclose: 'close', foreclosure: 'close', band: 'close', shut: 'close',
  loan: 'loan', loans: 'loan', emi: 'loan', emis: 'loan',
  otp: 'otp', code: 'otp',
  email: 'email', mail: 'email',
  call: 'call', calls: 'call', calling: 'call', phone: 'call', phoning: 'call',
  stop: 'stop', rok: 'stop', roko: 'stop', halt: 'stop', block: 'stop',
  spam: 'offer', marketing: 'offer', offer: 'offer', offers: 'offer', promo: 'offer',
  app: 'app', application: 'app', mobile: 'app',
};

export function tokens(text: string): string[] {
  const out = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .filter((w) => !STOP.has(w))
    .map((w) => SYN[w] ?? (w.length > 3 && w.endsWith('s') ? w.slice(0, -1) : w));
  return [...new Set(out)];
}

export function score(a: string, b: string): number {
  const A = new Set(tokens(a));
  const B = new Set(tokens(b));
  if (!A.size || !B.size) return 0;
  let both = 0;
  A.forEach((w) => B.has(w) && both++);
  return both / (A.size + B.size - both);
}

export const MATCH_THRESHOLD = 0.3;

/** At least 3 words typed; returns up to 2 best matches, best first. */
export function findSimilar(text: string, ideas: Idea[]): { idea: Idea; score: number }[] {
  if (text.trim().split(/\s+/).filter(Boolean).length < 3) return [];
  return ideas
    .map((idea) => ({ idea, score: score(text, idea.title) }))
    .filter((m) => m.score >= MATCH_THRESHOLD)
    .sort((x, y) => y.score - x.score)
    .slice(0, 2);
}
