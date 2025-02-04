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
  const [filters, setFilters] = useState({
    name: '',
    sortOrder: 'asc', 
  });

  useEffect(() => {
    fetchEpisodes(currentPage);
  }, [currentPage, filters]);

  function fetchEpisodes(page) {
    const params = new URLSearchParams({
      page,
      name: filters.name,
    });

    axios
      .get(`https://rickandmortyapi.com/api/episode?${params.toString()}`)
      .then((response) => {
        const sortedResults = [...response.data.results].sort((a, b) => {
          const dateA = new Date(a.air_date);
          const dateB = new Date(b.air_date);
          return filters.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });

        setEpisodes(sortedResults);
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
    <div className="EpisodesList">
      <h2 className='screenTitle'>Episodes List:</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
        <select
          value={filters.sortOrder}
          onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value })}
          className='episodesDateSelect'
        >
          <option value="asc">Sort by Air Date (Oldest to Newest)</option>
          <option value="desc">Sort by Air Date (Newest to Oldest)</option>
        </select>
      </div>
      <div className="episodesTableWrapper">
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
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!pageInfo.prev}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span>
          {currentPage}/{pageInfo.pages}
        </span>
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
