import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './EpisodeList.css'; 

export default function EpisodeList({ episodes, toggleSeenStatus, deleteEpisode }) {
    return (
      <div className="episodeList">
        {episodes.map((episode) => (
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
              <button
                className="deleteButton"
                onClick={() => deleteEpisode(episode.id)}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  