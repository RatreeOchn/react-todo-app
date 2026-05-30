import { useState } from 'react';
import Sidebar from '@/components/Layout/Sidebar';
import Topbar from '@/components/Layout/Topbar';
import MobileNav from '@/components/Layout/MobileNav';

type Page = 'today' | 'all' | 'urgent' | 'shopping' | 'settings';

const THEME_CYCLE: string[] = ['warm', 'paper', 'ink'];
const THEME_ICON: Record<string, string> = {
  warm: 'ti-moon',
  paper: 'ti-moon-stars',
  ink: 'ti-sun',
};

const CRUMB_LABEL: Record<Page, string> = {
  today: new Date().toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric', month: 'long' }),
  all: 'งานทั้งหมด',
  urgent: 'งานด่วน',
  shopping: 'รายการซื้อของ',
  settings: 'Settings',
};

export default function App() {
  const [page, setPage] = useState<Page>('today');
  const [theme, setTheme] = useState('warm');

  function cycleTheme() {
    const next = THEME_CYCLE[(THEME_CYCLE.indexOf(theme) + 1) % THEME_CYCLE.length];
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  }

  const counts = { today: 3, all: 5, urgent: 1, shop: 4 };

  return (
    <div className="grid grid-cols-[240px_1fr] min-h-screen max-[880px]:grid-cols-[1fr] bg-(--bg) text-(--ink)">
      <div className="max-[880px]:hidden">
        <Sidebar activePage={page} onNavigate={setPage} counts={counts} />
      </div>

      <main className="flex flex-col min-h-screen">
        <Topbar
          crumb={CRUMB_LABEL[page]}
          onToggleTheme={cycleTheme}
          themeIcon={THEME_ICON[theme]}
        />

        <div className="hidden max-[880px]:block">
          <MobileNav activePage={page} onNavigate={setPage} />
        </div>

        <div className="px-8 pb-20 pt-2 max-w-225 w-full mx-auto max-[880px]:px-4">
          <p className="text-2xl font-medium text-(--ink-3) mt-16 text-center select-none">
            Hello todo
          </p>
        </div>
      </main>
    </div>
  );
}
