import React from 'react'
import './CharactersPage.css'
import CharacterList from '../CharacterList/CharacterList'
export default function CharactersPage() {
  return (
    <div className='screen'>
      <h2 className='screenTitle'>Complete characters list:</h2>
        <CharacterList />
    </div>
  )
}
