import React from 'react';

//TODO - merge with Item later
// For now, use this to display item name and price x quantity
// click to delete?

const handleMouseOver = (e) => {
  // TODO delete text
};

const CartItem = props => (
  <div className="CartItem">
    <li className="Item" onMouseOver={handleMouseOver}
      onClick={() => props.deleteFromCart(props.name)}>
      <span>{props.name}</span>
      <span>{props.totalCost}g</span>
    </li>
  </div>
);

export default CartItem;