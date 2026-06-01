# Todo · React + TypeScript

A minimalist task manager with nested subtasks, progress tracking, and three themes. Built with React Functional Components, TypeScript, and React Context API. Connected to a mock REST API via MSW.

---

## What it does

- Add / edit / delete / toggle done on daily tasks
- Nested subtasks within a task, with progress bar (x/y and %)
- Three themes: Warm / Paper / Ink (light / sepia / dark)
- Loading skeleton on fetch + error state with retry button
- Optimistic UI — instant feedback, rolls back on error
- Toast notifications for every mutation

---

## Getting started

Requires Node.js 18+ and npm 9+.

```bash
# 1. Clone the repo
git clone https://github.com/RatreeOchn/react-todo-app.git
cd react-todo-app

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

Open `http://localhost:5173`.

> The MSW service worker is bundled with the repo — no extra setup needed.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

---

## Tech stack

- **React 19 + Vite** — framework and build tooling
- **TypeScript** — type safety
- **Tailwind CSS v4** — styling with CSS variables for theming
- **React Context + useReducer** — state management (per spec)
- **MSW (Mock Service Worker)** — mock REST API at the network layer; visible in DevTools
- **Tabler Icons** — icon set

---

## Author

Built by **ratree** ([ratree.ochn@gmail.com](mailto:ratree.ochn@gmail.com))