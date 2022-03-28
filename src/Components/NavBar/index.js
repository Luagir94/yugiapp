import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'
import { Rutas } from '../../Routing'
const NavBar = () => {
  return (
    <header className='navBar'>
      <ul className='navBar__list'>
        {Rutas.map(x => 
          <Link className='navBar__list-item' to={x.path}>{x.name}</Link>
        )}
      </ul>
    </header>
  )

}

export default NavBar