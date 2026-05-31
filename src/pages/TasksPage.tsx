import { useAppStore } from '@/store/useAppStore';
import TaskCard from '@/components/Task/TaskCard';

export default function TasksPage() {
  const currentPage = useAppStore((s) => s.currentPage);
  const tasks = useAppStore((s) => s.tasks);

  const titles: Record<string, string> = {
    today: 'งานวันนี้',
    all: 'งานทั้งหมด',
    urgent: 'งานด่วน',
  };

  return (
    <div>
      <h1 className="text-3xl font-medium text-(--ink) mb-1">{titles[currentPage] || 'งาน'}</h1>
      <p className="text-sm text-(--ink-3) mb-6">{tasks.length} งาน · preview TKT-202</p>

      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
