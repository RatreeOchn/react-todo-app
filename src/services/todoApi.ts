import type {
  Task,
  NewTaskInput,
  UpdateTaskInput,
  Subtask,
  NewSubtaskInput,
  UpdateSubtaskInput,
} from '@/types/task';

const BASE_URL = '/api';

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || `Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const todoApi = {
  list: () => request<Task[]>(`${BASE_URL}/tasks`),

  create: (input: NewTaskInput) =>
    request<Task>(`${BASE_URL}/tasks`, {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  update: (id: string, patch: UpdateTaskInput) =>
    request<Task>(`${BASE_URL}/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(patch),
    }),

  remove: (id: string) =>
    request<{ success: boolean }>(`${BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    }),

  createSubtask: (taskId: string, input: NewSubtaskInput) =>
    request<Subtask>(`${BASE_URL}/tasks/${taskId}/subtasks`, {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  updateSubtask: (taskId: string, subId: string, patch: UpdateSubtaskInput) =>
    request<Subtask>(`${BASE_URL}/tasks/${taskId}/subtasks/${subId}`, {
      method: 'PATCH',
      body: JSON.stringify(patch),
    }),

  removeSubtask: (taskId: string, subId: string) =>
    request<{ success: boolean }>(`${BASE_URL}/tasks/${taskId}/subtasks/${subId}`, {
      method: 'DELETE',
    }),
};
