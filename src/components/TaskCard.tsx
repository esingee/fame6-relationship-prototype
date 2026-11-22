import { Ellipsis } from 'lucide-react';
import { Chip, type Tone } from './ui';
import type { MomentTask, TaskStatus } from '../data/types';

const LABEL: Record<TaskStatus, string> = { todo: 'To Do', done: 'Done', need_help: 'Need Help', not_relevant: 'Not Relevant' };
const TONE: Record<TaskStatus, Tone> = { todo: 'grey', done: 'ok', need_help: 'warn', not_relevant: 'grey' };

export function TaskCard({ n, task, onOpen, onMenu }: { n: number; task: MomentTask; onOpen: () => void; onMenu: () => void }) {
  const off = task.status === 'not_relevant';
  return (
    <div className={`flex items-stretch border-b border-gray-100 ${off ? 'opacity-60' : ''}`}>
      <button type="button" onClick={onOpen} className="flex min-h-[64px] flex-1 items-start gap-3 p-4 text-left">
        <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${task.status === 'done' ? 'bg-ok text-white' : 'bg-brand-tint text-brand-dark'}`}>{task.status === 'done' ? '✓' : n}</span>
        <span className="min-w-0 flex-1">
          <span className={`block font-semibold leading-snug ${task.status === 'done' ? 'text-ink-soft line-through' : ''}`}>{task.title}</span>
          <span className="mt-1.5 flex flex-wrap items-center gap-2">
            <Chip tone={TONE[task.status]}>{LABEL[task.status]}</Chip>
            {task.helpRequest && <span className="text-xs text-ink-soft">{task.helpRequest}</span>}
          </span>
        </span>
      </button>
      <button type="button" aria-label={`More options for task ${n}`} onClick={onMenu} className="flex w-12 shrink-0 items-center justify-center text-ink-soft">
        <Ellipsis size={20} />
      </button>
    </div>
  );
}
