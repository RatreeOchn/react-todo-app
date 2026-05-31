export type PriorityId = 'urgent' | 'warn' | 'ok';

export interface Task {
  id: string;
  title: string;
  done: boolean;
  priority?: PriorityId | null;
  remindIn?: number | null;
  note?: string | null;
  expanded?: boolean;
  created: number;
}

export type NewTaskInput = Omit<Task, 'id' | 'done' | 'created'>;
