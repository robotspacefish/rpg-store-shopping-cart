import React, { useState, useReducer } from 'react';
import Items from '../Items/Items';
import HowManyModal from '../HowManyModal/HowManyModal';

import { addUpdate, deleteUpdate } from '../../helpers/cartHelpers';

import './Store.css';

const itemClickedReducer = (currentItemClicked, action) => {
  switch (action.type) {
    case 'SET':
      return {
        isModalVisible: true,
        modalType: action.modalType,
        item: action.item
      }
    case 'CLEAR':
      return {
        isModalVisible: false,
        modalType: null,
        item: null
      }
    default:
      throw new Error('There was a problem.');
  }
};

const Store = props => {
  const [cart, setCart] = useState([]);
  const [itemClicked, dispatchItemClicked] = useReducer(itemClickedReducer, { isModalVisible: false, modalType: null, item: null });

  const handleItemClicked = (item) => {
    const modalType = item.hasOwnProperty('quantity') ? 'remove' : 'add';

    dispatchItemClicked({ type: 'SET', item, modalType })
  };

  const clearItemClicked = () => dispatchItemClicked({ type: 'CLEAR' });

  const updateCart = (itemToUpdate, quantity) => {
    let itemFoundInCart = cart.find(item => item.name === itemToUpdate.name);

    let updatedCart = itemClicked.modalType === 'add' ?
      addUpdate(cart, itemFoundInCart, quantity, itemClicked.item) :
      deleteUpdate(cart, itemFoundInCart, quantity);

    setCart(updatedCart);
    clearItemClicked();
  };

  const renderModal = () => {
    const modalType = itemClicked.modalType;
    const buttonText = modalType === 'add' ?
      'Add to Cart' : 'Remove from Cart';

    return (
      <HowManyModal
        itemClicked={itemClicked.item}
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
        <Items handleItemClicked={handleItemClicked} />

        {itemClicked.isModalVisible && renderModal()}

        <Items
          cart={cart}
          handleItemClicked={handleItemClicked}
        />
      </div>
    </div>
  );
};

export default Store;