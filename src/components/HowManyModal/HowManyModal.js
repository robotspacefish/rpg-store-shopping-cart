import React, { useState } from 'react';
import './HowManyModal.css';

const HowManyModal = props => {
  const [howMany, setHowMany] = useState(1);

  const handleOnChange = e => {
    setHowMany(parseInt(e.target.value))
  }

  const handleSubmit = e => {
    e.preventDefault();
    // TODO
    // submit how many to cart through store
    // after, hide modal
    props.addToCart(howMany);
  }

  const handleCancel = () => props.cancelAddToCart();

  return (
    <form className="HowManyModal" onSubmit={handleSubmit}>
      <h2>How Many {props.name}?</h2>
      <div>
        <input
          type="number"
          id="how-many"
          min="1"
          value={howMany}
          onChange={e => handleOnChange(e)}
        />x
      </div>
      <button onClick={handleCancel}>Cancel</button>
      <button>Add To Cart</button>
    </form>
  );
};

export default HowManyModal;