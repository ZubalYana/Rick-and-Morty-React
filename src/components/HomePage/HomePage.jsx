import React from 'react';
import './HomePage.css';
import backgroundPoster from '/backgroundPoster.avif';

export default function HomePage() {
  return (
    <div className="Homepage screen">
      <div className="backgroundPoster_con">
        <img src={backgroundPoster} alt="backgroundPoster" className="backgroundPoster" />
        <div className="backgroundPoster_overlay"></div>
      </div>
    </div>
  );
}
