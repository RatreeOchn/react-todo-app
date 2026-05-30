interface TopbarProps {
  crumb: string;
  onToggleTheme?: () => void;
  themeIcon?: string;
}

export default function Topbar({
  crumb,
  onToggleTheme,
  themeIcon = 'ti-moon',
}: TopbarProps) {
  return (
    <div className="sticky top-0 z-50 flex items-center gap-4 px-8 py-4.5">
      <span className="text-xs text-(--ink-3)">{crumb}</span>

      <div className="ml-auto flex items-center gap-1.5">
        <IconBtn icon={themeIcon} title="เปลี่ยน theme" onClick={onToggleTheme} />
      </div>
    </div>
  );
}

function IconBtn({ icon, title, onClick }: { icon: string; title?: string; onClick?: () => void }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="w-9.5 h-9.5 rounded-full bg-(--surface) flex items-center justify-center text-(--ink-2) shadow-[0_1px_3px_rgba(46,42,36,0.05)] transition-all duration-200 hover:bg-(--surface-2) hover:text-(--ink) hover:-translate-y-px"
    >
      <i className={`ti ${icon} text-[17px]`} />
    </button>
  );
}
