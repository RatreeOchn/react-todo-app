interface EmptyStateProps {
  icon: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-14 px-6 bg-(--surface) rounded-2xl shadow-[0_1px_3px_rgba(46,42,36,0.04)]">
      <div className="text-4xl text-(--ink-4) mb-3.5">
        <i className={`ti ${icon}`} />
      </div>
      <h3 className="text-lg font-medium text-(--ink) mb-1.5">{title}</h3>
      {description && (
        <p className="text-[13px] text-(--ink-3) max-w-70 mx-auto mb-5">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex items-center gap-1.5 text-[13px] px-4 py-2.5 rounded-xl bg-(--ink) text-(--bg) transition-all hover:-translate-y-px"
        >
          <i className="ti ti-plus text-[13px]" />
          {action.label}
        </button>
      )}
    </div>
  );
}
