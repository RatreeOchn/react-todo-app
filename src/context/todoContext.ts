import { createContext, type Dispatch } from 'react';
import type { Task } from '@/types/task';

export type PageId = 'today' | 'all' | 'urgent' | 'shopping' | 'settings';

export type ThemeId = 'warm' | 'paper' | 'ink';

export interface ToastItem {
  id: string;
  message: string;
  icon?: string;
}

export interface TodoState {
  currentPage: PageId;
  tasks: Task[];
  tasksLoading: boolean;
  tasksError: string | null;
  theme: ThemeId;
  toasts: ToastItem[];
}

export type TodoAction =
  | { type: 'SET_PAGE'; payload: PageId }
  | { type: 'TASKS_LOADING' }
  | { type: 'TASKS_SUCCESS'; payload: Task[] }
  | { type: 'TASKS_ERROR'; payload: string }
  | { type: 'TASK_ADDED'; payload: Task }
  | { type: 'TASK_UPDATED'; payload: { id: string; patch: Partial<Task> } }
  | { type: 'TASK_REMOVED'; payload: string }
  | { type: 'SET_THEME'; payload: ThemeId }
  | { type: 'TOAST_SHOW'; payload: ToastItem }
  | { type: 'TOAST_DISMISS'; payload: string };

export const initialState: TodoState = {
  currentPage: 'today',
  tasks: [],
  tasksLoading: false,
  tasksError: null,
  theme: 'warm',
  toasts: [],
};

export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };

    case 'TASKS_LOADING':
      return { ...state, tasksLoading: true, tasksError: null };

    case 'TASKS_SUCCESS':
      return {
        ...state,
        tasks: action.payload,
        tasksLoading: false,
        tasksError: null,
      };

    case 'TASKS_ERROR':
      return { ...state, tasksLoading: false, tasksError: action.payload };

    case 'TASK_ADDED':
      return { ...state, tasks: [action.payload, ...state.tasks] };

    case 'TASK_UPDATED':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload.patch } : t,
        ),
      };

    case 'TASK_REMOVED':
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };

    case 'SET_THEME':
      return { ...state, theme: action.payload };

    case 'TOAST_SHOW':
      return { ...state, toasts: [...state.toasts, action.payload] };

    case 'TOAST_DISMISS':
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.payload),
      };

    default:
      return state;
  }
}

export interface TodoContextValue {
  state: TodoState;
  dispatch: Dispatch<TodoAction>;
}

export const TodoContext = createContext<TodoContextValue | undefined>(undefined);
