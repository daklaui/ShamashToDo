import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AppContext = createContext();

const useLocalStorage = (key, initialValue) => {
  const storedValue = JSON.parse(localStorage.getItem(key)) || initialValue;

  const [value, setValue] = useState(storedValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

const AppProvider = ({ children }) => {
  const [inputValue, setInputValue] = useLocalStorage('inputValue', '');
  const [items, setItems] = useLocalStorage('items', []);

  const addItem = () => {
    if (inputValue.trim() !== '') {
      setItems((prevItems) => [
        ...prevItems,
        { id: uuidv4(), content: inputValue },
      ]);
      setInputValue('');
    }
  };

  const editItem = (id, newContent) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, content: newContent } : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <AppContext.Provider
      value={{ inputValue, setInputValue, items, addItem, editItem, deleteItem }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
