
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  // created outside the component cause it will no tgonna change+ it will not be affected if the app component is rerendered
  { "src": "/img/helmet-1.png" },
  { "src": "/img/potion-1.png" },
  { "src": "/img/ring-1.png" },
  { "src": "/img/scroll-1.png" },
  { "src": "/img/shield-1.png" },
  { "src": "/img/sword-1.png" }
]


function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  //shuffle cards

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurns(0)
  }

  //handle choices
  const handleChoice = (card) => {
    console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        console.log("match", choiceOne.src)

      } else {
        console.log("nomatch")

      }
      resetTurn()
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1)
    console.log(turns)
  }
  return (
    <div className="App">
      <h1>Magic Match</h1>
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
          />
        ))}
      </div>
    </div>
  );
}

export default App;
