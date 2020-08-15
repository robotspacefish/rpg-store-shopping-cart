import React from 'react';
import Item from '../Item/Item';
import ItemText from '../ItemText/ItemText';

import { multiplier, total } from '../../helpers/cartHelpers';

import './Cart.css';

const Cart = props => {
  const handleOnClick = item => props.handleItemClicked(item);

  const renderItems = (items) => (
    items.map((item, index) => renderItem(item, index))
  );

  const renderItem = (item, index) => (
    <Item key={index} item={item}
      className="CartItem" handleOnClick={handleOnClick} >
      <ItemText text={item.name} />
      <ItemText text={`x${item.quantity}`} />
      <ItemText text={`${multiplier(item.price, item.quantity)}g`} />
    </Item>
  );

  return (
    <div className="Cart items-container">
      <div className="Cart__content">
        <h2>Cart</h2>
        <ul>
          {renderItems(props.cart)}
        </ul>
      </div>

      <div className="Cart__total">
        <span>TOTAL:</span>
        <span>{props.cart.length !== 0 ? total(props.cart) : 0}g</span>
      </div>

    </div>
  );
};

export default Cart;