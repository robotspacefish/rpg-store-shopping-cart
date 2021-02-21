import React, { useState, useReducer } from 'react';
import Items from '../Items/Items';
import HowManyModal from '../HowManyModal/HowManyModal';

import { addUpdate, deleteUpdate } from '../../helpers/cartHelpers';

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
  switch (action.type) {
    case ACTIONS.ADD_TO_CART:
      return addToCart(cart, action.payload.item, action.payload.qty)

    case ACTIONS.REMOVE_FROM_CART:
    // TODO
    default:
      return cart;
  }
};

/**
 * Add new item to cart or update existing item quantity
 * @param {Array} cart
 * @param {Object} item
 * @param {Number} quantity
 * @return {Array} if cart is empty, return an array with the new item only
 * @return {Array} cart with either existing item quantity updated or new item added
 */
function addToCart(cart, item, quantity) {

  if (cart.length === 0) return [{ ...item, quantity }];

  return cart.map(i => (
    i.name === item.name ?
      { ...i, quantity: i.quantity += quantity }
      :
      { ...item, quantity }
  ));
}

const Store = () => {
  const [cart2, dispatchCart] = useReducer(cartReducer, []);
  const [cart, setCart] = useState([])
  const [itemClicked, dispatchItemClicked] = useReducer(itemClickedReducer, { isModalVisible: false, modalType: null, item: null });

  const handleItemClicked = (item) => {
    const modalType = item.hasOwnProperty('quantity') ? MODAL.REMOVE : MODAL.ADD;

    dispatchItemClicked({ type: ACTIONS.SET, item, modalType })
  };

  const clearItemClicked = () => dispatchItemClicked({ type: ACTIONS.CLEAR });

  const updateCart = (itemToUpdate, quantity) => {
    let itemFoundInCart = cart.find(item => item.name === itemToUpdate.name);

    let updatedCart = itemClicked.modalType === MODAL.ADD ?
      addUpdate(cart, itemFoundInCart, quantity, itemClicked.item) :
      deleteUpdate(cart, itemFoundInCart, quantity);

    setCart(updatedCart);
    clearItemClicked();
  };

  const renderModal = () => {
    const modalType = itemClicked.modalType;
    const buttonText = modalType === MODAL.ADD ?
      'Add to Cart' : 'Remove from Cart';

    return (
      <HowManyModal
        itemClicked={itemClicked.item}
        dispatchCart={dispatchCart}
        submitCallback={updateCart}
        cancelCallback={clearItemClicked}
        buttonText={buttonText}
        modalType={itemClicked.modalType}
      />
    );
  };

  return (
    <div className="Store">
      <div className="Store__Inventory">
        <Items
          dispatchItemClicked={dispatchItemClicked}
        />

        {itemClicked.isModalVisible && renderModal()}

        <Items
          cart={cart}
        />
      </div>
    </div>
  );
};

export default Store;