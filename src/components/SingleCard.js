import React from 'react'
import './SingleCard.css'

function SingleCard({ card, handleChoice, flipped, disabled }) {

    const handleClick = () => {
        if (!disabled) handleChoice(card)
    }

    return (
        <div className='card' >
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="card front" />
                {/* <img className="back" src="/img/cover.png" onClick={handleClick} alt="cover" /> //https://pixabay.com/photos/peacock-zeal-male-nice-plumage-2493865/ */}
                <img className="back" src="https://res.cloudinary.com/proda/image/upload/v1632548492/samples/landscapes/nature-mountains.jpg" onClick={handleClick} alt="cover" />
            </div>
        </div>
    )
}

export default SingleCard
