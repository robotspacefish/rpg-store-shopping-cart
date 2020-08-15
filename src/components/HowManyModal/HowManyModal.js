import React, { useState } from 'react';
import './HowManyModal.css';

const HowManyModal = props => {
  const { itemClicked, buttonText, submitCallback, cancelCallback, className } = props;

  const [howMany, setHowMany] = useState(1);

  const handleOnChange = e => {
    setHowMany(parseInt(e.target.value))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    submitCallback(itemClicked, howMany);
  }

  const handleCancel = () => cancelCallback();

  return (
    <div className="HowManyModal">
      <form className="HowManyModal__form" onSubmit={handleSubmit}>
        <h2>How Many {itemClicked.name}s?</h2>
        <div className="HowManyModal__input-container">
          x<input
            type="number"
            id="how-many"
            min="1"
            max={`${className === 'remove-item' ? itemClicked.quantity : 99}`}
            value={howMany}
            onChange={e => handleOnChange(e)}
          />
        </div>
        <div className="HowManyModal__buttons">
          <button className="HowManyModal__cancel-button" onClick={handleCancel}>
            Cancel
          </button>

          <button className="HowManyModal__confirm-button">{buttonText}</button>
        </div>
      </form >
    </div>
  );
};

export default HowManyModal;