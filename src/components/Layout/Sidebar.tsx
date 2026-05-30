type Page = 'today' | 'all' | 'urgent' | 'shopping' | 'settings';

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  counts: { today: number; all: number; urgent: number; shop: number };
}

const NAV_ITEMS: {
  page: Page;
  icon: string;
  label: string;
  countKey?: keyof SidebarProps['counts'];
}[] = [
  { page: 'today', icon: 'ti-sun', label: 'วันนี้', countKey: 'today' },
  { page: 'all', icon: 'ti-list-check', label: 'ทั้งหมด', countKey: 'all' },
  { page: 'urgent', icon: 'ti-flame', label: 'ด่วน', countKey: 'urgent' },
];

const LIST_ITEMS: {
  page: Page;
  icon: string;
  label: string;
  countKey?: keyof SidebarProps['counts'];
}[] = [{ page: 'shopping', icon: 'ti-shopping-cart', label: 'ซื้อของ', countKey: 'shop' }];

export default function Sidebar({ activePage, onNavigate, counts }: SidebarProps) {
  return (
    <aside className="w-60 h-[calc(100vh-24px)] sticky top-0 flex flex-col gap-1 px-4.5 py-6 overflow-y-auto bg-(--surface-2)/50 rounded-2xl m-3">
      <div className="flex items-center gap-1 px-3.5 pb-4.5 pt-3">
        <div className="w-8 h-8 rounded-[10px] bg-(--surface-dark) text-(--surface) flex items-center justify-center font-medium text-sm tracking-tight">
          to
        </div>
        <span className="text-base font-medium tracking-tight text-(--ink)">
          do<span className="text-(--urgent)">.</span>
        </span>
      </div>

      <div className="mt-3.5">
        <p className="text-[10px] text-(--ink-3) uppercase tracking-[0.14em] font-medium px-3.5 pb-2">
          งาน
        </p>
        {NAV_ITEMS.map(({ page, icon, label, countKey }) => (
          <NavItem
            key={page}
            icon={icon}
            label={label}
            count={countKey ? counts[countKey] : undefined}
            active={activePage === page}
            onClick={() => onNavigate(page)}
          />
        ))}
      </div>

      <div className="mt-3.5">
        <p className="text-[10px] text-(--ink-3) uppercase tracking-[0.14em] font-medium px-3.5 pb-2">
          รายการ
        </p>
        {LIST_ITEMS.map(({ page, icon, label, countKey }) => (
          <NavItem
            key={page}
            icon={icon}
            label={label}
            count={countKey ? counts[countKey] : undefined}
            active={activePage === page}
            onClick={() => onNavigate(page)}
          />
        ))}
      </div>

      <div className="mt-auto pt-3.5">
        <NavItem
          icon="ti-settings"
          label="Settings"
          active={activePage === 'settings'}
          onClick={() => onNavigate('settings')}
        />
      </div>
    </aside>
  );
}

function NavItem({
  icon,
  label,
  count,
  active,
  onClick,
}: {
  icon: string;
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'w-full flex items-center gap-3 px-3.5 py-2.25 rounded-[10px] text-[13px] text-left mb-0.5 transition-all duration-200',
        active
          ? 'bg-(--surface) text-(--ink) font-medium shadow-[0_1px_3px_rgba(46,42,36,0.04)]'
          : 'text-(--ink-2) hover:bg-(--surface-2) hover:text-(--ink)',
      ].join(' ')}
    >
      <i
        className={`ti ${icon} text-[17px] w-4.5 ${active ? 'text-(--ink)' : 'text-(--ink-3)'}`}
      />
      {label}
      {count !== undefined && (
        <span className="ml-auto text-[11px] text-(--ink-3) bg-(--surface-2) px-2 py-0.5 rounded-full min-w-5.5 text-center tabular-nums">
          {count}
        </span>
      )}
    </button>
  );
}
