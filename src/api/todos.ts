import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3603;
const url: string = `/todos?userId=${USER_ID}`;

export const getTodos = () => {
  return client.get<Todo[]>(url);
};

// Add more methods here
export const postTodo = (data: Omit<Todo, 'id'>) => {
  return client.post(url, data);
};

export const deleteTodos = (id: number) => {
  return client.delete(`/todos/${id}`);
};
