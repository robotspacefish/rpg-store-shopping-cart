import React, { useState, useReducer } from 'react';
import Inventory from '../Inventory/Inventory';
import Cart from '../Cart/Cart';
import HowManyModal from '../HowManyModal/HowManyModal';

import { addUpdate, deleteUpdate } from '../../helpers/cartHelpers';

import './Store.css';

const itemClickedReducer = (currentItemClicked, action) => {
  switch (action.type) {
    case 'SET':
      return {
        isModalVisible: true,
        modalType: action.modalType,
        itemClicked: action.itemClicked
      }
    case 'CLEAR':
      return {
        isModalVisible: false,
        modalType: null,
        itemClicked: null
      }
    default:
      throw new Error('There was a problem.');
  }
};

const Store = props => {
  const [cart, setCart] = useState([]);
  const [itemClicked, dispatchItemClicked] = useReducer(itemClickedReducer, { isModalVisible: false, modalType: null, itemClicked: null });

  const handleItemClicked = (item) => {
    const modalType = item.hasOwnProperty('quantity') ? 'remove' : 'add';

    dispatchItemClicked({ type: 'SET', itemClicked: item, modalType })
  };

  const clearItemClicked = () => dispatchItemClicked({ type: 'CLEAR' });

  const updateCart = (itemToUpdate, quantity) => {
    let itemFoundInCart = cart.find(item => item.name === itemToUpdate.name);
    let updatedCart = itemClicked.modalType === 'add' ?
      addUpdate(cart, itemFoundInCart, quantity, itemClicked.itemClicked) :
      deleteUpdate(cart, itemFoundInCart, quantity);

    setCart(updatedCart);
    clearItemClicked();
  }

  const renderModal = () => {
    const modalType = itemClicked.modalType;
    const buttonText = modalType === 'add' ? 'Add to Cart' : 'Remove from Cart';

    return (
      <HowManyModal
        itemClicked={itemClicked.itemClicked}
        submitCallback={updateCart}
        cancelCallback={clearItemClicked}
        buttonText={buttonText}
        modalType={itemClicked.modalType}
      />
    );
  }

  return (
    <div className="Store">
      <div className="Store__Inventory">
        <Inventory
          handleItemClicked={handleItemClicked}
        />

        {
          itemClicked.isModalVisible &&
          renderModal()
        }
        <Cart
          cart={cart}
          handleItemClicked={handleItemClicked}
        />
      </div>
    </div>
  );
};

export default Store;