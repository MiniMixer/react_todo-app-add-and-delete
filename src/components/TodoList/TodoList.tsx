import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props {
  todos: Todo[];
  tempTodo: Todo | null;
  onDelete: (id: number) => void;
}

export const TodoList: React.FC<Props> = ({ todos, tempTodo, onDelete }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => {
      const todoId = `todo-status-${todo.id}`;

      return <TodoItem key={todoId} todo={todo} onDelete={onDelete} />;
    })}

    {tempTodo && <TodoItem todo={tempTodo} isLoader={true} />}
  </section>
);
