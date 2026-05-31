import { useTasks } from '@/hooks/useTasks';
import { useFetchTasks } from '@/hooks/useFetchTasks';
import TaskCard from '@/components/Task/TaskCard';
import EmptyState from '@/components/EmptyState';
import ErrorState from '@/components/ErrorState';
import Hero from '@/components/Task/Hero';
import QuickAdd from '@/components/Task/QuickAdd';
import TaskListSkeleton from '@/components/Task/TaskListSkeleton';

export default function TasksPage() {
  const { tasks, loading, error } = useTasks();
  const { refetch } = useFetchTasks();

  const activeCount = tasks.filter((t) => !t.done).length;
  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div>
      <Hero />
      <QuickAdd />

      {loading && <TaskListSkeleton />}

      {!loading && error && <ErrorState message={error} onRetry={refetch} />}

      {!loading && !error && (
        <>
          {tasks.length === 0 ? (
            <EmptyState
              icon="ti-confetti"
              title="ว่างทั้งวันเลย"
              description="เพิ่มงานสักอย่างไหม? หรือพักผ่อนสักวันก็ดีนะ"
            />
          ) : (
            <>
              <div className="text-[13px] text-(--ink-3) mb-4">
                {activeCount} งาน · {doneCount} เสร็จแล้ว
              </div>

              <div className="flex flex-col gap-2">
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
