import React, { useState } from 'react';
import ItemText from '../ItemText/ItemText';
import HowManyModal from '../HowManyModal/HowManyModal';
import './CartItem.css';

const CartItem = props => {
  const renderItemText = () => {
    return (
      <>
        <ItemText text={props.name} className={'left'} />
        <ItemText text={`x${props.quantity}`} />
        <ItemText text={`${props.totalCost}g`} />
      </>
    );
  };

  return (
    <li className="CartItem"
      onClick={() => props.handleOnClick({ name: props.name, price: props.price, quantity: props.quantity })}
    >
      {renderItemText()}
    </li >
  );
};
export default CartItem;