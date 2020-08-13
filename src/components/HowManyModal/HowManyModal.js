import React, { useState } from 'react';
import './HowManyModal.css';

const HowManyModal = props => {
  const [howMany, setHowMany] = useState(1);

  const handleOnChange = e => {
    setHowMany(parseInt(e.target.value))
  }

  const handleSubmit = e => {
    // TODO
    // submit how many to cart through store
  }

  return (
    <form className="HowManyModal" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="how-many">How Many?</label>
        <input
          type="number"
          id="how-many"
          min="1"
          value={howMany}
          onChange={e => handleOnChange(e)}
        />
      </div>
      <button>Add To Cart</button>
    </form>
  );
};

export default HowManyModal;