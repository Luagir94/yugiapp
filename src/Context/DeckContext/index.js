import { createContext, useState, useEffect } from "react";
import { Notification } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';


const DeckContext = createContext()

const extraDeck = ["Fusion Monster", "Link Monster", "Pendulum Effect Fusion Monster", "Synchro Monster", "Synchro Pendulum Effect Monster", "Synchro Tuner Monster",
    "XYZ Monster", "XYZ Pendulum Effect Monster"]



const DeckProvider = ({ children }) => {
    const [allCards, setallCards] = useState([]);
    const [cardsLoaded, setCardsLoaded] = useState(false);
    const [myDeck, setMyDeck] = useState([]);
    const [myExtraDeck, setMyExtraDeck] = useState([]);
    const [myHand, setMyHand] = useState([]);
    const [indexToAdd, setIndexToAdd] = useState(5);
    const [selectedCard, setSelectedCard] = useState(undefined);
    const [counterM, setCounterM] = useState(0);
    const [counterE, setCounterE] = useState(0);
    const notifications = useNotifications();

    const noti = (title, msg) => {
        notifications.showNotification({
            title: title,
            message: msg,
            color: 'red',
            autoClose: 2000
        })
    }


    const addToDeck = (card) => {
  
            const extra = extraDeck.find(element => element === card.type)
            const isInDeck = extra ? myExtraDeck.find(x => x.id === card.id) : myDeck.find(x => x.id === card.id)
            if (isInDeck) {
                if (extra) {
                    if (counterE<= 15) {
                        const extraD = [...myExtraDeck];
                        extraD.forEach((element) => {
                            if (element.id === isInDeck.id) {
                                if (selectedCard.banlist_info.ban_tcg && isInDeck.banlist_info.ban_tcg === 'Semi-Limited') {
                                    if (isInDeck.quantity <3) {
                                        setCounterE(counterE +1);
                                        return element.quantity = element.quantity + 1;
                                    }else{
                                        noti("You've reached the limit!", 'You cannot add more of this card')
                                    }
                                    
                                }else if (isInDeck.banlist_info.ban_tcg === 'Limited'){
                                    noti("You've reached the limit!", 'You cannot add more of this card')
                                }else if(selectedCard.banlist_info.ban_tcg && isInDeck.banlist_info.ban_tcg === 'Unlimited' && isInDeck.quantity <=3){
                                    if (isInDeck.quantity <3) {
                                        setCounterE(counterE +1);
                                        return element.quantity = element.quantity + 1;
                                    }else{
                                        noti("You've reached the limit!", 'You cannot add more of this card')
                                    }
                                }
                            }
                        });
                        setMyExtraDeck(extraD);
                        
                    } else {
                        noti("You've reached the limit on Extra Deck!", 'You cannot add more cards')
                    }
                } else {
                    if (counterM <= 60) {
                        const deck = [...myDeck];
                        deck.forEach((element) => {
                            if (element.id === card.id) {
                                if (selectedCard.banlist_info.ban_tcg === 'Semi-Limited' ) {
                                    if (isInDeck.quantity <2) {
                                        setCounterM(counterM + 1);
                                        return element.quantity = element.quantity + 1;
                                    }else{
                                        noti("You've reached the limit!", 'You cannot add more of this card')
                                    }
                                }else if (card.banlist_info && selectedCard.banlist_info.ban_tcg === 'Limited' && element.quantity <1){
                                    noti("You've reached the limit!", 'You cannot add more of this card')
                                    
                                }else if(isInDeck.banlist_info.ban_tcg === 'Unlimited' ){
                                    if (isInDeck.quantity <3) {
                                        setCounterM(counterM + 1);
                                        return element.quantity = element.quantity + 1;
                                    }else{
                                        noti("You've reached the limit!", 'You cannot add more of this card')
                                    }
                                }
                            }
                        });
                        setMyDeck(deck);
                       
                        
                    } else {
                        noti("You've reached the limit on Deck!", 'You cannot add more cards')
                    }

                }




            } else {
                if (card.banlist_info && card.banlist_info.ban_tcg === 'Banned') {
                    noti('Forbidden Card!', 'You cannot add this card to your deck!')
                } else {
                    const newCard = card
                    newCard.quantity =+ 1
                    !extra ? setMyDeck([...myDeck, newCard]) : (myExtraDeck.length < 15 ? (setMyExtraDeck([...myExtraDeck, newCard]) ): noti("You've reached the limit on Extra Deck!", 'You cannot add more cards'))
                    extra ? setCounterE(counterE + 1) : setCounterM(counterM + 1)
                }
            }
        
    }

    const removeCardFromDeck = (card) => {
        const extra = extraDeck.find(element => element === card.type)
        if (!extra) {
            const cardi = myDeck.findIndex(x => x.id === card.id)
           myDeck[cardi].quantity -= 1
           if (myDeck[cardi].quantity > 0) {
               setMyDeck([...myDeck])
               setCounterM(counterM -1);
           } else {
            setMyDeck(myDeck.filter(x => x.id !== card.id))
            setCounterM(counterM -1)
           }
        } else {
            const cardi = myExtraDeck.findIndex(x => x.id === card.id)
            myExtraDeck[cardi].quantity -= 1
            if (myExtraDeck[cardi].quantity > 0) {
                setMyExtraDeck([...myExtraDeck])
                setCounterE(counterE -1)
            } else {
                setMyExtraDeck(myExtraDeck.filter(x => x.id !== card.id))
                setCounterE(counterE -1)
            }
        }


    }

    const shuffleDeck = deck => {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = deck[i];
            deck[i] = deck[j];
            deck[j] = temp;
        }
        setMyDeck(deck)
    }

    const getFiveCards = (deck) => {
        shuffleDeck(deck)
        setMyHand(myDeck.splice(0, 5))
        setIndexToAdd(5)
    }

    const addACardToHand = () => {
        setMyHand([...myHand, myDeck.splice(indexToAdd, 1)])
        setIndexToAdd(indexToAdd + 1)
    }

    const getAllCards = async () => {
        const resp = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php`)
        const data = await resp.json()
        setallCards(data.data)
        setCardsLoaded(true)
    }
    useEffect(() => {
        getAllCards()
    }, []);


    useEffect(() => {
        for (const x of allCards) {
            x.name = x.name.toLowerCase()
            x.quantity = 0
            if (!x.banlist_info) {
                x.banlist_info ={
                        ban_tcg : 'Unlimited'

                }
            }
        }
    }, [allCards]);






    return (<DeckContext.Provider value={{getAllCards, myExtraDeck, setMyExtraDeck, selectedCard, setSelectedCard, cardsLoaded, allCards, setallCards, myDeck, setMyDeck, myHand, setMyHand, addToDeck, removeCardFromDeck, shuffleDeck, getFiveCards, addACardToHand }}>{children}</DeckContext.Provider>)
}

export { DeckProvider }
export default DeckContext