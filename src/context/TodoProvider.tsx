import { useReducer, type ReactNode } from 'react';
import { TodoContext, todoReducer, initialState } from './todoContext';

export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return <TodoContext.Provider value={{ state, dispatch }}>{children}</TodoContext.Provider>;
}
