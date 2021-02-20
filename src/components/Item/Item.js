import React from 'react';
import './Item.css';

const Item = ({ handleOnClick, item, className, children }) => (
  <li className={className} onClick={() => handleOnClick(item)}>
    {children}
  </li>
);

export default Item;