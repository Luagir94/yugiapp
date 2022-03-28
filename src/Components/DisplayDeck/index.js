import React,{useEffect,useState,useContext} from 'react'
import { Badge } from '@mantine/core';
import DeckContext from '../../Context/DeckContext'


const DisplayDeck = () => {
    const {myDeck,removeCardFromDeck, addToDeck, shuffleDeck, myExtraDeck} = useContext(DeckContext)
    const [displayCard, setdisplayCard] = useState(undefined);
    const handleQuantityMain = () => {
      return myDeck.reduce((acumulador, item) => {
       return acumulador += item.quantity;
     }, 0);}



     const handleQuantityExtra = () => {
      return myExtraDeck.reduce((acumulador, item) => {
       return acumulador += item.quantity;
     }, 0);}

     const handleQuantitySpell = () => {
      return myDeck.reduce((acumulador, item) => {
        if (item.type === "Spell Card") {
          return acumulador += item.quantity;
        }else{
          return acumulador
        }
       
     }, 0);}
     const handleQuantityMonsters = () => {
      return myDeck.reduce((acumulador, item) => {
        if (item.type !== "Spell Card" && item.type !== "Trap Card") {
          return acumulador += item.quantity;
        }else{
          return acumulador
        }
       
     }, 0);}

     const handleQuantityTrap = () => {
      return myDeck.reduce((acumulador, item) => {
        if (item.type === "Trap Card") {
          return acumulador += item.quantity;
        }else{
          return acumulador
        }
       
     }, 0);}
    useEffect(() => {
      if (myDeck.length > 0) {
        handleQuantityMain()
      }
    }, [myDeck]);
    useEffect(() => {
      if (myExtraDeck.length > 0) {
        handleQuantityExtra()
      }
    }, [myExtraDeck]);
  return (<>
  <div className='myDeck__DisplayDeck'>
      <div className='myDeck__DisplayDeck-deck'>
      <div className='myDeck__DisplayDeck-deck-conteiner'>
      { myDeck ? myDeck.map(x =>{
          return(
            <div className='myDeck__DisplayDeck-deck-conteiner-card' key={x.id}>
              <div className='myDeck__DisplayDeck-deck-conteiner-card-badge'>{x.quantity}</div>
            <img src={x.card_images[0].image_url_small} alt="" className='myDeck__DisplayDeck-deck-conteiner-card-img' onMouseOver={() => setdisplayCard(x)} />
         
            </div>
            )
          }) : null}
          </div>
          <div className='myDeck__DisplayDeck-deck-conteiner-data'>
          <p>Main Deck : {handleQuantityMain()} Cards</p>
          <p>Monsters: {handleQuantityMonsters()} Cards</p>
          <p>Spells: {handleQuantitySpell()} Cards</p>
          <p>Traps: {handleQuantityTrap()} Cards</p>
          </div>
          
      </div>
      <div className='myDeck__DisplayDeck-extra'>
      <div className='myDeck__DisplayDeck-extra-conteiner'>
      { myExtraDeck ? myExtraDeck.map(x =>{
          return(
            <div className='myDeck__DisplayDeck-deck-conteiner-card' key={x.id}>
             <div className='myDeck__DisplayDeck-deck-conteiner-card-badge'>{x.quantity}</div>
            <img src={x.card_images[0].image_url_small} alt="" className='myDeck__DisplayDeck-deck-conteiner-card-img'onMouseOver={() => setdisplayCard(x)}/>
            </div>
          
          )
          }) : null}
          
          </div>
          <div className='myDeck__DisplayDeck-deck-conteiner-data'>
          <p>Extra Deck :{handleQuantityExtra()} Cards</p>
          </div>
          
      </div>

      

      
  </div>
  <div className='myDeck__DisplaySelection'> 
  {displayCard ? 
  <div  className='myDeck__DisplaySelection-conteiner'>
    <img src={displayCard.card_images[0].image_url} alt="" />
    <p className='myDeck__DisplaySelection-conteiner-dato'>NAME:{displayCard.name.toUpperCase()}</p>
    <p className='myDeck__DisplaySelection-conteiner-dato'>TYPE OF CARD: {displayCard.type}</p>
    <p className='myDeck__DisplaySelection-conteiner-dato'>TYPE: {displayCard.race}</p>
    <p className='myDeck__DisplaySelection-conteiner-dato-desc'>DESCRIPTION: {displayCard.desc}</p>
    {displayCard.attribute ? <p className='myDeck__DisplaySelection-conteiner-dato'>ATTRIBUTE: {displayCard.attribute}</p>: null}
    {displayCard.level ? <p className='myDeck__DisplaySelection-conteiner-dato'>LVL/RANK/LINK: {displayCard.level}</p>: null}
    {displayCard.atk ? <p className='myDeck__DisplaySelection-conteiner-dato'>{`ATK: ${displayCard.atk}`}</p>: null}
    {displayCard.def ? <p className='myDeck__DisplaySelection-conteiner-dato'>{`DEF: ${displayCard.def}`}</p>: null}
    <button onClick={()=>addToDeck(displayCard) }className='myDeck__DisplaySelection-conteiner-button'>Agregar al Deck</button>
    <button onClick={()=>removeCardFromDeck(displayCard) }className='myDeck__DisplaySelection-conteiner-button'>Borrar del Deck</button>
  </div>
  :
  null

  }
  
  
  
  </div>
  
  
  </>
    
  )
}

export default DisplayDeck