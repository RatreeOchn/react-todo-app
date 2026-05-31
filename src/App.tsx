import { useState } from 'react';
import Sidebar from '@/components/Layout/Sidebar';
import Topbar from '@/components/Layout/Topbar';
import MobileNav from '@/components/Layout/MobileNav';
import TasksPage from '@/pages/TasksPage';
import ShoppingPage from '@/pages/ShoppingPage';
import SettingsPage from '@/pages/SettingsPage';
import { useAppStore } from '@/store/useAppStore';

const THEME_CYCLE: string[] = ['warm', 'paper', 'ink'];
const THEME_ICON: Record<string, string> = {
  warm: 'ti-moon',
  paper: 'ti-moon-stars',
  ink: 'ti-sun',
};

export default function App() {
  const currentPage = useAppStore((s) => s.currentPage);
  const [theme, setTheme] = useState('warm');

  function cycleTheme() {
    const next = THEME_CYCLE[(THEME_CYCLE.indexOf(theme) + 1) % THEME_CYCLE.length];
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  }

  function renderPage() {
    switch (currentPage) {
      case 'shopping':
        return <ShoppingPage />;
      case 'settings':
        return <SettingsPage />;
      case 'today':
      case 'all':
      case 'urgent':
      default:
        return <TasksPage />;
    }
  }

  return (
    <div className="grid grid-cols-[260px_1fr] min-h-screen max-[850px]:grid-cols-[1fr] bg-(--bg) text-(--ink)">
      <div className="max-[880px]:hidden">
        <Sidebar />
      </div>

      <main className="flex flex-col min-h-screen">
        <Topbar onToggleTheme={cycleTheme} themeIcon={THEME_ICON[theme]} />

        <div className="hidden max-[850px]:block">
          <MobileNav />
        </div>

        <div className="px-8 pb-20 pt-2 max-w-225 w-full mx-auto max-[850px]:px-4">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
