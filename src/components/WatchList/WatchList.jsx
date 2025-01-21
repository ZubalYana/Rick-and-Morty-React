import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WatchList.css';

export default function WatchList() {
  const [episodeName, setEpisodeName] = useState('');
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const storedEpisodes = JSON.parse(localStorage.getItem('episodes')) || [];
    setEpisodes(storedEpisodes);
  }, []);

  const handleSearch = () => {
    axios
      .get(`https://rickandmortyapi.com/api/episode/?name=${episodeName.replaceAll(' ', '&')}`)
      .then((res) => {
        const newEpisode = { ...res.data.results[0], seen: false }; 
        if (newEpisode) {
          const updatedList = [...episodes, newEpisode];
          setEpisodes(updatedList);
          localStorage.setItem('episodes', JSON.stringify(updatedList));
        }
      })
      .catch((err) => {
        console.error('Error fetching episode:', err);
      });
  };

  const toggleSeenStatus = (index) => {
    const updatedEpisodes = episodes.map((episode, i) =>
      i === index ? { ...episode, seen: !episode.seen } : episode
    );
    setEpisodes(updatedEpisodes);
    localStorage.setItem('episodes', JSON.stringify(updatedEpisodes));
  };

  return (
    <div className="WatchList">
      <h1>My Watch List</h1>
      <p>Manage your Rick & Morty episodes to watch later.</p>
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
        <h2>Unseen Episodes</h2>
        {episodes.filter((episode) => !episode.seen).map((episode, index) => (
          <div key={index} className="episodeItem">
            <h3>{episode.name}</h3>
            <p>Air Date: {episode.air_date}</p>
            <p>Episode: {episode.episode}</p>
            <button onClick={() => toggleSeenStatus(index)}>Mark as Seen</button>
          </div>
        ))}

        <h2>Seen Episodes</h2>
        {episodes.filter((episode) => episode.seen).map((episode, index) => (
          <div key={index} className="episodeItem">
            <h3>{episode.name}</h3>
            <p>Air Date: {episode.air_date}</p>
            <p>Episode: {episode.episode}</p>
            <button onClick={() => toggleSeenStatus(index)}>Mark as Unseen</button>
          </div>
        ))}
      </div>
    </div>
  );
}
