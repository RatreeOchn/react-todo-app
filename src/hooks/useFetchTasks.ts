import { useEffect, useCallback } from 'react';
import { useTodoContext } from '@/context/useTodoContext';
import { todoApi } from '@/services/todoApi';

export function useFetchTasks() {
  const { dispatch } = useTodoContext();

  const fetchTasks = useCallback(async () => {
    dispatch({ type: 'TASKS_LOADING' });
    try {
      const tasks = await todoApi.list();
      dispatch({ type: 'TASKS_SUCCESS', payload: tasks });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'ไม่สามารถเชื่อมต่อ server';
      dispatch({ type: 'TASKS_ERROR', payload: message });
    }
  }, [dispatch]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { refetch: fetchTasks };
}
