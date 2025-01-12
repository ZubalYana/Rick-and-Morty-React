import React from 'react';
import './Character.css';

export default function Character({ id, name, species, image, onClick }) {
  return (
    <div className='Character' key={id} onClick={onClick}>
      <img src={image} alt={name} />
      <div className='characterInfo'>
        <p className='characterName'>{name}</p>
        <p className='characterSpecies'>{species}</p>
      </div>
    </div>
  );
}
