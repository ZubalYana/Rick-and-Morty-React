import React from 'react';
import './HomePage.css';
import rickAndMortyLogo from '/rick and morty img.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
export default function HomePage() {
  return (
    <div className="Homepage screen">
      <div className="Homepage_content">
        <div className="textContainer">
          <h1 className="homePage_title">Rick and Morty funpage №1</h1>
          <p className="homePage_text">
          <p>Explore a comprehensive list of episodes, from iconic adventures to hidden gems, and discover the bizarre and unpredictable locations featured throughout the series. Whether it's the Citadel of Ricks, Anatomy Park, or the mysterious Planet Squanch, there's always something new to learn and love!</p>
          <p>Create your personal watchlist to keep track of the episodes you've seen and the ones still on your journey. Relive your favorite moments, stay updated, and never miss a beat as you traverse the insane, action-packed world of Rick and Morty.</p>
          </p>
          <div className="homepageBtns">
          <button className="exploreButton homepageButton">
            <FontAwesomeIcon icon={faMagnifyingGlass} /><p>Explore</p>
          </button>
          <button className="watchListButton homepageButton">
            <FontAwesomeIcon icon={faBookmark} /><p>My Watch List</p>
          </button>
          </div>

        </div>
        <div className="homepage_imgCon">
          <img src={rickAndMortyLogo} alt="Rick and Morty Logo" className="rickAndMortyLogo" />
        </div>
      </div>
    </div>
  );
}
