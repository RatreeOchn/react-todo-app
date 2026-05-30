function App() {
  return (
    <div className="min-h-screen p-8">
      <div className="flex items-center gap-1">
        <div
          className="w-13 h-13 rounded-[14px] flex items-center justify-center shrink-0"
          style={{ background: 'var(--surface-dark)' }}
        >
          <span className="text-4xl font-medium text-ink" style={{ color: 'var(--bg)' }}>
            to
          </span>
        </div>

        <h1 className="text-4xl font-medium text-ink">
          do<span className="text-urgent">.</span>
        </h1>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3 max-w-2xl">
        <div className="rounded-2xl bg-surface p-4">
          <div className="text-xs text-ink-3 mb-1">surface</div>
          <div className="text-ink text-sm">card สีหลัก</div>
        </div>
        <div className="rounded-2xl bg-surface-2 p-4">
          <div className="text-xs text-ink-3 mb-1">surface-2</div>
          <div className="text-ink text-sm">card รอง</div>
        </div>
        <div
          className="rounded-2xl p-4"
          style={{ background: 'var(--surface-dark)', color: 'var(--bg)' }}
        >
          <div className="text-xs opacity-60 mb-1">surface-dark</div>
          <div className="text-sm">card เข้ม</div>
        </div>
      </div>

      <div className="mt-4 flex gap-2 flex-wrap">
        <span
          className="text-xs px-3 py-1 rounded-full"
          style={{ background: 'var(--urgent-soft)', color: 'var(--urgent)' }}
        >
          <i className="ti ti-flame" /> urgent
        </span>
        <span
          className="text-xs px-3 py-1 rounded-full"
          style={{ background: 'var(--warn-soft)', color: 'var(--warn)' }}
        >
          <i className="ti ti-flag" /> warn
        </span>
        <span
          className="text-xs px-3 py-1 rounded-full"
          style={{ background: 'var(--ok-soft)', color: 'var(--ok)' }}
        >
          <i className="ti ti-check" /> ok
        </span>
      </div>

      <div className="mt-6 flex gap-2">
        <button
          onClick={() => document.documentElement.setAttribute('data-theme', 'warm')}
          className="px-3 py-1.5 text-sm rounded-lg bg-surface"
        >
          Warm
        </button>
        <button
          onClick={() => document.documentElement.setAttribute('data-theme', 'paper')}
          className="px-3 py-1.5 text-sm rounded-lg bg-surface"
        >
          Paper
        </button>
        <button
          onClick={() => document.documentElement.setAttribute('data-theme', 'ink')}
          className="px-3 py-1.5 text-sm rounded-lg bg-surface"
        >
          Ink
        </button>
      </div>
    </div>
  );
}

export default App;
