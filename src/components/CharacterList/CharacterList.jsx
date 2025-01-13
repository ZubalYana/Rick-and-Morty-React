import React, { useState, useEffect } from 'react';
import './CharacterList.css';
import axios from 'axios';
import Character from '../Character/Character';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [characterInfo, setCharacterInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCharacters = (page) => {
    axios
      .get(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((response) => {
        setCharacters(response.data.results);
        setTotalPages(response.data.info.pages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const getCharacterInfo = (id) => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => {
        setCharacterInfo(response.data);
        setIsOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="characterList">


      {characters.map((character) => (
        <Character
          key={character.id}
          id={character.id}
          name={character.name}
          species={character.species}
          image={character.image}
          onClick={() => getCharacterInfo(character.id)}
        />
      ))}

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          content: {
            position: 'static',
            inset: 'unset',
            width: '600px',
            height: '400px',
            borderRadius: '10px',
            padding: '20px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <h2>{characterInfo.name}</h2>
        <img src={characterInfo.image} alt={characterInfo.name} style={{ width: '200px' }} />
        <p>Status: {characterInfo.status}</p>
        <p>Species: {characterInfo.species}</p>
        <p>Gender: {characterInfo.gender}</p>
        <p>Origin: {characterInfo.origin?.name}</p>
      </Modal>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span style={{color: '#f6f6f6'}}>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
