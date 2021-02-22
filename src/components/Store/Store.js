import React, { useReducer } from 'react';
import InventoryItems from '../InventoryItems/InventoryItems';
import CartItems from '../CartItems/CartItems';
import HowManyModal from '../HowManyModal/HowManyModal';

import './Store.css';

export const ACTIONS = {
  SET: 'set',
  CLEAR: 'clear',
  ADD_TO_CART: 'add-to-cart',
  REMOVE_FROM_CART: 'remove-from-cart',
  UPDATE_QUANTITY: 'update-quantity'
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
      return currentItemClicked
  }
};

const cartReducer = (cart, action) => {

  switch (action.type) {
    case ACTIONS.ADD_TO_CART:
      return addToCart(cart, action.payload.item, action.payload.qty)
    case ACTIONS.UPDATE_CART_ITEM:
      return updateQuantity(cart, action.payload.item, action.payload.qty)
    case ACTIONS.REMOVE_FROM_CART:
      return removeFromCart(cart, action.payload.item, action.payload.qty)
    default:
      return cart;
  }
};

function removeFromCart(cart, item, quantity) {
  if (item.quantity === quantity) {
    // remove entire item
    return cart.filter(i => i.name !== item.name);
  }

  // remove quantity from item
  return cart.map(i => (
    i.name === item.name ?
      { ...i, quantity: i.quantity -= quantity }
      :
      i
  ))
}

function updateQuantity(cart, item, quantity) {
  return cart.map(i => (
    i.name === item.name ?
      { ...i, quantity: i.quantity += quantity } : i
  ))
}

/**
 * Add new item to cart or update existing item quantity
 * @param {Array} cart
 * @param {Object} item
 * @param {Number} quantity
 * @return {Array} if cart is empty, return an array with the new item only
 * @return {Array} existing cart with new item added
 * @return {Array} cart with existing item quantity updated
 */
function addToCart(cart, item, quantity) {
  // if (cart.length > 0) debugger
  if (cart.length === 0) return [{ ...item, quantity }];

  const foundItem = cart.find(i => i.name === item.name);
  if (!foundItem) return [...cart, { ...item, quantity }];

  return updateQuantity(cart, item, quantity);
}

const Store = () => {
  const [cart, dispatchCart] = useReducer(cartReducer, []);

  const [itemClicked, dispatchItemClicked] = useReducer(itemClickedReducer, { isModalVisible: false, modalType: null, item: null });

  const clearItemClicked = () => dispatchItemClicked({ type: ACTIONS.CLEAR });

  const removeItemClickedFromCart = (item, qty) => dispatchCart({ type: ACTIONS.REMOVE_FROM_CART, payload: { item, qty } });

  const handleSubmitItem = (qty) => {
    if (itemClicked.modalType === MODAL.ADD) {
      return handleAddToCart(itemClicked.item, qty);
    }

    removeItemClickedFromCart(itemClicked.item, qty, dispatchCart);

  };

  const handleAddToCart = (item, qty) => {
    const itemExists = cart.find(i => i.name === item);

    const type = itemExists ? ACTIONS.UPDATE_QUANTITY : ACTIONS.ADD_TO_CART;

    dispatchCart({ payload: { item, qty }, type });
  }

  const renderModal = () => {
    const modalType = itemClicked.modalType;
    const buttonText = modalType === MODAL.ADD ?
      'Add to Cart' : 'Remove from Cart';

    return (
      <HowManyModal
        modalType={itemClicked.modalType}
        itemClicked={itemClicked.item}
        handleAddToCart={handleAddToCart}
        handleSubmitItem={handleSubmitItem}
        clearItemClicked={clearItemClicked}
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