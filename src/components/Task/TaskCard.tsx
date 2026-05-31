import { useAppStore } from '@/store/useAppStore';
import type { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const toggleTask = useAppStore((s) => s.toggleTask);
  const deleteTask = useAppStore((s) => s.deleteTask);

  return (
    <div
      className={[
        'group bg-(--surface) rounded-2xl px-4.5 py-4 relative transition-all duration-200',
        'shadow-[0_1px_3px_rgba(46,42,36,0.04)]',
        'hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(46,42,36,0.06)]',
      ].join(' ')}
    >
      <div className="flex gap-3.5 items-center">
        <button
          onClick={() => toggleTask(task.id)}
          className={[
            'w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 border-[1.5px]',
            task.done
              ? 'bg-(--ok) border-(--ok)'
              : 'border-(--ink-4) bg-transparent hover:border-(--ok) hover:bg-(--ok-soft)',
          ].join(' ')}
          aria-label={task.done ? 'mark as undone' : 'mark as done'}
        >
          {task.done && <i className="ti ti-check text-[12px] text-white leading-none" />}
        </button>

        <div className="flex-1 min-w-0 self-center">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={[
                'text-[14px] leading-[1.45] wrap-break-word',
                task.done ? 'line-through text-(--ink-3)' : 'text-(--ink)',
              ].join(' ')}
            >
              {task.title}
            </span>
          </div>

          {task.note && !task.remindIn && (
            <div className="flex items-center gap-1.5 text-[11px] text-(--ink-3) mt-1">
              <i className="ti ti-note text-[12px]" />
              {task.note}
            </div>
          )}
        </div>

        <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
          <button
            onClick={() => deleteTask(task.id)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-(--ink-3) hover:bg-(--urgent-soft) hover:text-(--urgent) transition-all"
            aria-label="delete task"
            title="ลบ"
          >
            <i className="ti ti-trash text-[14px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
