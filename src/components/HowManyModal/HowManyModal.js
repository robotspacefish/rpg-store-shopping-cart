import React, { useState } from 'react';
import './HowManyModal.css';

const HowManyModal = props => {
  const [howMany, setHowMany] = useState(1);

  const handleOnChange = e => {
    setHowMany(parseInt(e.target.value))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addToCart(props.itemClicked, howMany);
  }

  const handleCancel = () => props.cancelAddToCart();

  return (
    <div className="HowManyModal">
      <form className="HowManyModal__form" onSubmit={handleSubmit}>
        <h2>How Many {props.itemClicked.name}s?</h2>
        <div className="HowManyModal__input-container">
          x<input
            type="number"
            id="how-many"
            min="1"
            value={howMany}
            onChange={e => handleOnChange(e)}
          />
        </div>
        <div className="HowManyModal__buttons">
          <button className="HowManyModal__cancel-button" onClick={handleCancel}>Cancel</button>
          <button className="HowManyModal__confirm-button">Add To Cart</button>
        </div>
      </form >
    </div>
  );
};

export default HowManyModal;