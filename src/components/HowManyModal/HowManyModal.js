import React, { useState } from 'react';
import ModalButton from '../ModalButton/ModalButton';
import { MODAL } from '../../helpers/constants';
import './HowManyModal.css';

const HowManyModal = (props) => {
  const { itemClicked, buttonText, modalType, clearItemClicked, handleSubmitItem } = props;

  const [howMany, setHowMany] = useState(1);

  const handleOnChange = e => setHowMany(parseInt(e.target.value));

  const handleSubmit = (e) => {
    e.preventDefault();

    handleSubmitItem(howMany);
    clearItemClicked();
  }

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
          <ModalButton type="cancel" text="Cancel" handleOnClick={clearItemClicked} />
          <ModalButton type="confirm" text={buttonText} />
        </div>
      </form >
    </div>
  );
};

export default HowManyModal;