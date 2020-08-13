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

  const addToCart = (quantity) => {
    // TODO if item is already in cart, add to quantity
    setIsModalVisible(false);
    setCart(prevCart => [...prevCart, { ...itemClicked, quantity }])
  };

  return (
    <div className="Store">
      <div className="Store__Inventory">
        <Inventory
          handleItemClicked={handleItemClicked}
        />

        {isModalVisible && <HowManyModal addToCart={addToCart} />}
        <Cart cart={cart} />
      </div>
    </div>
  );
};

export default Store;