import React from 'react';
import Item from '../Item/Item';
import { items } from '../../helpers/inventoryHelpers';
import './Inventory.css';

const Inventory = props => {
  const renderItems = (items) => {
    return items.map((item, index) => (
      <Item
        key={index}
        name={item.name}
        price={item.price}
        handleOnClick={handleOnClick}
      />
    ))
  };

  const handleOnClick = (item) => {
    props.handleItemClicked(item);
  };

  return (
    <div className="Inventory items-container">
      <h2>Inventory</h2>
      <ul className="Inventory__list">
        {renderItems(items)}
      </ul>
    </div>
  );
};

export default Inventory;