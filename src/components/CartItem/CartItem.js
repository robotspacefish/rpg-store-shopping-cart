import React from 'react';
import './CartItem.css';

//TODO - merge with Item later
// For now, use this to display item name and price x quantity
// click to delete?

const handleMouseOver = (e) => {
  // TODO delete text
};

const CartItem = props => (
  <li className="CartItem" onMouseOver={handleMouseOver}
    onClick={() => props.deleteFromCart(props.name)}>
    <span>{props.name}</span>
    <span>{`x${props.quantity}`}</span>
    <span>{`${props.totalCost}g`}</span>
  </li>
);

export default CartItem;