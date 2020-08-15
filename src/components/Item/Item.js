import React from 'react';
import './Item.css';

const Item = props => {
  const { handleOnClick, item, className } = props;

  return (
    <li className={className} onClick={() => handleOnClick(item)}>
      {props.children}
    </li>
  );
};

export default Item;