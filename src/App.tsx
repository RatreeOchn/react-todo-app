import Topbar from '@/components/Layout/Topbar';
import TasksPage from '@/pages/TasksPage';
import Toast from '@/components/Toast';
import { useTheme } from '@/hooks/useTasks';

const THEME_CYCLE: ('warm' | 'paper' | 'ink')[] = ['warm', 'paper', 'ink'];
const THEME_ICON: Record<string, string> = {
  warm: 'ti-moon',
  paper: 'ti-moon-stars',
  ink: 'ti-sun',
};

export default function App() {
  const { theme, setTheme } = useTheme();

  function cycleTheme() {
    const next = THEME_CYCLE[(THEME_CYCLE.indexOf(theme) + 1) % THEME_CYCLE.length];
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  }

  return (
    <div className="min-h-screen bg-(--bg) text-(--ink)">
      <Topbar onToggleTheme={cycleTheme} themeIcon={THEME_ICON[theme]} />

      <main className="px-8 pb-20 pt-2 max-w-225 w-full mx-auto max-[880px]:px-4">
        <TasksPage />
      </main>

      <Toast />
    </div>
  );
}
