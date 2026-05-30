import { useAppStore } from '@/store/useAppStore';

export default function TasksPage() {
  const currentPage = useAppStore((s) => s.currentPage);

  const titles: Record<string, string> = {
    today: 'งานวันนี้',
    all: 'งานทั้งหมด',
    urgent: 'งานด่วน',
  };

  return (
    <div>
      <h1 className="text-3xl font-medium text-ink mb-1">{titles[currentPage] || 'งาน'}</h1>
      <p className="text-sm text-ink-3">หน้านี้ยังว่าง</p>
    </div>
  );
}
