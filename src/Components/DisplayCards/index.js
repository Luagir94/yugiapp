import React, { useEffect, useState, useContext } from 'react'
import DeckContext from '../../Context/DeckContext'
import Paginator from '../Paginator'



const cardTypes = ["Effect Monster"
    , "Flip Effect Monster", "Flip Tuner Effect Monster", 'Gemini Monster', "Normal Monster", "Normal Tuner Monster", "Pendulum Effect Monster",
    "Pendulum Flip Effect Monster", "Pendulum Normal Monster", "Ritual Effect Monster", "Ritual Monster", "Spirit Monster", "Toon Monster", "Tuner Monster",
    "Union Effect Monster", "Fusion Monster", "Link Monster", "Pendulum Effect Fusion Monster", "Synchro Monster", "Synchro Pendulum Effect Monster", "Synchro Tuner Monster",
    "XYZ Monster", "XYZ Pendulum Effect Monster", 'Spell Card', 'Trap Card']
const monsterAttributes = ['FIRE', 'WIND', 'EARTH', 'WATER', 'DARK', 'LIGHT', 'DIVINE']
const spellAttributes = ['Normal', 'Field', 'Quick-Play', 'Continuous', 'Ritual', 'Equip']
const trapAttributes = ['Normal', 'Counter', 'Continuous']
const typeMonster = ['Aqua', 'Beast', 'Beast-Warrior', 'Creator-God', 'Cyberse', 'Dinosaur', 'Divine-Beast', 'Dragon', 'Fairy', 'Fiend', 'Fish', 'Insect', 'Machine', 'Plant', 'Psychic', 'Pyro', 'Reptile', 'Rock', 'Sea Serpent', 'Spellcaster', 'Thunder', 'Warrior', 'Winged Beast']
const lvlRank = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const links = [1, 2, 3, 4, 5, 6, 7, 8]
const DisplayCards = () => {
    const [filteredCards, setfilteredCards] = useState([]);
    const [cardType, setCardType] = useState('all');
    const [type, setType] = useState('all');
    const [attributte, setAttributte] = useState('all');
    const [level, setLevel] = useState('all');
    const [name, setName] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [postsPerPage] = useState(12);
    const [selected, setSelected] = useState(false);
    const { allCards, setSelectedCard, getAllCards } = useContext(DeckContext)
    const [display, setDisplay] = useState([]);
    const save = allCards
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const setSelection = (x, y) => {
        setSelectedCard(x)
        setSelected(y)
    }
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const filterByName = () =>{
        const a = allCards.filter((e) => e.name.includes(name))
        if (a.length > 0) {
            return a
        } else {
            return save
        }
    }


    const filterByTypeOfCard = (arr) => {
        if (cardType !== 'all') {
            const a = arr && arr.length > 0 ? arr.filter((e) => e.type === (cardType)) : null
            if (a && (a.length !== arr.length)) {
                return a
            } else {
                return arr
            }
        } else {
            return arr
        }
    }


    const filterByAttribute = (arr) => {
        if (type !== 'all') {
            const a = arr && arr.length > 0 ? arr.filter((e) => e.race === (type)) : null
            if (a && (a.length !== arr.length)) {
                return a
            } else {
                return arr
            }
        } else {
            return arr
        }
    }
    const filterByType = (arr) => {
        if (attributte !== 'all') {
            const a = arr && arr.length > 0 ? arr.filter((e) => e.attribute == (attributte)) : null
            if (a && (a.length !== arr.length)) {
                return a
            } else {
                return arr
            }
        } else {
            return arr
        }
    }
    const filterByLevel = (arr) => {
        if (level !== 'all') {
            const a = arr && arr.length > 0 ? arr.filter((e) => e.level == (level)) : null
            if (a && (a.length !== arr.length)) {
                return a
            } else {
                return arr
            }
        } else {
            return arr
        }
    }

    useEffect(() => {
        if (name.length === 0 &&cardType ==='all' && level ==='all' && attributte==='all' && type === 'all') {
            console.log('no filter');
            setDisplay(save.slice(0, 12))
            console.log(save);
        } else {
            const s1 = filterByName()
            console.log(s1);
            const s2 = filterByTypeOfCard(s1)
            console.log(s2);
            const s3 = filterByAttribute(s2)
            console.log(s3);
            if (cardType === 'Spell Card' || cardType === 'Trap Card') {
                setfilteredCards([...s3])
                setDisplay(s3.slice(0, 10))
            }else if (cardType !== 'Spell Card' && cardType !== 'Trap Card') {
                const s4 = filterByType(s3)
                console.log(s4);
                const s5 = filterByLevel(s4)
                console.log(s5);
                setfilteredCards([...s5])
                setDisplay(s5.slice(0, 10))
            }
        }


    }, [cardType,type,attributte,name,level]);


const clearFilters = ()=>{
 setName('')
 setCardType('all')
 setType('all')
 setLevel('all')
 setAttributte('all')
 const cardsToShow = allCards.slice(0, 12)
 setDisplay(cardsToShow)
 setfilteredCards([])
}


    useEffect(() => {
        const cardsToShow = allCards.slice(0, 12)
        setDisplay(cardsToShow)
    }, [allCards]);
    useEffect(() => {
       if (cardType === 'Spell Card' || cardType === 'Trap Card') {
           setLevel('all')
           setType('all')
       } 
    }, [cardType]);

    useEffect(() => {
        setDisplay(filteredCards.length === 0 ? allCards.slice(indexOfFirstPost, indexOfLastPost) :  filteredCards.slice(indexOfFirstPost, indexOfLastPost))

    }, [currentPage]);
    return (<>
        <div className="cardPicker__list-content">
            <div className="cardPicker__list-content-filters">
                <input type="text" placeholder='Name' onInput={e => setName(e.target.value.trim()).toLowerCase()}/>
                <select onChange={e => setCardType((e.target.value))}>
                    <option value="all" selected>Type of Card</option>
                    {cardTypes.map(x => <option value={x} selected>{x}</option>)
                    }
                </select>
                <select onChange={e => setType(e.target.value)}>
                    <option value="all" >{`Type`}</option>
                    {cardType === 'Spell Card' ? (spellAttributes.map(x => <option value={x} selected>{x}</option>)) :
                        (cardType === 'Trap Card' ? (trapAttributes.map(x => <option value={x} selected>{x}</option>)) : (cardType === 'all' ? null : (typeMonster.map(x => <option value={x} selected>{x}</option>))))
                    }
                </select>
                {cardType === 'Spell Card' || cardType === 'Trap Card' ? null :
                    <select onChange={e => setAttributte(e.target.value) }>
                        <option value="all" selected>Attributte</option>
                        {monsterAttributes.map(x => <option value={`${x}`}>{x}</option>)}
                    </select>
                }
                {(cardType === 'Spell Card' || cardType === 'Trap Card') ? null :
                    <select onChange={e => setLevel(e.target.value)}>
                        <option value="all" selected>LvL/Rank/Link</option>
                        {cardType === 'Link Monster' ?
                            (links.map(x => <option value={x} selected>{x}</option>)) :
                            (lvlRank.map(x => <option value={x} selected>{x}</option>))
                        }
                    </select>
                }
                <button onClick={clearFilters}>Clear Filters</button>
            </div>
            <div className="cardPicker__list-content-cards">
                <div className="cardPicker__list-content-cards-cards">
                    <ul>
                        {filteredCards.length > 0 ?
                            display.map(x => {
                                return (
                                    <li onClick={() => setSelection(x, x.name)} className={`${selected === x.name ? "active" : `notSelected`}`}>{(x.name).toUpperCase()}</li>
                                )
                            })
                        
                        :
                        
                        
                        
                        display.map(x => {
                            return (
                                <li onClick={() => setSelection(x, x.name)} className={`${selected === x.name ? "active" : `notSelected`}`}>{x.name.toUpperCase()}</li>
                            )
                        })
                        }
                    </ul>
                </div>
                <Paginator
                    postsPerPage={postsPerPage}
                    totalPosts={filteredCards.length > 1 ? Math.floor(filteredCards.length / 12) + 1 : Math.floor(allCards.length / 12) + 1}
                    paginate={paginate}
                />
            </div>
        </div>

    </>
    )
}

export default DisplayCards