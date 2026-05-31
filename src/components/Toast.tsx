import { useEffect } from 'react';
import { useToasts } from '@/hooks/useTasks';

export default function Toast() {
  const { toasts, dismissToast } = useToasts();

  useEffect(() => {
    if (toasts.length === 0) return;
    const latest = toasts[toasts.length - 1];
    const timer = setTimeout(() => dismissToast(latest.id), 2000);
    return () => clearTimeout(timer);
  }, [toasts, dismissToast]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-2000 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-(--surface-dark) text-(--bg) px-4.5 py-3 rounded-2xl text-[13px] shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex items-center gap-2.5 max-w-[320px] pointer-events-auto animate-[toastIn_0.25s_cubic-bezier(0.2,1,0.3,1)]"
        >
          <i className={`ti ${toast.icon || 'ti-check'} text-[15px]`} />
          <span>{toast.message}</span>
        </div>
      ))}

      <style>{`
        @keyframes toastIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
