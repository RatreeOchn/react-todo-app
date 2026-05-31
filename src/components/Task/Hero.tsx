import { useCurrentPage } from '@/hooks/useTasks';

function getGreeting(): { text: string; icon: string } {
  const hour = new Date().getHours();
  if (hour < 12) return { text: 'สวัสดีตอนเช้า', icon: 'ti-coffee' };
  if (hour < 17) return { text: 'สวัสดีตอนบ่าย', icon: 'ti-sun' };
  if (hour < 21) return { text: 'สวัสดีตอนเย็น', icon: 'ti-sunset' };
  return { text: 'ราตรีสวัสดิ์', icon: 'ti-moon' };
}

const PAGE_TITLES: Record<string, string> = {
  today: 'วันนี้',
  all: 'งานทั้งหมด',
  urgent: 'งานด่วน',
};

const PAGE_ICONS: Record<string, string> = {
  today: '',
  all: 'ti-list-check',
  urgent: 'ti-flame',
};

export default function Hero() {
  const { currentPage } = useCurrentPage();
  const greeting = getGreeting();

  const title = PAGE_TITLES[currentPage] || 'วันนี้';
  const icon = PAGE_ICONS[currentPage] || greeting.icon;
  const showGreeting = currentPage === 'today';

  return (
    <div className="mb-6">
      <h1 className="text-4xl font-medium tracking-tight leading-[1.1] flex items-center gap-3">
        <span>{title}</span>
        <span
          className={[
            'text-[28px]',
            currentPage === 'urgent' ? 'text-(--urgent)' : 'text-(--warn)',
          ].join(' ')}
        >
          <i className={`ti ${icon}`} />
        </span>
      </h1>
      {showGreeting && <div className="text-xs text-(--ink-3) mb-1.5">{greeting.text}</div>}
    </div>
  );
}
