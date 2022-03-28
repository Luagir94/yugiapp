import React, { useEffect, useContext, useState } from 'react'
import DeckContext from '../../Context/DeckContext'
import { ActionIcon, Avatar, Badge, Group } from '@mantine/core';
const DisplayCard = () => {
  const { selectedCard, addToDeck } = useContext(DeckContext)
  const [selected, setSelected] = useState(false);
useEffect(() => {
console.log(selectedCard);
}, [selectedCard]);

  return (
    <>
      {selectedCard ? 
        
        <div className="cardPicker__display-content">
          <div className="cardPicker__display-content-data">
            <p className="cardPicker__display-content-data-dato">ID: {selectedCard.id}</p>
            <p className="cardPicker__display-content-data-dato">Name: {(selectedCard.name).toUpperCase()}</p>
            <p className="cardPicker__display-content-data-dato">Type of Card: {selectedCard.type}</p>
            {selectedCard.level ? <p className="cardPicker__display-content-data-dato">LvL/Rank/Link: {selectedCard.level}</p> :null }
            {selectedCard.attribute ? <p className="cardPicker__display-content-data-dato">Attribute: {selectedCard.attribute}</p> : null}
            {selectedCard.atk ? <p className="cardPicker__display-content-data-dato">ATK: {selectedCard.atk} DEF: {selectedCard.def}</p> : null}
            <p className="cardPicker__display-content-data-dato">Type: {selectedCard.race}</p>
            <p className="cardPicker__display-content-data-dato-desc"> {selectedCard.desc}</p>
            <p className="cardPicker__display-content-data-dato" >Price: U$D {selectedCard.card_prices[0].tcgplayer_price}</p>
            <button onClick={()=>addToDeck(selectedCard) }className="cardPicker__display-content-data-add">Agregar al Deck</button>
          </div>
          <div className="cardPicker__display-content-img">
          <Badge sx={{ paddingLeft: 0 }} size="lg" radius="xl" color="teal" leftSection={selectedCard.banlist_info.ban_tcg === 'Unlimited'? `3` : 
          (selectedCard.banlist_info.ban_tcg === 'Semi-Limited' ? '2' :(selectedCard.banlist_info.ban_tcg === 'Limited' ? '1' : '0'))}>
        {selectedCard.banlist_info.ban_tcg === 'Unlimited'? `Unlimited` : 
          (selectedCard.banlist_info.ban_tcg === 'Semi-Limited' ? 'Semi-Limited' :(selectedCard.banlist_info.ban_tcg === 'Limited' ? 'Limited' : 'Banned  '))}
      </Badge>
            <img src={selectedCard.card_images[0].image_url} alt={selectedCard.name} className="cardPicker__display-content-img-img"/>
          </div>



        </div>
      

          : null


      }

    </>
  )
}

export default DisplayCard