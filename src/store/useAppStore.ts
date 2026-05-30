import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PageId = 'today' | 'all' | 'urgent' | 'shopping' | 'settings';

interface AppState {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentPage: 'today',
      setCurrentPage: (page) => set({ currentPage: page }),
    }),
    {
      name: 'todo-app-state',
      version: 1,
    },
  ),
);
