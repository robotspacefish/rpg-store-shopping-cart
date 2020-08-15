import React, { useState } from 'react';
import ItemText from '../ItemText/ItemText';
import './CartItem.css';

const CartItem = props => {
  const [isMousedOver, setIsMousedOver] = useState(false);
  const [howMany, setHowMany] = useState(1);
  const handleOnChange = e => {
    setHowMany(parseInt(e.target.value))
  }

  const handleDelete = e => {
    e.preventDefault();
    props.deleteFromCart(props.name, howMany);
    setIsMousedOver(false);
    setHowMany(1);
  }

  const renderRemoveForm = () => {
    return (
      <form className="CartItem__removeButton" onSubmit={handleDelete}>
        <label>Remove {props.name}(s)?</label>
        <div>
          x<input type="number" min="1" max={props.quantity} value={howMany}
            onChange={e => handleOnChange(e)} />
        </div>
        <button>Remove</button>
      </form>
    );
  }

  const renderItemText = () => {
    return (
      <>
        <ItemText text={props.name} className={'left'} />
        <ItemText text={`x${props.quantity}`} className={'center'} />
        <ItemText text={`${props.totalCost}g`} className={'right'} />
      </>
    );
  };

  return (
    <li className="CartItem"
      onMouseEnter={(e) => setIsMousedOver(true)}
      onMouseLeave={(e) => setIsMousedOver(false)}
    >

      {isMousedOver && renderRemoveForm()}

      {renderItemText()}


    </li >
  );
};
export default CartItem;