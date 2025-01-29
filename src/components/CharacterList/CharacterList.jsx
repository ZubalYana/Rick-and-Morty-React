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

  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);

  useEffect(() => {
    fetchFilters();
    fetchCharacters(currentPage);
  }, [currentPage, filters]);

  // Fetch all pages to get complete filter options
  const fetchFilters = async () => {
    try {
      let allSpecies = new Set();
      let allStatus = new Set();
      let allGenders = new Set();
      let page = 1;
      let nextPage = true;

      while (nextPage) {
        const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
        response.data.results.forEach((char) => {
          allSpecies.add(char.species);
          allStatus.add(char.status);
          allGenders.add(char.gender);
        });

        if (response.data.info.next) {
          page++;
        } else {
          nextPage = false;
        }
      }

      setSpeciesOptions(Array.from(allSpecies));
      setStatusOptions(Array.from(allStatus));
      setGenderOptions(Array.from(allGenders));
    } catch (error) {
      console.log("Error fetching filters:", error);
    }
  };

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
          {speciesOptions.map((species) => (
            <option key={species} value={species}>
              {species}
            </option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          value={filters.gender}
          onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
        >
          <option value="">All Genders</option>
          {genderOptions.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
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
