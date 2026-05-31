import { useMemo } from 'react';
import { useTasks, useCurrentPage } from '@/hooks/useTasks';
import { useFetchTasks } from '@/hooks/useFetchTasks';
import TaskCard from '@/components/Task/TaskCard';
import EmptyState from '@/components/EmptyState';
import ErrorState from '@/components/ErrorState';
import Hero from '@/components/Task/Hero';
import QuickAdd from '@/components/Task/QuickAdd';
import TaskListSkeleton from '@/components/Task/TaskListSkeleton';

export default function TasksPage() {
  const { currentPage } = useCurrentPage();
  const { tasks, loading, error } = useTasks();
  const { refetch } = useFetchTasks();

  const filteredTasks = useMemo(() => {
    if (currentPage === 'urgent') {
      return tasks.filter((t) => t.priority === 'urgent' && !t.done);
    }
    return tasks;
  }, [tasks, currentPage]);

  const activeCount = filteredTasks.filter((t) => !t.done).length;
  const doneCount = filteredTasks.filter((t) => t.done).length;

  return (
    <div>
      <Hero />

      {currentPage !== 'urgent' && <QuickAdd />}

      {loading && <TaskListSkeleton />}

      {!loading && error && <ErrorState message={error} onRetry={refetch} />}

      {!loading && !error && (
        <>
          {filteredTasks.length === 0 ? (
            renderEmptyState(currentPage)
          ) : (
            <>
              <div className="text-[13px] text-(--ink-3) mb-4">
                {currentPage === 'urgent' ? (
                  <>{filteredTasks.length} งานด่วน</>
                ) : (
                  <>
                    {activeCount} งาน · {doneCount} เสร็จแล้ว
                  </>
                )}
              </div>

              <div className="flex flex-col gap-2">
                {filteredTasks.map((task) => (
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

function renderEmptyState(currentPage: string) {
  if (currentPage === 'urgent') {
    return (
      <EmptyState
        icon="ti-flame-off"
        title="ไม่มีงานด่วน"
        description="สบายใจได้ ทุกอย่างยังพอมีเวลา"
      />
    );
  }
  if (currentPage === 'all') {
    return (
      <EmptyState
        icon="ti-list-check"
        title="ยังไม่มีงานในระบบ"
        description="เริ่มเพิ่มงานแรกของคุณได้เลย"
      />
    );
  }
  return (
    <EmptyState
      icon="ti-confetti"
      title="ว่างทั้งวันเลย"
      description="เพิ่มงานสักอย่างไหม? หรือพักผ่อนสักวันก็ดีนะ"
    />
  );
}
