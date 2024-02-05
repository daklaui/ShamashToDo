
import React from 'react';
import { useAppContext } from './AppContext';
import './App.css';

const App = () => {
  const { inputValue, setInputValue, items, addItem, editItem, deleteItem } =
    useAppContext();

  const handleEdit = (id) => {
    const newContent = prompt('Enter new content:');
    if (newContent !== null) {
      editItem(id, newContent);
    }
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      deleteItem(id);
    }
  };

  return (
    <div className="container">
      <h1>Simple React App</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={addItem}>Add to Local Storage</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.content}
            <button onClick={() => handleEdit(item.id)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
