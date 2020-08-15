import React from 'react';
import ItemText from '../ItemText/ItemText';
import './CartItem.css';

const CartItem = props => {
  const { item, handleOnClick, totalCost } = props;

  const renderItemText = () => {
    return (
      <>
        <ItemText text={item.name} />
        <ItemText text={`x${item.quantity}`} />
        <ItemText text={`${totalCost}g`} />
      </>
    );
  };

  return (
    <li className="CartItem" onClick={() => handleOnClick(item)}>
      {renderItemText()}
    </li >
  );
};
export default CartItem;