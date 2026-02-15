/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { deleteTodos, getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { FilterMethods } from './types/FilterMethods';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [filteringMethod, setFilteringMethod] = useState<FilterMethods>('All');

  const loadTodos = () => {
    return getTodos()
      .then(setTodosFromServer)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const visibleTodos = useMemo(() => {
    switch (filteringMethod) {
      case 'Active':
        return todosFromServer.filter(todo => !todo.completed);
      case 'Completed':
        return todosFromServer.filter(todo => todo.completed);
      case 'All':
      default:
        return todosFromServer;
    }
  }, [todosFromServer, filteringMethod]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const deleteTodo = (currentId: number) => {
    deleteTodos(currentId)
      .then(loadTodos)
      .catch(() => {
        setErrorMessage('Unable to delete a todo');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          setErrorMessage={setErrorMessage}
          setTempTodo={setTempTodo}
          loadTodos={loadTodos}
        />

        <TodoList
          tempTodo={tempTodo}
          todos={visibleTodos}
          onDelete={deleteTodo}
        />

        {/* Hide the footer if there are no todos */}
        <Footer
          todos={todosFromServer}
          filteringMethod={filteringMethod}
          setFilteringMethod={setFilteringMethod}
        />
      </div>
      <ErrorNotification errorMessage={errorMessage} />
    </div>
  );
};
