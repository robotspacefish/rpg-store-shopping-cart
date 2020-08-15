import React, { useState, useReducer } from 'react';
import Inventory from '../Inventory/Inventory';
import Cart from '../Cart/Cart';
import HowManyModal from '../HowManyModal/HowManyModal';
import './Store.css';

const itemClickedReducer = (currentItemClicked, action) => {
  switch (action.type) {
    case 'SET':
      return { isModalVisible: true, itemClicked: action.itemClicked }
    case 'CLEAR':
      return { isModalVisible: false, itemClicked: null }
    default:
      throw new Error('There was a problem.');
  }
};

const Store = props => {
  const [cart, setCart] = useState([]);
  const [itemClicked, dispatchItemClicked] = useReducer(itemClickedReducer, { isModalVisible: false, itemClicked: null });

  const handleItemClicked = (item) => (
    dispatchItemClicked({ type: 'SET', itemClicked: item })
  );

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

  const deleteFromCart = (itemName, quantityToRemove) => {
    let itemFromCart = cart.find(i => i.name === itemName);

    if (itemFromCart.quantity === quantityToRemove) {
      // delete entire item
      setCart(prevState => (
        prevState.filter(item => item.name !== itemName)
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
  };

  const clearItemClicked = () => dispatchItemClicked({ type: 'CLEAR' });

  return (
    <div className="Store">
      <div className="Store__Inventory">
        <Inventory
          handleItemClicked={handleItemClicked}
        />

        {itemClicked.isModalVisible && <HowManyModal itemClicked={itemClicked.itemClicked} addToCart={addToCart} cancelAddToCart={clearItemClicked} />}
        <Cart cart={cart} deleteFromCart={deleteFromCart} />
      </div>
    </div>
  );
};

export default Store;