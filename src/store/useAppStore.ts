import { create } from 'zustand';

export type PageId = 'today' | 'all' | 'urgent' | 'shopping' | 'settings';

interface AppState {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentPage: 'today',
  setCurrentPage: (page) => set({ currentPage: page }),
}));
