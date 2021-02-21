import React, { useState } from 'react';
import './HowManyModal.css';
import { ACTIONS } from '../Store/Store';
import { MODAL } from '../Store/Store';

const HowManyModal = props => {
  const { itemClicked, buttonText, submitCallback, cancelCallback, modalType, dispatchCart } = props;

  const [howMany, setHowMany] = useState(1);

  const handleOnChange = e => {
    setHowMany(parseInt(e.target.value))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    modalType === MODAL.ADD ?
      dispatchCart({ type: ACTIONS.ADD_TO_CART, payload: { item: itemClicked, qty: howMany } }) :
      dispatchCart({ type: ACTIONS.REMOVE_FROM_CART })


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
            max={`${modalType === MODAL.REMOVE ? itemClicked.quantity : 99}`}
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