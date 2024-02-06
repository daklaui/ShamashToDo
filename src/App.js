import React, { useState } from 'react';

const TaskHistoryItem = ({ message, onEdit, onDelete }) => (
  <li style={{ marginBottom: '10px' }}>
    {message}
    <button style={{ marginLeft: '10px' ,backgroundColor: 'green', color: 'white' }} onClick={onEdit}>Modifier</button>
    <button style={{ marginLeft: '10px' , backgroundColor: 'red', color: 'white'}} onClick={onDelete}>Supprimer</button>
  </li>
);

const App = () => {
  const storedHistory = localStorage.getItem('TaskHistory');
  const initialHistory = storedHistory ? JSON.parse(storedHistory) : [];
  
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState(initialHistory);
  
  const handleMessageSend = () => {
    if (inputValue.trim() !== '') {
      const newHistory = [...history, inputValue];
      setHistory(newHistory);
      localStorage.setItem('TaskHistory', JSON.stringify(newHistory));
      setInputValue('');
    }
  };
  
  const handleEditMessage = (index) => {
    const newMessage = prompt('Modifier la tache :', history[index]);
    if (newMessage !== null) {
      const updatedHistory = [...history];
      updatedHistory[index] = newMessage;
      setHistory(updatedHistory);
      localStorage.setItem('TaskHistory', JSON.stringify(updatedHistory));
    }
  };
  
  const handleDeleteMessage = (index) => {
    const updatedHistory = [...history];
    updatedHistory.splice(index, 1);
    setHistory(updatedHistory);
    localStorage.setItem('TaskHistory', JSON.stringify(updatedHistory));
  };
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#3498db' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
         <div style={{ marginTop: '20px' }}>
          <h1>Tasks To do </h1>
          </div>
        <input 
          type="text" 
          value={inputValue} 
          onChange={e => setInputValue(e.target.value)} 
          placeholder="Entrez votre tache a faire" 
          style={{ height: '40px', borderColor: 'gray', borderWidth: '1px', marginBottom: '10px', paddingHorizontal: '10px' }}
        />
        <button style={{marginLeft: '10px', backgroundColor: 'blue', color: 'white' }} onClick={handleMessageSend}>Envoyer</button>
  
        <div style={{ marginTop: '20px' }}>
          <h2>Historique des Taches :</h2>
          <ul>
            {history.map((message, index) => (
              <TaskHistoryItem 
                key={index} 
                message={message} 
                onEdit={() => handleEditMessage(index)} 
                onDelete={() => handleDeleteMessage(index)} 
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
