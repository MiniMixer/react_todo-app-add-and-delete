import React, { useEffect, useRef, useState } from 'react';
import { USER_ID, postTodo } from '../../api/todos';
import { Todo } from '../../types/Todo';

interface Props {
  setErrorMessage: (msg: string) => void;
  setTempTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  loadTodos: () => Promise<void>;
}

export const Header: React.FC<Props> = ({
  setErrorMessage,
  setTempTodo,
  loadTodos,
}) => {
  const [tempTitle, setTempTitle] = useState('');
  const [formDisable, setFormDisable] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!formDisable) {
      inputRef.current?.focus();
    }
  }, [formDisable]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = tempTitle.trim();

    if (!trimmedTitle) {
      setErrorMessage('Title should not be empty');
      setTimeout(() => setErrorMessage(''), 3000);

      return;
    }

    setFormDisable(true);
    setTempTodo({
      id: 0,
      userId: USER_ID,
      title: trimmedTitle,
      completed: false,
    });

    try {
      await postTodo({
        userId: USER_ID,
        title: trimmedTitle,
        completed: false,
      });

      setTempTitle('');

      await loadTodos();
    } catch (error) {
      setErrorMessage('Unable to add a todo');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setFormDisable(false);
      setTempTodo(null);
      inputRef.current?.focus();
    }
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}

      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={tempTitle}
          onChange={e => setTempTitle(e.target.value)}
          disabled={formDisable}
        />
      </form>
    </header>
  );
};
