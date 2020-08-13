import React, { useState } from 'react';
import Inventory from '../Inventory/Inventory';
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

  const addToCart = () => {
    setIsModalVisible(false);
    setCart(prevCart => [...prevCart, itemClicked])
  };

  return (
    <div className="Store">
      <div className="Store__Inventory">
        <Inventory
          handleItemClicked={handleItemClicked}
        />

        {isModalVisible && <HowManyModal addToCart={addToCart} />}
      </div>
    </div>
  );
};

export default Store;