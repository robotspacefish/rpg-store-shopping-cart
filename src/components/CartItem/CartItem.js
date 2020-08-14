import React from 'react';
import ItemText from '../ItemText/ItemText';
import './CartItem.css';

const handleMouseOver = (e) => {
  // TODO delete text
};

const CartItem = props => (
  <li className="CartItem" onMouseOver={handleMouseOver}
    onClick={() => props.deleteFromCart(props.name)}>
    <ItemText text={props.name} />
    <ItemText text={`x${props.quantity}`} />
    <ItemText text={`${props.totalCost}g`} />
  </li>
);

export default CartItem;