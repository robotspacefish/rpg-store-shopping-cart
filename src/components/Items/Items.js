import React from 'react'
import Item from '../Item/Item';
import ItemText from '../ItemText/ItemText';

import { multiplier, total } from '../../helpers/cartHelpers';
import { STORE_ITEMS } from '../../helpers/inventoryHelpers';

import './Items.css';

const Items = props => {
  const isCart = props.hasOwnProperty('cart');
  const type = isCart ? 'Cart' : 'Inventory';
  const items = isCart ? [...props.cart] : [...STORE_ITEMS];

  const handleOnClick = (item) => props.handleItemClicked(item);

  const renderItems = () => (
    items.map((item, index) => renderItem(item, index))
  );

  const renderItem = (item, index) => (
    <Item key={index} item={item}
      className={`${type}Item`} handleOnClick={handleOnClick} >
      <ItemText text={item.name} />

      {
        isCart ? (
          <>
            <ItemText text={`x${item.quantity}`} />
            <ItemText text={`${multiplier(item.price, item.quantity)}g`} />
          </>
        )
          :
          <ItemText text={`${item.price}g`} />
      }

    </Item>
  );

  const renderTotal = () => (
    <div className="Cart__total">
      <span>TOTAL:</span>
      <span>{items.length !== 0 ? total(items) : 0}g</span>
    </div>
  );

  return (
    <div className={`${type} items-container`}>
      <h2>{type}</h2>
      <ul className={`${type}__list`}>
        {renderItems()}
      </ul>

      {isCart && renderTotal()}
    </div>
  );

};

export default Items;