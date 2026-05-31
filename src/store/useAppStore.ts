import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, NewTaskInput } from '@/types/task';
import { uid } from '@/utils/id';

export type PageId = 'today' | 'all' | 'urgent' | 'shopping' | 'settings';

interface AppState {
  // navigation
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;

  // tasks
  tasks: Task[];
  addTask: (input: NewTaskInput) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
}

// seed data
const seedTasks: Task[] = [
  {
    id: 'seed-1',
    title: 'ปิดน้ำในห้องน้ำ',
    priority: 'urgent',
    done: false,
    remindIn: 5,
    created: Date.now() - 3000,
  },
  {
    id: 'seed-2',
    title: 'ตากผ้า',
    done: false,
    remindIn: 15,
    note: 'เครื่องปั่นแห้งใกล้เสร็จ',
    created: Date.now() - 2000,
  },
  {
    id: 'seed-3',
    title: 'ซื้อนม',
    priority: 'warn',
    done: false,
    created: Date.now() - 1000,
  },
  {
    id: 'seed-4',
    title: 'รดน้ำต้นไม้',
    done: true,
    created: Date.now() - 500,
  },
];

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentPage: 'today',
      setCurrentPage: (page) => set({ currentPage: page }),

      tasks: seedTasks,

      addTask: (input) =>
        set((state) => ({
          tasks: [
            {
              id: uid(),
              title: input.title.trim(),
              done: false,
              priority: input.priority ?? null,
              remindIn: input.remindIn ?? null,
              note: input.note ?? null,
              created: Date.now(),
            },
            ...state.tasks,
          ],
        })),

      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      updateTask: (id, patch) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)),
        })),
    }),
    {
      name: 'todo-app-state',
      version: 2,
    },
  ),
);

if (typeof window !== 'undefined' && import.meta.env.DEV) {
  (window as Window & { useAppStore?: typeof useAppStore }).useAppStore = useAppStore;
}
