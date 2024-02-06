import React, { useState, useEffect } from 'react';
import './AddInput.css';

const AddInput = () => {
  const [nom, setNom] = useState('');
  const [listeNoms, setListeNoms] = useState([]);
  const [nomAEditer, setNomAEditer] = useState(null);

  useEffect(() => {
    const nomsEnregistres = localStorage.getItem('listeNoms');
    if (nomsEnregistres) {
      setListeNoms(JSON.parse(nomsEnregistres));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('listeNoms', JSON.stringify(listeNoms));
  }, [listeNoms]);

  const handleAjouterNom = () => {
    if (nom.trim() !== '') {
      if (nomAEditer !== null) {
        // Modifier le nom existant
        const nouvelleListe = listeNoms.map((ancienNom, index) =>
          index === nomAEditer ? nom : ancienNom
        );
        setListeNoms(nouvelleListe);
        setNomAEditer(null);
      } else {
        // Ajouter un nouveau nom
        setListeNoms([...listeNoms, nom]);
      }
      setNom('');
    }
  };

  const handleModifierNom = (index) => {
    // Charger le nom dans l'input pour la modification
    setNom(listeNoms[index]);
    setNomAEditer(index);
  };

  const handleSupprimerNom = (index) => {
    // Supprimer le nom de la liste
    const nouvelleListe = [...listeNoms];
    nouvelleListe.splice(index, 1);
    setListeNoms(nouvelleListe);
  };

  return (
    <div>
      <h1>Ajouter le texte ici !</h1>
    
    <div className="container">
      <input
        type="text"
        className="inputCentered"
        placeholder="Entrez un nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      />
      <button onClick={handleAjouterNom}>{nomAEditer !== null ? 'Modifier' : 'Ajouter'}</button>

      
    </div>
    <ul>
        {listeNoms.map((nom, index) => (
          <li key={index}>
            {nom}
            <button onClick={() => handleModifierNom(index)}>Modifier</button>
            <button onClick={() => handleSupprimerNom(index)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddInput;

