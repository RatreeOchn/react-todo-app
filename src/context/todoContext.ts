import { createContext, type Dispatch } from 'react';
import type { Task, Subtask } from '@/types/task';

export type ThemeId = 'warm' | 'paper' | 'ink';

export interface ToastItem {
  id: string;
  message: string;
  icon?: string;
}

export interface TodoState {
  tasks: Task[];
  tasksLoading: boolean;
  tasksError: string | null;
  theme: ThemeId;
  toasts: ToastItem[];
}

export type TodoAction =
  | { type: 'TASKS_LOADING' }
  | { type: 'TASKS_SUCCESS'; payload: Task[] }
  | { type: 'TASKS_ERROR'; payload: string }
  | { type: 'TASK_ADDED'; payload: Task }
  | { type: 'TASK_UPDATED'; payload: { id: string; patch: Partial<Task> } }
  | { type: 'TASK_REMOVED'; payload: string }
  | { type: 'SUBTASK_ADDED'; payload: { taskId: string; subtask: Subtask } }
  | {
      type: 'SUBTASK_UPDATED';
      payload: { taskId: string; subId: string; patch: Partial<Subtask> };
    }
  | { type: 'SUBTASK_REMOVED'; payload: { taskId: string; subId: string } }
  | { type: 'SET_THEME'; payload: ThemeId }
  | { type: 'TOAST_SHOW'; payload: ToastItem }
  | { type: 'TOAST_DISMISS'; payload: string };

export const initialState: TodoState = {
  tasks: [],
  tasksLoading: false,
  tasksError: null,
  theme: 'warm',
  toasts: [],
};

export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
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

    case 'SUBTASK_ADDED':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.taskId
            ? {
                ...t,
                subtasks: [...(t.subtasks || []), action.payload.subtask],
              }
            : t,
        ),
      };

    case 'SUBTASK_UPDATED':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.taskId
            ? {
                ...t,
                subtasks: t.subtasks?.map((s) =>
                  s.id === action.payload.subId ? { ...s, ...action.payload.patch } : s,
                ),
              }
            : t,
        ),
      };

    case 'SUBTASK_REMOVED':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.taskId
            ? {
                ...t,
                subtasks: t.subtasks
                  ?.filter((s) => s.id !== action.payload.subId)
                  .map((s, i) => ({ ...s, order: i + 1 })), // re-order
              }
            : t,
        ),
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
