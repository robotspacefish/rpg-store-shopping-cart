import React from 'react';
import Item from '../Item/Item';
import { items } from '../../helpers/inventoryHelpers';
import './Inventory.css';

const renderItems = (items) => {
  return items.map((item, index) => <Item key={index} name={item.name} price={item.price} />)
};

const Inventory = props => {
  return (
    <div className="Inventory">
      <h1>Inventory</h1>
      {renderItems(items)}
    </div>
  );
};

export default Inventory;