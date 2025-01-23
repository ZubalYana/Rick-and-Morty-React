import React, { useState, useEffect } from 'react';
import './LocationsList.css';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function LocationsList() {
  const [locations, setLocations] = useState([]);
  const [pageInfo, setPageInfo] = useState({ next: null, prev: null, pages: 0 });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const [filters, setFilters] = useState({
    name: '',
    type: '',
    dimension: '',
  });

  useEffect(() => {
    fetchLocations(currentPage);
  }, [currentPage, filters]);

  function fetchLocations(page) {
    const params = new URLSearchParams({
      page,
      name: filters.name,
      type: filters.type,
      dimension: filters.dimension,
    });

    axios
      .get(`https://rickandmortyapi.com/api/location?${params.toString()}`)
      .then((response) => {
        setLocations(response.data.results);
        setPageInfo({
          next: response.data.info.next,
          prev: response.data.info.prev,
          pages: response.data.info.pages,
        });
      })
      .catch((error) => {
        console.error('Error fetching locations:', error);
      });
  }

  const handlePageChange = (page) => {
    navigate(`/locations?page=${page}`);
  };

  return (
    <div>
      <h2 className="screenTitle">Locations List</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Search by type"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        />
        <input
          type="text"
          placeholder="Search by dimension"
          value={filters.dimension}
          onChange={(e) => setFilters({ ...filters, dimension: e.target.value })}
        />
      </div>
      
      <div className="locationsTableWrapper">
      <table className="locationsTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Dimension</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location, index) => (
            <tr key={location.id}>
              <td>{index + 1 + (currentPage - 1) * 20}</td>
              <td>{location.name}</td>
              <td>{location.type}</td>
              <td>{location.dimension}</td>
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
