import React from 'react';
import { useApi } from './useApi';

const TodoContext = React.createContext();

function TodoProvider({children}) {
    const {
        item: todos,
        saveItem: saveTodos,
        updateItem: updateTodo,
        deleteItem: removeTodo,
        loading,
        error,
      } = useApi();
      const [searchValue, setSearchValue] = React.useState('');
      const [openModal, setOpenModal] = React.useState(false);
    
      const completedTodos = todos.filter(
        todo => !!todo.completed
      ).length;
      const totalTodos = todos.length;
    
      const searchedTodos = todos.filter(
        (todo) => {
          const todoText = todo.title.toLowerCase();
          const searchText = searchValue.toLowerCase();
          return todoText.includes(searchText);
        }
      );
    
      const completeTodo = (id) => {
        const todo = todos.find((todo) => todo.id === id);
        const updatedTodo = { ...todo, completed: true };
        updateTodo(id, updatedTodo);
      };
    
      const deleteTodo = (id) => {
        removeTodo(id);
      };
    
      const addTodo = (title) => {
        const newTodo = {
          title,
          completed: false,
        };
        saveTodos(newTodo);
      };
  
    return(
        <TodoContext.Provider value={{ 
            loading,
            error,
            completedTodos,
            totalTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            completeTodo,
            deleteTodo,
            openModal,
            setOpenModal,
            addTodo,
         }}>
            {children}
        </TodoContext.Provider>
    );
}

export { TodoContext, TodoProvider };