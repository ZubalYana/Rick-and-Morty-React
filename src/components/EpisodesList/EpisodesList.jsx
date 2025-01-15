import React, { useState, useEffect } from 'react';
import './EpisodesList.css';
import axios from 'axios';

export default function EpisodesList() {
  const [episodes, setEpisodes] = useState([]);

  function fetchEpisodes() {
    axios.get('https://rickandmortyapi.com/api/episode')
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
      <ul>
        {episodes.map((episode) => (
          <li key={episode.id}>
            {episode.name} - {episode.episode}
          </li>
        ))}
      </ul>
    </div>
  );
}
