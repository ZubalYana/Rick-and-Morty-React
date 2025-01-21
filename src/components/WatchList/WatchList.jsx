import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WatchList.css';

export default function WatchList() {
  const [episodeName, setEpisodeName] = useState('');
  const [episodeList, setEpisodeList] = useState([]);

  // Load episodes from local storage when the component mounts
  useEffect(() => {
    const storedEpisodes = JSON.parse(localStorage.getItem('episodes')) || [];
    setEpisodeList(storedEpisodes);
  }, []);

  const handleSearch = () => {
    axios
      .get(`https://rickandmortyapi.com/api/episode/?name=${episodeName.replaceAll(' ', '&')}`)
      .then((res) => {
        const newEpisode = res.data.results[0];
        if (newEpisode) {
          const updatedList = [...episodeList, newEpisode];
          setEpisodeList(updatedList);
          localStorage.setItem('episodes', JSON.stringify(updatedList));
        }
      })
      .catch((err) => {
        console.error('Error fetching episode:', err);
      });
  };

  return (
    <div className="WatchList">
      <h1>My Watch List</h1>
      <p>Here is a planner for storing Rick & Morty episodes to watch later.</p>
      <div className="inputContainer">
        <input
          type="text"
          onChange={(e) => setEpisodeName(e.target.value)}
          value={episodeName}
          placeholder="Search for an episode"
        />
        <button onClick={handleSearch}>Add to Watch List</button>
      </div>
      <div className="episodeListContainer">
        {episodeList.map((episode, index) => (
          <div key={index} className="episodeItem">
            <h3>{episode.name}</h3>
            <p>Air Date: {episode.air_date}</p>
            <p>Episode: {episode.episode}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
