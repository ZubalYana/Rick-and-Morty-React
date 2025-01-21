import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WatchList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function WatchList() {
  const [episodeName, setEpisodeName] = useState('');
  const [episodes, setEpisodes] = useState([]);
  const [allEpisodes, setAllEpisodes] = useState([]);
  const [showHints, setShowHints] = useState(false);
  const [blurTimeout, setBlurTimeout] = useState(null);

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
    if (!episodeName.trim()) {
      alert('Please enter an episode name.');
      return;
    }
    axios
      .get(`https://rickandmortyapi.com/api/episode/?name=${encodeURIComponent(episodeName)}`)
      .then((res) => {
        const newEpisode = { ...res.data.results[0], seen: false };
        if (episodes.some((episode) => episode.id === newEpisode.id)) {
          alert('This episode is already in your watch list');
        } else {
          const updatedList = [...episodes, newEpisode];
          setEpisodes(updatedList);
          localStorage.setItem('episodes', JSON.stringify(updatedList));
        }
      })
      .catch((err) => {
        console.error('Error fetching episode:', err);
      })
      .finally(() => {
        setEpisodeName('');
      });
  };

  const toggleSeenStatus = (id) => {
    const updatedEpisodes = episodes.map((episode) =>
      episode.id === id ? { ...episode, seen: !episode.seen } : episode
    );
    setEpisodes(updatedEpisodes);
    localStorage.setItem('episodes', JSON.stringify(updatedEpisodes));
  };

  const handleHintClick = (name) => {
    clearTimeout(blurTimeout);
    setEpisodeName(name);
    setShowHints(false);
  };

  const EpisodeList = ({ episodes, toggleSeenStatus }) => (
    episodes.map((episode) => (
      <div key={episode.id} className="episodeItem">
        <div className="episodeItem_text">
          <h3>{episode.name}</h3>
          <p>Air Date: {episode.air_date}</p>
          <p>Episode: {episode.episode}</p>
        </div>
        <div className="episodeItem_icons">
          <button onClick={() => toggleSeenStatus(episode.id)}>
            <FontAwesomeIcon icon={episode.seen ? faEyeSlash : faEye} />
          </button>
        </div>
      </div>
    ))
  );

  return (
    <div className="WatchList">
      <div className="inputContainer">
        <input
          className="searchInput"
          type="text"
          onChange={(e) => setEpisodeName(e.target.value)}
          value={episodeName}
          placeholder="Search for an episode"
          onFocus={() => setShowHints(true)}
          onBlur={() => {
            const timeout = setTimeout(() => setShowHints(false), 200);
            setBlurTimeout(timeout);
          }}
        />
        <button onClick={handleSearch} className="addButton">
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: '7px' }} /> Add to Watch List
        </button>
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
        <div className="unseenContainer episodesContainer">
          <h2>Unseen Episodes</h2>
          <EpisodeList
            episodes={episodes.filter((episode) => !episode.seen)}
            toggleSeenStatus={toggleSeenStatus}
          />
        </div>
        <div className="seenContainer episodesContainer">
          <h2>Seen Episodes</h2>
          <EpisodeList
            episodes={episodes.filter((episode) => episode.seen)}
            toggleSeenStatus={toggleSeenStatus}
          />
        </div>
      </div>
    </div>
  );
}
