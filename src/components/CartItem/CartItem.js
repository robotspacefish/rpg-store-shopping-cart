import React, { useState } from 'react';
import ItemText from '../ItemText/ItemText';
import './CartItem.css';

const CartItem = props => {
  const [isMousedOver, setIsMousedOver] = useState(false);

  const renderRemoveButton = () => {
    console.log('rendering button')
    return <div className="CartItem__removeButton" onClick={() => props.deleteFromCart(props.name)}>Remove</div>
  }

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
      onMouseEnter={(e) => setIsMousedOver(true)}
      onMouseLeave={(e) => setIsMousedOver(false)}
    >

      {isMousedOver && renderRemoveButton()}

      {renderItemText()}


    </li >
  );
};
export default CartItem;