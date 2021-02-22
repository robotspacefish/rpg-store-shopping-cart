import React, { useReducer } from 'react';
import InventoryItems from '../InventoryItems/InventoryItems';
import CartItems from '../CartItems/CartItems';
import HowManyModal from '../HowManyModal/HowManyModal';
import cartReducer from '../../reducers/cartReducer';
import itemClickedReducer from '../../reducers/itemClickedReducer';
import { ACTIONS, MODAL } from '../../helpers/constants';

import './Store.css';


const Store = () => {
  const [cart, dispatchCart] = useReducer(cartReducer, []);

  const [itemClicked, dispatchItemClicked] = useReducer(itemClickedReducer, { isModalVisible: false, modalType: null, item: null });

  const clearItemClicked = () => dispatchItemClicked({ type: ACTIONS.CLEAR });

  const removeItemClickedFromCart = (item, qty) => dispatchCart({ type: ACTIONS.REMOVE_FROM_CART, payload: { item, qty } });

  const handleSubmitItem = (qty) => {
    const fn = itemClicked.modalType === MODAL.ADD ?
      handleAddToCart : handleRemoveFromCart;

    fn(itemClicked.item, qty);
  };

  const handleRemoveFromCart = (item, qty) => {
    const removeAll = item.quantity === qty;

    if (removeAll) {
      dispatchCart({ type: ACTIONS.REMOVE_FROM_CART, payload: { item } })

    } else {
      dispatchCart({ type: ACTIONS.UPDATE_QUANTITY, payload: { qty: -qty, item } });
    }
  }

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
      <InventoryItems dispatch={dispatchItemClicked} />

      {itemClicked.isModalVisible && renderModal()}

      <CartItems items={cart} dispatch={dispatchItemClicked} />
    </div>
  );
};

export default Store;