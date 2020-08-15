import React from 'react';
import CartItem from '../CartItem/CartItem';
import './Cart.css';

const multiplier = (price, qty) => price * qty;

const reducer = (accumulator, currentValue) => (
  accumulator + multiplier(currentValue.price, currentValue.quantity)
);

const Cart = props => {
  const renderCartItems = () => (
    props.cart.map(item => (
      <CartItem key={item.name}
        name={item.name}
        quantity={item.quantity}
        totalCost={multiplier(item.price, item.quantity)}
        deleteFromCart={props.deleteFromCart}
        handleOnClick={handleOnClick}
      />
    ))
  );

  const handleOnClick = item => {
    props.handleItemClicked(item);
  }

  const total = () => props.cart.reduce(reducer, 0);

  return (
    <div className="Cart items-container">
      <div className="Cart__content">
        <h2>Cart</h2>
        <ul>
          {renderCartItems()}
        </ul>
      </div>

      <div className="Cart__total">
        <span>TOTAL:</span>
        <span>{props.cart.length !== 0 ? total() : 0}g</span>
      </div>

    </div>
  );
};

export default Cart;