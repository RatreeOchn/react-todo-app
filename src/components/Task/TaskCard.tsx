import { useState, useRef, useEffect } from 'react';
import { useTodoContext } from '@/context/useTodoContext';
import type { Task } from '@/types/task';
import { todoApi } from '@/services/todoApi';
import { uid } from '@/utils/id';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { dispatch } = useTodoContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  const [submitting, setSubmitting] = useState(false);
  const [prevTitle, setPrevTitle] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  if (task.title !== prevTitle) {
    setPrevTitle(task.title);
    if (!isEditing) {
      setEditValue(task.title);
    }
  }

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  async function handleToggle() {
    if (isEditing) return;
    const newDone = !task.done;
    dispatch({
      type: 'TASK_UPDATED',
      payload: { id: task.id, patch: { done: newDone } },
    });
    try {
      await todoApi.update(task.id, { done: newDone });
    } catch {
      dispatch({
        type: 'TASK_UPDATED',
        payload: { id: task.id, patch: { done: task.done } },
      });
      dispatch({
        type: 'TOAST_SHOW',
        payload: { id: uid(), message: 'อัพเดตไม่สำเร็จ', icon: 'ti-alert-circle' },
      });
    }
  }

  async function handleDelete() {
    dispatch({ type: 'TASK_REMOVED', payload: task.id });
    try {
      await todoApi.remove(task.id);
      dispatch({
        type: 'TOAST_SHOW',
        payload: { id: uid(), message: 'ลบงานแล้ว', icon: 'ti-trash' },
      });
    } catch {
      dispatch({ type: 'TASK_ADDED', payload: task });
      dispatch({
        type: 'TOAST_SHOW',
        payload: { id: uid(), message: 'ลบไม่สำเร็จ', icon: 'ti-alert-circle' },
      });
    }
  }

  function startEdit() {
    setEditValue(task.title);
    setIsEditing(true);
  }

  function cancelEdit() {
    setEditValue(task.title);
    setIsEditing(false);
  }

  async function saveEdit() {
    const newTitle = editValue.trim();
    if (!newTitle || newTitle === task.title) {
      cancelEdit();
      return;
    }
    setSubmitting(true);
    dispatch({
      type: 'TASK_UPDATED',
      payload: { id: task.id, patch: { title: newTitle } },
    });
    setIsEditing(false);
    try {
      await todoApi.update(task.id, { title: newTitle });
      dispatch({
        type: 'TOAST_SHOW',
        payload: { id: uid(), message: 'แก้ไขแล้ว', icon: 'ti-check' },
      });
    } catch {
      dispatch({
        type: 'TASK_UPDATED',
        payload: { id: task.id, patch: { title: task.title } },
      });
      dispatch({
        type: 'TOAST_SHOW',
        payload: { id: uid(), message: 'แก้ไขไม่สำเร็จ', icon: 'ti-alert-circle' },
      });
    } finally {
      setSubmitting(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit();
    }
  }

  return (
    <div className="group bg-(--surface) rounded-2xl px-4.5 py-4 relative transition-all duration-200 shadow-[0_1px_3px_rgba(46,42,36,0.04)] hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(46,42,36,0.06)]">
      <div className="flex items-start gap-3.5">
        <button
          onClick={handleToggle}
          disabled={isEditing}
          className={[
            'w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 border-[1.5px]',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            task.done
              ? 'bg-(--ok) border-(--ok)'
              : 'border-(--ink-4) bg-transparent hover:border-(--ok) hover:bg-(--ok-soft)',
          ].join(' ')}
          aria-label={task.done ? 'mark as undone' : 'mark as done'}
        >
          {task.done && <i className="ti ti-check text-[12px] text-white leading-none" />}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={saveEdit}
              disabled={submitting}
              className="w-full bg-transparent border-b border-(--ink-3) outline-none text-[14px] text-(--ink) pb-1 disabled:opacity-50"
              aria-label="edit task title"
            />
          ) : (
            <button
              onDoubleClick={startEdit}
              className="text-left w-full"
              title="Double-click to edit"
            >
              <span
                className={[
                  'text-[14px] leading-[1.45] wrap-break-word',
                  task.done ? 'line-through text-(--ink-3)' : 'text-(--ink)',
                ].join(' ')}
              >
                {task.title}
              </span>
            </button>
          )}

          {!isEditing && task.note && !task.remindIn && (
            <div className="flex items-center gap-1.5 text-[11px] text-(--ink-3) mt-1">
              <i className="ti ti-note text-[12px]" />
              {task.note}
            </div>
          )}
        </div>

        {!isEditing && (
          <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
            <button
              onClick={startEdit}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-(--ink-3) hover:bg-(--surface-2) hover:text-(--ink) transition-all"
              aria-label="edit task"
              title="แก้ไข"
            >
              <i className="ti ti-pencil text-[14px]" />
            </button>
            <button
              onClick={handleDelete}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-(--ink-3) hover:bg-(--urgent-soft) hover:text-(--urgent) transition-all"
              aria-label="delete task"
              title="ลบ"
            >
              <i className="ti ti-trash text-[14px]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
