import React from 'react'
import './PagesNavigationElement.css'
export default function PagesNavigationElement({img, text}) {
  return (
    <div className='PagesNavigationElement'>
        <img src={img} alt="navigationIcon" />
        <p>{text}</p>
    </div>
  )
}
