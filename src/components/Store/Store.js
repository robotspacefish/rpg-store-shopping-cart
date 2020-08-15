import React, { useState, useReducer } from 'react';
import Inventory from '../Inventory/Inventory';
import Cart from '../Cart/Cart';
import HowManyModal from '../HowManyModal/HowManyModal';
import './Store.css';

const itemClickedReducer = (currentItemClicked, action) => {
  switch (action.type) {
    case 'SET':
      return { isModalVisible: true, modalType: action.modalType, itemClicked: action.itemClicked }
    case 'CLEAR':
      return { isModalVisible: false, modalType: null, itemClicked: null }
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

  const updateCart = updatedItem => (
    cart.map(item => (
      item.name === updatedItem.name ?
        updatedItem : item
    ))
  );

  const addToCart = (itemToAdd, quantity) => {
    let itemFoundInCart = cart.find(item => item.name === itemToAdd.name);

    if (!itemFoundInCart) {
      setCart(prevCart => [...prevCart, { ...itemClicked.itemClicked, quantity }])
    } else {
      itemFoundInCart = { ...itemFoundInCart, quantity: itemFoundInCart.quantity + quantity }

      const updatedCart = updateCart(itemFoundInCart);
      setCart(updatedCart);
    }

    clearItemClicked();
  };

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
    const submitCallback = modalType === 'add' ? addToCart : deleteFromCart;
    const className = modalType === 'add' ? 'add-item' : 'remove-item';
    const buttonText = modalType === 'add' ? 'Add to Cart' : 'Remove from Cart';

    return (
      <HowManyModal
        itemClicked={itemClicked.itemClicked}
        submitCallback={submitCallback}
        cancelCallback={clearItemClicked}
        className={className}
        buttonText={buttonText}
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