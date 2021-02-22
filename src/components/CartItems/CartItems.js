import React from 'react'
import ItemList from '../ItemList/ItemList';
import { total } from '../../helpers/cartHelpers';
import { MODAL } from '../Store/Store';

const CartItems = ({ items, dispatch }) => (
  <div className="Cart items-container">
    <h2>Cart</h2>

    <ItemList
      type="Cart"
      items={items}
      dispatch={dispatch}
      isCart
      modalType={MODAL.REMOVE}
    />

    <div className="Cart__total">
      <span>TOTAL:</span>
      <span>{total(items)}g</span>
    </div>
  </div>
);


export default CartItems;
