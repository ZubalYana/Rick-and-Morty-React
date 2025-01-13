import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PagesNavigation from './components/PagesNavigation/PagesNavigation'
import HomePage from './components/HomePage/HomePage'
import CharactersPage from './components/CharactersPage/CharactersPage'
import EpisodesPage from './components/EpisodesPage/EpisodesPage'
import LocationsPage from './components/LocationsPage/LocationsPage'
import WatchListPage from './components/WatchListPage/WatchListPage'
function App() {

  return (
    <>
      <BrowserRouter>
        <PagesNavigation />
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/characters' element={<CharactersPage />} />
          <Route path='/episodes' element={<EpisodesPage />} />
          <Route path='/locations' element={<LocationsPage />} />
          <Route path='/watchList' element={<WatchListPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
