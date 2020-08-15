import React, { useState, useReducer } from 'react';
import Inventory from '../Inventory/Inventory';
import Cart from '../Cart/Cart';
import HowManyModal from '../HowManyModal/HowManyModal';
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


  const mapUpdatedCart = (updatedItem, prop) => (
    cart.map(item => (
      item[prop] === updatedItem[prop] ?
        updatedItem : item
    ))
  );

  const updateCart = (itemToUpdate, quantity) => {
    let itemFoundInCart = cart.find(item => item.name === itemToUpdate.name);

    let updatedCart = itemClicked.modalType === 'add' ?
      addToCart(itemFoundInCart, quantity) :
      null;

    setCart(updatedCart);
    clearItemClicked();
  }

  const addToCart = (foundItem, quantity) => {
    return foundItem ?
      mapUpdatedCart({ ...foundItem, quantity: foundItem.quantity + quantity }, 'name') :
      [...cart, { ...itemClicked.itemClicked, quantity }];
  }

  const deleteFromCart = (itemToRemove, quantityToRemove) => {
    let itemFromCart = cart.find(i => i.name === itemToRemove.name);

    if (itemFromCart.quantity === quantityToRemove) {
      // delete entire item
      setCart(prevState => (
        prevState.filter(item => item.name !== itemToRemove.name)
      ))
    } else {
      // subtract quantity
      itemFromCart = { ...itemFromCart, quantity: itemFromCart.quantity - quantityToRemove }
      setCart(prevState => (
        prevState.map(prevItem => (
          prevItem.name === itemFromCart.name ? itemFromCart : prevItem)
        ))
      );

    }

    clearItemClicked();
  };

  const clearItemClicked = () => dispatchItemClicked({ type: 'CLEAR' });

  const renderModal = () => {
    const modalType = itemClicked.modalType;
    const submitCallback = modalType === 'add' ? updateCart : deleteFromCart;
    const buttonText = modalType === 'add' ? 'Add to Cart' : 'Remove from Cart';

    return (
      <HowManyModal
        itemClicked={itemClicked.itemClicked}
        submitCallback={submitCallback}
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
          deleteFromCart={deleteFromCart}
          handleItemClicked={handleItemClicked}
        />
      </div>
    </div>
  );
};

export default Store;