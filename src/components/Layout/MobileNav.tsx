import { useCurrentPage } from '@/hooks/useTasks';
import type { PageId } from '@/context/todoContext';

const ITEMS: { page: PageId; icon: string; label: string }[] = [
  { page: 'today', icon: 'ti-sun', label: 'วันนี้' },
  { page: 'all', icon: 'ti-list-check', label: 'ทั้งหมด' },
  { page: 'urgent', icon: 'ti-flame', label: 'ด่วน' },
  { page: 'shopping', icon: 'ti-shopping-cart', label: 'ซื้อของ' },
  { page: 'settings', icon: 'ti-settings', label: 'Settings' },
];

export default function MobileNav() {
  const { currentPage: activePage, setCurrentPage: onNavigate } = useCurrentPage();

  return (
    <nav className="flex items-center gap-1 overflow-x-auto px-4 py-2 border-b border-(--line) bg-(--bg)">
      {ITEMS.map(({ page, icon, label }) => (
        <button
          key={page}
          onClick={() => onNavigate(page)}
          className={[
            'flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] whitespace-nowrap transition-all duration-200',
            activePage === page
              ? 'bg-(--surface) text-(--ink) font-medium'
              : 'text-(--ink-2) hover:bg-(--surface-2) hover:text-(--ink)',
          ].join(' ')}
        >
          <i className={`ti ${icon} text-base`} />
          {label}
        </button>
      ))}
    </nav>
  );
}
