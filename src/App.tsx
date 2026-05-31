import Sidebar from '@/components/Layout/Sidebar';
import Topbar from '@/components/Layout/Topbar';
import MobileNav from '@/components/Layout/MobileNav';
import TasksPage from '@/pages/TasksPage';
import ShoppingPage from '@/pages/ShoppingPage';
import SettingsPage from '@/pages/SettingsPage';
import Toast from '@/components/Toast';
import { useCurrentPage, useTheme } from '@/hooks/useTasks';

const THEME_CYCLE: ('warm' | 'paper' | 'ink')[] = ['warm', 'paper', 'ink'];
const THEME_ICON: Record<string, string> = {
  warm: 'ti-moon',
  paper: 'ti-moon-stars',
  ink: 'ti-sun',
};

export default function App() {
  const { currentPage } = useCurrentPage();
  const { theme, setTheme } = useTheme();

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
    <div className="grid grid-cols-[240px_1fr] min-h-screen max-[880px]:grid-cols-[1fr] bg-(--bg) text-(--ink)">
      <div className="max-[880px]:hidden">
        <Sidebar />
      </div>

      <main className="flex flex-col min-h-screen">
        <Topbar onToggleTheme={cycleTheme} themeIcon={THEME_ICON[theme]} />

        <div className="hidden max-[880px]:block">
          <MobileNav />
        </div>

        <div className="px-8 pb-20 pt-2 max-w-225 w-full mx-auto max-[880px]:px-4">
          {renderPage()}
        </div>
      </main>

      <Toast />
    </div>
  );
}
