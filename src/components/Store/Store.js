import React, { useState } from 'react';
import Inventory from '../Inventory/Inventory';
import Cart from '../Cart/Cart';
import HowManyModal from '../HowManyModal/HowManyModal';
import './Store.css';

const Store = props => {
  const [cart, setCart] = useState([]);
  const [itemClicked, setItemClicked] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleItemClicked = (item) => {
    setItemClicked(item);
    setIsModalVisible(true);
  }

  const addToCart = quantity => {
    // TODO if item is already in cart, add to quantity
    closeModal();
    setCart(prevCart => [...prevCart, { ...itemClicked, quantity }])
    setItemClicked(null);
  };

  const deleteFromCart = itemName => {
    setCart(prevState => (
      prevState.filter(item => item.name !== itemName)
    ))
  };

  const closeModal = () => setIsModalVisible(false);

  const cancelAddToCart = () => {
    setItemClicked(null);
    closeModal();
  };

  return (
    <div className="Store">
      <div className="Store__Inventory">
        <Inventory
          handleItemClicked={handleItemClicked}
        />

        {isModalVisible && <HowManyModal addToCart={addToCart} cancelAddToCart={cancelAddToCart} />}
        <Cart cart={cart} deleteFromCart={deleteFromCart} />
      </div>
    </div>
  );
};

export default Store;