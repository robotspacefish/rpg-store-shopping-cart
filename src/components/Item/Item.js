import React from 'react';
import './Item.css';

const Item = props => (
  <li className="Item">
    <span>{props.name}</span>
    <span>{props.price}g</span>
  </li>
);

export default Item;