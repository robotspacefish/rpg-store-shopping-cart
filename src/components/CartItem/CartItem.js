import React, { useState } from 'react';
import ItemText from '../ItemText/ItemText';
import HowManyModal from '../HowManyModal/HowManyModal';
import './CartItem.css';

const CartItem = props => {
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
      onClick={() => props.handleOnClick({ name: props.name, price: props.price, quantity: props.quantity })}
    >
      {renderItemText()}
    </li >
  );
};
export default CartItem;