import React from 'react';
import './HomePage.css';
import rickAndMortyLogo from '/rick and morty img.jpg';
export default function HomePage() {
  return (
    <div className="Homepage screen">
      <div className="Homepage_content">
        <div className="textContainer">
          <h1 className='homePage_title'>The best Rick and Morty funpage ever!</h1>
          <p className='homePage_text'>Browse through series characters and discover tons of fascinating details about each of them. Explore the complete list of episodes and locations from the movie series! Additionally, log episodes in your watchlist and stay on track with your Rick and Morty journey.</p>
        </div>
        <div className="homepage_imgCon">
          <img src={rickAndMortyLogo} alt="rickAndMortyLogo" className="rickAndMortyLogo" />
        </div>
      </div>
    </div>
  );
}
