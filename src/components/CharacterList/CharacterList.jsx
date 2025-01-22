import React, { useState, useEffect } from 'react';
import './CharacterList.css';
import axios from 'axios';
import Character from '../Character/Character';
import Modal from 'react-modal';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
Modal.setAppElement('#root');

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [characterInfo, setCharacterInfo] = useState({});
  const [pageInfo, setPageInfo] = useState({ next: null, prev: null, pages: 0 });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const [filters, setFilters] = useState({
    species: '',
    status: '',
    gender: '',
  });
  
  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage, filters]);
  

  const fetchCharacters = (page) => {
    const params = new URLSearchParams({
      page,
      species: filters.species,
      status: filters.status,
      gender: filters.gender,
    });
  
    axios
      .get(`https://rickandmortyapi.com/api/character?${params.toString()}`)
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
      <div className="filters">
        <select
          value={filters.species}
          onChange={(e) => setFilters({ ...filters, species: e.target.value })}
        >
          <option value="">All Species</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
        </select>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <select
          value={filters.gender}
          onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <div className="charactersCon">
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
            height: '320px',
            borderRadius: '10px',
            padding: '20px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <h2 className='modalTitle'>{characterInfo.name}</h2>
        <div className="modal_content">
        <img className='modalImage' src={characterInfo.image} alt={characterInfo.name} />
        <div className="modalText">
        <p>Status: <span style={{ color: characterInfo.status === 'Alive' ? 'green' : 'red', fontWeight: 600 }}>{characterInfo.status}</span></p>
        <p>Species: <span style={{ fontWeight: 600 }}>{characterInfo.species}</span></p>
        <p>Gender: <span style={{ fontWeight: 600 }}>{characterInfo.gender}</span></p>
        <p>Origin: <span style={{ fontWeight: 600 }}>{characterInfo.origin?.name}</span></p>
        </div>
        </div>
      </Modal>
      </div>

      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={!pageInfo.prev}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span style={{ color: '#f6f6f6' }}>
          {currentPage}/{pageInfo.pages}
        </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={!pageInfo.next}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}
