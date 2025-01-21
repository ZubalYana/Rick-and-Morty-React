import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WatchList.css';

export default function WatchList() {
  const [episodeName, setEpisodeName] = useState('');
  const [episodes, setEpisodes] = useState([]);
  const [allEpisodes, setAllEpisodes] = useState([]);
  const [showHints, setShowHints] = useState(false);

  useEffect(() => {
    const storedEpisodes = JSON.parse(localStorage.getItem('episodes')) || [];
    setEpisodes(storedEpisodes);
  }, []);

  useEffect(() => {
    axios
      .get('https://rickandmortyapi.com/api/episode')
      .then(async (res) => {
        let episodesList = [...res.data.results];

        let nextPage = res.data.info.next;
        while (nextPage) {
          const nextPageData = await axios.get(nextPage);
          episodesList = [...episodesList, ...nextPageData.data.results];
          nextPage = nextPageData.data.info.next;
        }

        setAllEpisodes(episodesList);
      })
      .catch((err) => {
        console.error('Error fetching all episodes:', err);
      });
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

  const handleHintClick = (name) => {
    setEpisodeName(name);
    setShowHints(false);
  };

  return (
    <div className="WatchList">
      <h1>My Watch List</h1>
      <p>Keep track of your favorite Rick & Morty episodes and create a personalized watchlist to enjoy them at your convenience.</p>
      <div className="inputContainer">
        <input
          className="searchInput"
          type="text"
          onChange={(e) => setEpisodeName(e.target.value)}
          value={episodeName}
          placeholder="Search for an episode"
          onFocus={() => setShowHints(true)}
          onBlur={() => setTimeout(() => setShowHints(false), 200)}
        />
        <button onClick={handleSearch} className='addButton'>Add to Watch List</button>
        {showHints && (
          <div className="hintsContainer">
            {allEpisodes
              .filter((episode) =>
                episode.name.toLowerCase().includes(episodeName.toLowerCase())
              )
              .map((episode) => (
                <div
                  key={episode.id}
                  className="hint"
                  onClick={() => handleHintClick(episode.name)}
                >
                  {episode.name}
                </div>
              ))}
          </div>
        )}
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
