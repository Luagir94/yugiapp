import React from 'react'
import IMAGES from '../../Assets/index'
import CustomImg from '../../Components/Imgs/customImg'
import './index.scss'

const Home = () => {
  return (
    <main className='home'>
      <div className='home__imgDiv'>
      <CustomImg {...IMAGES.ygoLogo} clase="home__imgDiv-img" />
      </div>
      <div className='home__imgDiv'>
        <p className='home__imgDiv-text'>
          Bienvenidos a la YUGI App.
        </p>
      </div>
    </main>
  )
}

export default Home