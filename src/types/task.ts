export type PriorityId = 'urgent' | 'warn' | 'ok';

export interface Subtask {
  id: string;
  title: string;
  done: boolean;
  order: number;
}

export interface Task {
  id: string;
  title: string;
  done: boolean;
  priority?: PriorityId | null;
  remindIn?: number | null;
  note?: string | null;
  expanded?: boolean;
  subtasks?: Subtask[];
  created: number;
}

export type NewTaskInput = {
  title: string;
  priority?: PriorityId | null;
  remindIn?: number | null;
  note?: string | null;
};

export type UpdateTaskInput = Partial<Omit<Task, 'id' | 'created'>>;

export type NewSubtaskInput = {
  title: string;
};

export type UpdateSubtaskInput = Partial<Omit<Subtask, 'id'>>;
