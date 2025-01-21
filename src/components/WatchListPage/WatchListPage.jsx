import React from 'react'
import './WatchListPage.css'
import WatchList from '../WatchList/WatchList'
export default function WatchListPage() {
  return (
    <div className='WatchListPage screen'>
      <h1>My Watch List</h1>
      <p className='watchListPage_subtitle'>Keep track of your favorite Rick & Morty episodes and create a personalized watchlist to enjoy them at your convenience.</p>
      <WatchList />
    </div>
  )
}
