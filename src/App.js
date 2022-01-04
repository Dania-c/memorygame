
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  // created outside the component cause it will no tgonna change+ it will not be affected if the app component is rerendered
  // { "src": "/img/helmet-1.png", matched: false },https://pixabay.com/photos/tiger-fence-grid-chain-link-5923710/
  // { "src": "/img/potion-1.png", matched: false },
  // { "src": "/img/ring-1.png", matched: false },
  // { "src": "/img/scroll-1.png", matched: false },
  // { "src": "/img/shield-1.png", matched: false },
  // { "src": "/img/sword-1.png", matched: false }
  { "src": "https://res.cloudinary.com/proda/image/upload/v1632548492/samples/animals/kitten-playing.gif", matched: false },
  { "src": "https://res.cloudinary.com/proda/image/upload/v1632548487/samples/animals/three-dogs.jpg", matched: false },
  { "src": "https://res.cloudinary.com/proda/image/upload/v1632548483/samples/animals/reindeer.jpg", matched: false },
  { "src": "https://res.cloudinary.com/proda/image/upload/v1632548484/samples/sheep.jpg", matched: false },
  { "src": "https://res.cloudinary.com/proda/image/upload/v1632548483/samples/food/dessert.jpg", matched: false },
  { "src": "https://res.cloudinary.com/proda/image/upload/v1632548484/samples/food/pot-mussels.jpg", matched: false }
]


function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  //shuffle cards

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null);
    setChoiceTwo(null);

    setCards(shuffledCards)
    setTurns(0)
  }

  //handle choices
  const handleChoice = (card) => {
    console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {// will be fired on the first time the component mount 

    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        //match
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        //nomatch
        setTimeout(() => resetTurn(), 1000)
      }

    }
  }, [choiceOne, choiceTwo])// so this code is fired tow when these 2 states changes
  console.log(cards)

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)

    // console.log(turns)
  }

  useEffect(() => {
    shuffleCards()

  }, [])
  return (
    <div className="App">
      <h1>Maria's Cards</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          // <div className='card' key={card.id}>
          //   <img className='front' src={card.src} alt="card front" />
          //   <img className='back' src="/img/cover.png" alt="card back" />
          // </div>
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turn : {turns}</p>
    </div>
  );
}

export default App;
