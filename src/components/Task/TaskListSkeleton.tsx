const WIDTHS = [1, 2, 3, 4].map(() => `${60 + Math.random() * 30}%`);

export default function TaskListSkeleton() {
  return (
    <div className="flex flex-col gap-2" aria-label="กำลังโหลด...">
      {[1, 2, 3, 4].map((item, i) => (
        <div
          key={item}
          className="bg-(--surface) rounded-2xl px-4.5 py-4 shadow-[0_1px_3px_rgba(46,42,36,0.04)]"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-5 h-5 rounded-full bg-(--surface-2) shrink-0 mt-0.5 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div
                className="h-3.5 bg-(--surface-2) rounded animate-pulse"
                style={{ width: WIDTHS[i] }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
