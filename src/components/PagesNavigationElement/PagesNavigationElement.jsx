import React from 'react';
import './PagesNavigationElement.css';

export default function PagesNavigationElement({ img, text, isActive }) {
  return (
    <div className={`PagesNavigationElement ${isActive ? 'active' : ''}`}>
      <img src={img} alt="navigationIcon" />
      <p>{text}</p>
    </div>
  );
}
