import React from 'react'
import DisplayCards from '../../Components/DisplayCards'
import DisplayCard from '../../Components/DisplayCard'
import './index.scss'
const AllCards = () => {
  return (
    <main className='cardPicker'>
    <div className='cardPicker__list'>
    <DisplayCards/>
    </div>
    <div className='cardPicker__display'>
    <DisplayCard/>
    </div>
  </main>
  )
}

export default AllCards