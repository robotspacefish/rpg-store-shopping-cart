import React from 'react'
import ItemList from '../ItemList/ItemList';
import { total } from '../../helpers/cartHelpers';
import { MODAL } from '../../helpers/constants';

const CartItems = ({ items, dispatch }) => (
  <div className="Cart items-container">
    <h2>Cart</h2>

    <ItemList
      type="Cart"
      items={items}
      dispatch={dispatch}
      modalType={MODAL.REMOVE}
      isCart
    />

    <div className="Cart__total">
      <span>TOTAL:</span>
      <span>{total(items)}g</span>
    </div>
  </div>
);


export default CartItems;
