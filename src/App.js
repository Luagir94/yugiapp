import React,{useContext} from 'react';
import './App.css';
import { DeckProvider } from './Context/DeckContext';
import { NotificationsProvider } from '@mantine/notifications';


import Routing from './Routing';

function App() {

  return (
    <div className="App">
      <NotificationsProvider>
      <DeckProvider>
        <Routing/>
      </DeckProvider>
      </NotificationsProvider>
    </div>
  );
}

export default App;
