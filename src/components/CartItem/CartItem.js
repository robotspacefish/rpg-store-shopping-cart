import React, { useState } from 'react';
import ItemText from '../ItemText/ItemText';
import './CartItem.css';

const CartItem = props => {
  const [isMousedOver, setIsMousedOver] = useState(true);

  const renderRemoveButton = () => {
    return <button className="CartItem__removeButton" onClick={() => props.deleteFromCart(props.name)}>Remove</button>
  }

  return (
    <li className="CartItem"
      onMouseEnter={(e) => setIsMousedOver(true)}
      onMouseLeave={(e) => setIsMousedOver(false)}
    >

      {isMousedOver && renderRemoveButton()}

      <ItemText text={props.name} />
      <ItemText text={`x${props.quantity}`} />
      <ItemText text={`${props.totalCost}g`} />
    </li >
  );
};
export default CartItem;