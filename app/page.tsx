"use client"
import React, { useState, useEffect, ChangeEvent } from 'react';
import styles from './page.module.css';

interface HomeProps {}

export default function Home(props: HomeProps) {
  const [name, setName] = useState<string>('');
  const [list, setList] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  useEffect(() => {
    const existingList = localStorage.getItem('list');
    if (existingList) {
      setList(existingList.split(','));
    }
  }, []);

  const InputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const AddClick = () => {
    if (selectedItem !== null) {
      const updatedList = [...list];
      updatedList[selectedItem] = name;
      localStorage.setItem('list', updatedList.join(','));
      setSelectedItem(null);
    } else {
      const updatedList = [...list, name];
      localStorage.setItem('list', updatedList.join(','));
    }
    setName('');
  };

  const EditClick = (index: number) => {
    setName(list[index]);
    setSelectedItem(index);
  };

  const DeleteClick = (index: number) => {
    const updatedList = [...list];
    updatedList.splice(index, 1);
    localStorage.setItem('list', updatedList.join(','));
    if (index === selectedItem) {
      setName('');
      setSelectedItem(null);
    }
  };

  return (
    <main className={styles.main}>
      <input
        type="text"
        value={name}
        onChange={InputChange}
      />
      <button onClick={AddClick}>{selectedItem !== null ? 'Update' : 'Add'}</button>
      
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => EditClick(index)}>Edit</button>
            <button onClick={() => DeleteClick(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
