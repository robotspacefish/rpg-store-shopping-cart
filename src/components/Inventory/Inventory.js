import React from 'react';
import Item from '../Item/Item';
import ItemText from '../ItemText/ItemText';
import { items } from '../../helpers/inventoryHelpers';
import './Inventory.css';

const Inventory = props => {
  const handleOnClick = (item) => props.handleItemClicked(item);

  const renderItems = (items) => (
    items.map((item, index) => renderItem(item, index))
  );

  const renderItem = (item, index) => (
    <Item key={index} item={item}
      className="Item" handleOnClick={handleOnClick} >
      <ItemText text={item.name} />
      <ItemText text={`${item.price}g`} />
    </Item>
  );


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