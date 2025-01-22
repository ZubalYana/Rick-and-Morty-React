import React, { useState, useEffect } from 'react';
import './EpisodesList.css';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
export default function EpisodesList() {
  const [episodes, setEpisodes] = useState([]);
  const [pageInfo, setPageInfo] = useState({ next: null, prev: null, pages: 0 });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    fetchEpisodes(currentPage);
  }, [currentPage]);

  function fetchEpisodes(page) {
    axios
      .get(`https://rickandmortyapi.com/api/episode?page=${page}`)
      .then((response) => {
        console.log('API response:', response.data);
        setEpisodes(response.data.results);
        setPageInfo({
          next: response.data.info.next,
          prev: response.data.info.prev,
          pages: response.data.info.pages,
        });
      })
      .catch((error) => {
        console.error('Error fetching episodes:', error);
      });
  }

  const handlePageChange = (page) => {
    navigate(`/episodes?page=${page}`);
  };

  return (
    <div className='EpisodesList'>
      <h1>Episodes List</h1>
      <table className="episodesTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Episode Code</th>
            <th>Air Date</th>
          </tr>
        </thead>
        <tbody>
          {episodes.map((episode, index) => (
            <tr key={episode.id}>
              <td>{index + 1 + (currentPage - 1) * 20}</td>
              <td>{episode.name}</td>
              <td>{episode.episode}</td>
              <td>{episode.air_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!pageInfo.prev}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span>{currentPage}/{pageInfo.pages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!pageInfo.next}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}
