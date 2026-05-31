import { useState } from 'react';
import { useTodoContext } from '@/context/useTodoContext';
import type { Task, Subtask } from '@/types/task';
import { todoApi } from '@/services/todoApi';
import { uid } from '@/utils/id';

interface SubtaskListProps {
  task: Task;
}

export default function SubtaskList({ task }: SubtaskListProps) {
  const { dispatch } = useTodoContext();
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const subtasks = task.subtasks || [];

  async function handleToggleSubtask(sub: Subtask) {
    const newDone = !sub.done;

    dispatch({
      type: 'SUBTASK_UPDATED',
      payload: { taskId: task.id, subId: sub.id, patch: { done: newDone } },
    });

    try {
      await todoApi.updateSubtask(task.id, sub.id, { done: newDone });
    } catch {
      dispatch({
        type: 'SUBTASK_UPDATED',
        payload: { taskId: task.id, subId: sub.id, patch: { done: sub.done } },
      });
      dispatch({
        type: 'TOAST_SHOW',
        payload: { id: uid(), message: 'อัพเดตไม่สำเร็จ', icon: 'ti-alert-circle' },
      });
    }
  }

  async function handleRemoveSubtask(sub: Subtask) {
    dispatch({
      type: 'SUBTASK_REMOVED',
      payload: { taskId: task.id, subId: sub.id },
    });

    try {
      await todoApi.removeSubtask(task.id, sub.id);
    } catch {
      dispatch({
        type: 'SUBTASK_ADDED',
        payload: { taskId: task.id, subtask: sub },
      });
      dispatch({
        type: 'TOAST_SHOW',
        payload: { id: uid(), message: 'ลบไม่สำเร็จ', icon: 'ti-alert-circle' },
      });
    }
  }

  async function handleAddSubtask() {
    const title = newSubtaskTitle.trim();
    if (!title || submitting) return;

    setSubmitting(true);
    setNewSubtaskTitle('');

    try {
      const newSub = await todoApi.createSubtask(task.id, { title });
      dispatch({
        type: 'SUBTASK_ADDED',
        payload: { taskId: task.id, subtask: newSub },
      });
    } catch {
      dispatch({
        type: 'TOAST_SHOW',
        payload: { id: uid(), message: 'เพิ่มขั้นไม่สำเร็จ', icon: 'ti-alert-circle' },
      });
      setNewSubtaskTitle(title); // restore input
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-4 pt-4 border-t border-(--surface-2)">
      {subtasks.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {subtasks.map((sub) => (
            <SubtaskPill
              key={sub.id}
              subtask={sub}
              onToggle={() => handleToggleSubtask(sub)}
              onRemove={() => handleRemoveSubtask(sub)}
            />
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 px-3 py-2 bg-(--surface-2)/60 rounded-full">
        <i className="ti ti-plus text-[14px] text-(--ink-3)" />
        <input
          type="text"
          value={newSubtaskTitle}
          onChange={(e) => setNewSubtaskTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAddSubtask();
          }}
          disabled={submitting}
          placeholder="เพิ่มขั้นใหม่..."
          className="flex-1 bg-transparent border-none outline-none text-[12px] text-(--ink) placeholder:text-(--ink-4) disabled:opacity-50"
          aria-label="add subtask"
        />
        <span className="hidden sm:inline text-[10px] text-(--ink-4)">Enter เพื่อบันทึก</span>
      </div>
    </div>
  );
}

interface SubtaskPillProps {
  subtask: Subtask;
  onToggle: () => void;
  onRemove: () => void;
}

function SubtaskPill({ subtask, onToggle, onRemove }: SubtaskPillProps) {
  const isDone = subtask.done;

  return (
    <div
      className={[
        'group/pill inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] transition-all duration-200 cursor-pointer select-none',
        isDone
          ? 'bg-(--ok-soft) text-(--ok)'
          : 'bg-(--surface-2) text-(--ink-2) hover:bg-(--surface-3)',
      ].join(' ')}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      aria-label={`${subtask.title} — ${isDone ? 'เสร็จแล้ว' : 'ยังไม่เสร็จ'}`}
    >
      <span
        className={[
          'w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-medium shrink-0',
          isDone ? 'bg-(--ok) text-white' : 'bg-(--ink) text-(--bg)',
        ].join(' ')}
      >
        {subtask.order}
      </span>

      <span className={isDone ? 'line-through' : ''}>{subtask.title}</span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="opacity-0 group-hover/pill:opacity-70 hover:opacity-100! transition-opacity -mr-1 p-0.5 hover:text-(--urgent)"
        aria-label="remove subtask"
        title="ลบ"
      >
        <i className="ti ti-x text-[11px]" />
      </button>
    </div>
  );
}
