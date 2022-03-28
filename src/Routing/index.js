import React, { useContext, useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import NavBar from '../Components/NavBar';
import DeckContext from '../Context/DeckContext';
import AllCards from '../Pages/AllCards'
import MyDeck from '../Pages/MyDeck';
import { Loader } from '@mantine/core';

import Home from '../Pages/Home';
const Rutas = [{
    name: "Home",
    path: "/",
    icon: '' ,
    subMenu: [],
    component: <Home/>,
},
{
    name: "Get Cards",
    path: "/getCards",
    icon: '' ,
    subMenu: [],
    component: <AllCards/>,
},
{
    name: "My Deck",
    path: "/myDeck",
    icon: '' ,
    subMenu: [],
    component: <MyDeck/>,
},{
    name: "Draw Simulator",
    path: "/drawSimulator",
    icon: '' ,
    subMenu: [],
    component: ' ',
},
]


const Routing = () => {
    const{cardsLoaded} = useContext(DeckContext)
    return (
        <>
            {!cardsLoaded ?
            <Loader color="indigo" size="xl" variant="dots" /> :
            <Router> 
                <NavBar/>
            <Routes>
                
                {Rutas.map(x =>
                    <Route
                        exact
                        path={x.path}
                        element={
                                x.component
                        }
                    >
                    </Route>
                )
                }
                
            </Routes>


    </Router>

            }

              

   
        </>
    )
}

export default Routing
export {Rutas}