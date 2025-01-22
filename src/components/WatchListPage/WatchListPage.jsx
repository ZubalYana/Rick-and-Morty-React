import React from 'react'
import './WatchListPage.css'
import WatchList from '../WatchList/WatchList'
export default function WatchListPage() {
  return (
    <div className='WatchListPage screen'>
      <h2 className='screenTitle'>My Watch List</h2>
      <WatchList />
    </div>
  )
}
