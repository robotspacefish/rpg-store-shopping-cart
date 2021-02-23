import React from 'react'
import ItemList from '../ItemList/ItemList';
import { STORE_ITEMS } from '../../helpers/constants';
import { MODAL } from '../../helpers/constants';

const InventoryItems = ({ dispatch }) => {
  return (
    <div className="Inventory items-container">
      <h2>Inventory</h2>

      <ItemList
        type="Inventory"
        items={STORE_ITEMS}
        dispatch={dispatch}
        modalType={MODAL.ADD}
      />
    </div>
  )
}

export default InventoryItems;
