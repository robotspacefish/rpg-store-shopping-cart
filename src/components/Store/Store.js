import React, { useReducer } from 'react';
import InventoryItems from '../InventoryItems/InventoryItems';
import CartItems from '../CartItems/CartItems';
import HowManyModal from '../HowManyModal/HowManyModal';

import './Store.css';

export const ACTIONS = {
  SET: 'set',
  CLEAR: 'clear',
  ADD_TO_CART: 'add-to-cart',
  REMOVE_FROM_CART: 'remove-from-cart'
}

export const MODAL = {
  ADD: 'add',
  REMOVE: 'remove'
}

const itemClickedReducer = (currentItemClicked, action) => {
  console.log('itemClickedReducer')
  switch (action.type) {
    case ACTIONS.SET:
      return {
        isModalVisible: true,
        modalType: action.modalType,
        item: action.item
      }
    case ACTIONS.CLEAR:
      return {
        isModalVisible: false,
        modalType: null,
        item: null
      }
    default:
      throw new Error('There was a problem.');
  }
};

const cartReducer = (cart, action) => {
  console.log('cartReducer')
  switch (action.type) {
    case ACTIONS.ADD_TO_CART:
      return addToCart(cart, action.payload.item, action.payload.qty)
    case ACTIONS.REMOVE_FROM_CART:
      return removeFromCart(cart, action.payload.item, action.payload.qty)
    default:
      return cart;
  }
};

function removeFromCart(cart, item, quantity) {
  console.log('remove x', quantity, item, ' from cart')
  if (item.quantity === quantity) {
    // remove entire item
    return cart.filter(i => i.name !== item.name);
  }

  // remove quantity from item
  return cart.map(i => (
    i.name === item.name ?
      { ...i, quantity: i.quantity -= quantity }
      :
      item
  ))
}

/**
 * Add new item to cart or update existing item quantity
 * @param {Array} cart
 * @param {Object} item
 * @param {Number} quantity
 * @return {Array} if cart is empty, return an array with the new item only
 * @return {Array} cart with either existing item quantity updated or new item added
 */
function addToCart(cart, item, quantity) {
  console.log('adding x', quantity, item, ' to cart')
  if (cart.length === 0) return [{ ...item, quantity }];

  return cart.map(i => (
    i.name === item.name ?
      { ...i, quantity: i.quantity += quantity }
      :
      { ...item, quantity }
  ));
}

const addItemClickedToCart = (item, qty, dispatch) => dispatch({ type: ACTIONS.ADD_TO_CART, payload: { item, qty } });

const removeItemClickedFromCart = (item, qty, dispatch) => dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: { item, qty } });

const Store = () => {
  console.log('Store')
  const [cart, dispatchCart] = useReducer(cartReducer, []);

  const [itemClicked, dispatchItemClicked] = useReducer(itemClickedReducer, { isModalVisible: false, modalType: null, item: null });

  const clearItemClicked = () => dispatchItemClicked({ type: ACTIONS.CLEAR });

  const submitItem = (qty) => {
    // debugger
    const fn = itemClicked.modalType === MODAL.ADD ? addItemClickedToCart : removeItemClickedFromCart;

    clearItemClicked();
    const item = itemClicked.item;

    fn(item, qty, dispatchItemClicked);

  };

  const renderModal = () => {
    const modalType = itemClicked.modalType;
    const buttonText = modalType === MODAL.ADD ?
      'Add to Cart' : 'Remove from Cart';

    return (
      <HowManyModal
        modalType={itemClicked.modalType}
        itemClicked={itemClicked.item}
        clearItemClicked={clearItemClicked}
        submitItem={submitItem}
        dispatchCart={dispatchCart}
        buttonText={buttonText}
      />
    );
  };

  return (
    <div className="Store">
      <div className="Store__Inventory">
        <InventoryItems dispatch={dispatchItemClicked} />

        {itemClicked.isModalVisible && renderModal()}

        <CartItems items={cart} dispatch={dispatchItemClicked} />
      </div>
    </div>
  );
};

export default Store;