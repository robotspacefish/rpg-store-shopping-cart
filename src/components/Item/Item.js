import React from 'react';
import './Item.css';

const Item = props => (
  <div className="Item">
    <div className="Item__name">
      {props.name}
    </div>

    <div className="Item__price">
      {props.price}g
    </div>
  </div>
);

export default Item;