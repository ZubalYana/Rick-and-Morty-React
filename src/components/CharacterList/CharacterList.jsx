import React, { useState, useEffect } from 'react';
import './CharacterList.css';
import axios from 'axios';
import Character from '../Character/Character';
import Modal from 'react-modal';
import { useSearchParams, useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [characterInfo, setCharacterInfo] = useState({});
  const [pageInfo, setPageInfo] = useState({ next: null, prev: null, pages: 0 });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const fetchCharacters = (page) => {
    axios
      .get(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((response) => {
        setCharacters(response.data.results);
        setPageInfo({
          next: response.data.info.next,
          prev: response.data.info.prev,
          pages: response.data.info.pages,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const handlePageChange = (page) => {
    navigate(`/characters?page=${page}`);
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
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={!pageInfo.prev}>
          Previous
        </button>
        <span style={{ color: '#f6f6f6' }}>
          Page {currentPage} of {pageInfo.pages}
        </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={!pageInfo.next}>
          Next
        </button>
      </div>
    </div>
  );
}
