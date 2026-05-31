function getGreeting(): { text: string; icon: string } {
  const hour = new Date().getHours();
  if (hour < 12) return { text: 'สวัสดีตอนเช้า', icon: 'ti-coffee' };
  if (hour < 17) return { text: 'สวัสดีตอนบ่าย', icon: 'ti-sun' };
  if (hour < 21) return { text: 'สวัสดีตอนเย็น', icon: 'ti-sunset' };
  return { text: 'ราตรีสวัสดิ์', icon: 'ti-moon' };
}

export default function Hero() {
  const greeting = getGreeting();

  return (
    <div className="mb-6">
      <h1 className="text-4xl font-medium tracking-tight leading-[1.1] flex items-center gap-3">
        <span>วันนี้</span>
        <span className="text-[28px] text-(--warn)">
          <i className={`ti ${greeting.icon}`} />
        </span>
      </h1>
      <div className="text-xs text-(--ink-3) mt-1.5">{greeting.text}</div>
    </div>
  );
}
