import React from 'react';

const ModalButton = ({ type, text, handleOnClick }) => (
  <button
    className={`HowManyModal__${type}-button`}
    onClick={handleOnClick}
  >
    {text}
  </button>
);

export default ModalButton;