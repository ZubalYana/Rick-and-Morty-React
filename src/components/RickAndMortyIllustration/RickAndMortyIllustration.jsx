import React from 'react'
import './RickAndMortyIllustration.css'
import rick from '/rick.png'
import morty from '/morty.png'
import rickAndMortyText from '/rick and morty text img.png'
export default function RickAndMortyIllustration() {
  return (
    <div className='RickAndMortyIllustration'>
        <img src={rick} alt="rick" className='illustration_part' id='rickImg' />
        <img src={morty} alt="morty" className='illustration_part' id='mortyImg' />
        <img src={rickAndMortyText} alt="rick and morty text" className='illustration_part' id='textImg' />
    </div>
  )
}
