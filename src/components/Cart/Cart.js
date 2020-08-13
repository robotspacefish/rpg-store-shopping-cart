import React from 'react';
import CartItem from '../CartItem/CartItem';

const multiplier = (price, qty) => price * qty;

const reducer = (accumulator, currentValue) => (
  accumulator + multiplier(currentValue.price, currentValue.quantity)
);

const Cart = props => {

  const renderCartItems = () => (
    props.cart.map(item => (
      <CartItem key={item.name} name={item.name} totalCost={multiplier(item.price, item.quantity)} />
    ))
  );

  const total = () => props.cart.reduce(reducer, 0);

  return (
    <div className="Cart">
      <h2>Cart</h2>
      {renderCartItems()}

      <div>
        <span>TOTAL:</span>
        <span>{props.cart.length !== 0 ? total() : 0}g</span>
      </div>

    </div>
  );
};

export default Cart;