interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ message = 'โหลดข้อมูลไม่สำเร็จ', onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-14 px-6 bg-(--surface) rounded-2xl shadow-[0_1px_3px_rgba(46,42,36,0.04)]">
      <div className="text-4xl text-(--urgent) mb-3.5">
        <i className="ti ti-alert-circle" />
      </div>
      <h3 className="text-lg font-medium text-(--ink) mb-1.5">เกิดข้อผิดพลาด</h3>
      <p className="text-[13px] text-(--ink-3) max-w-[320px] mx-auto mb-5">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 text-[13px] px-4 py-2.5 rounded-xl bg-(--ink) text-(--bg) transition-all hover:-translate-y-px"
        >
          <i className="ti ti-refresh text-[13px]" />
          ลองใหม่
        </button>
      )}
    </div>
  );
}
