import React, { useState, useEffect } from 'react';
import './LocationsList.css';
import axios from 'axios';

export default function LocationsList() {
  const [locations, setLocations] = useState([]);

  function fetchLocations() {
    axios
      .get('https://rickandmortyapi.com/api/location')
      .then((response) => {
        console.log('API response:', response.data.results);
        setLocations(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching locations:', error);
      });
  }

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div>
      <h1>Locations List</h1>
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
              <td>{index + 1}</td>
              <td>{location.name}</td>
              <td>{location.type}</td>
              <td>{location.dimension}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
