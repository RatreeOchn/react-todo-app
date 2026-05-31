export type PriorityId = 'urgent' | 'warn' | 'ok';

export interface Task {
  id: string;
  title: string;
  done: boolean;
  priority?: PriorityId | null;
  remindIn?: number | null;
  note?: string | null;
  created: number;
}

export type NewTaskInput = {
  title: string;
  priority?: PriorityId | null;
  remindIn?: number | null;
  note?: string | null;
};

export type UpdateTaskInput = Partial<Omit<Task, 'id' | 'created'>>;
