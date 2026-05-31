import { useState, useRef, useEffect } from 'react';
import { useTodoContext } from '@/context/useTodoContext';
import { todoApi } from '@/services/todoApi';
import { uid } from '@/utils/id';

export default function QuickAdd() {
  const [value, setValue] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useTodoContext();

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  async function handleSubmit() {
    const title = value.trim();
    if (!title || submitting) return;

    setSubmitting(true);
    setValue('');

    try {
      const newTask = await todoApi.create({ title });
      dispatch({ type: 'TASK_ADDED', payload: newTask });
      dispatch({
        type: 'TOAST_SHOW',
        payload: { id: uid(), message: `เพิ่ม "${title}"`, icon: 'ti-check' },
      });
    } catch {
      dispatch({
        type: 'TOAST_SHOW',
        payload: { id: uid(), message: 'เพิ่มไม่สำเร็จ', icon: 'ti-alert-circle' },
      });
      setValue(title); // restore input
    } finally {
      setSubmitting(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="bg-(--surface) rounded-2xl mb-4.5 overflow-hidden transition-shadow duration-200 shadow-[0_1px_3px_rgba(46,42,36,0.04)] focus-within:shadow-[0_4px_16px_rgba(46,42,36,0.08)]">
      <div className="flex items-center gap-3.5 px-5 py-4">
        <span className="w-8 h-8 rounded-[10px] bg-(--surface-2) text-(--ink-2) flex items-center justify-center shrink-0">
          <i className="ti ti-plus text-[18px]" />
        </span>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
          placeholder="พิมพ์งานที่อยากทำ..."
          disabled={submitting}
          className="flex-1 bg-transparent border-none outline-none text-[15px] text-(--ink) placeholder:text-(--ink-4) disabled:opacity-50"
          autoComplete="off"
        />

        <span className="hidden sm:flex items-center gap-1 text-[11px] text-(--ink-4)">
          กด
          <kbd className="px-1.5 py-0.5 rounded bg-(--surface-2) text-(--ink-3) font-mono text-[10px]">
            Enter
          </kbd>
        </span>
      </div>
    </div>
  );
}
