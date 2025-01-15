import React, { useState, useEffect } from 'react';
import './EpisodesList.css';
import axios from 'axios';

export default function EpisodesList() {
  const [episodes, setEpisodes] = useState([]);

  function fetchEpisodes() {
    axios
      .get('https://rickandmortyapi.com/api/episode')
      .then((response) => {
        console.log('API response:', response.data.results);
        setEpisodes(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching episodes:', error);
      });
  }

  useEffect(() => {
    fetchEpisodes();
  }, []);

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
              <td>{index + 1}</td>
              <td>{episode.name}</td>
              <td>{episode.episode}</td>
              <td>{episode.air_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
