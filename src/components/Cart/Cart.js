import React from 'react';
import CartItem from '../CartItem/CartItem';

const Cart = props => {
  const renderCartItems = () => (
    props.cart.map(item => (
      <CartItem key={item} {...item} />
    ))
  );

  return (
    <div className="Cart">
      <h2>Cart</h2>
      {renderCartItems()}
    </div>
  );
};

export default Cart;