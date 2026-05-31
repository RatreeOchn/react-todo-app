import { useTodoContext } from '@/context/useTodoContext';

export function useTasks() {
  const { state } = useTodoContext();

  return {
    tasks: state.tasks,
    loading: state.tasksLoading,
    error: state.tasksError,
  };
}

export function useCurrentPage() {
  const { state, dispatch } = useTodoContext();

  return {
    currentPage: state.currentPage,
    setCurrentPage: (page: typeof state.currentPage) =>
      dispatch({ type: 'SET_PAGE', payload: page }),
  };
}

export function useTheme() {
  const { state, dispatch } = useTodoContext();

  return {
    theme: state.theme,
    setTheme: (theme: typeof state.theme) => dispatch({ type: 'SET_THEME', payload: theme }),
  };
}

export function useToasts() {
  const { state, dispatch } = useTodoContext();

  return {
    toasts: state.toasts,
    dismissToast: (id: string) => dispatch({ type: 'TOAST_DISMISS', payload: id }),
  };
}
