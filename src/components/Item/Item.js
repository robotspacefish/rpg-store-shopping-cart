import React from 'react';
import ItemText from '../ItemText/ItemText';
import './Item.css';

const Item = props => (
  <li className="Item" onClick={() => props.handleOnClick({ name: props.name, price: props.price })}>
    <ItemText text={props.name} />
    <ItemText text={`${props.price}g`} />
  </li>
);

export default Item;