import React from 'react';
import './PagesNavigation.css';
import { NavLink } from 'react-router-dom';
import home from '/home.svg';
import character from '/character.svg';
import episode from '/episode.svg';
import location from '/location.svg';
import watchlist from '/watchlist.svg';
import PagesNavigationElement from '../PagesNavigationElement/PagesNavigationElement';

export default function PagesNavigation() {
  const navigationItems = [
    { img: home, text: 'Home', path: '/' },
    { img: character, text: 'Characters', path: '/characters' },
    { img: episode, text: 'Episodes', path: '/episodes' },
    { img: location, text: 'Locations', path: '/locations' },
    { img: watchlist, text: 'Watchlist', path: '/watchList' },
  ];

  return (
    <div className="navigationBar">
      {navigationItems.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          className={({ isActive }) => (isActive ? 'activeLink' : '')}
        >
          {({ isActive }) => (
            <PagesNavigationElement img={item.img} text={item.text} isActive={isActive} />
          )}
        </NavLink>
      ))}
    </div>
  );
}
