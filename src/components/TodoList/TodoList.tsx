import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props {
  todos: Todo[];
  tempTodo: Todo | null;
  onDelete: (id: number) => void;
  loadingTodoId: number | null;
}

export const TodoList: React.FC<Props> = ({
  todos,
  tempTodo,
  onDelete,
  loadingTodoId,
}) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => {
      const todoId = `todo-status-${todo.id}`;

      return (
        <TodoItem
          key={todoId}
          todo={todo}
          onDelete={onDelete}
          isLoader={loadingTodoId === todo.id}
        />
      );
    })}

    {tempTodo && <TodoItem todo={tempTodo} isLoader={true} />}
  </section>
);
