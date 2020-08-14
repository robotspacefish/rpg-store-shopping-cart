import React from 'react';
import './ItemText.css';

const ItemText = props => {
  const classes = props.className ? `ItemText ${props.className}` : 'ItemText';
  return (
    <span className={classes}>
      {props.text}
    </span>
  );
};

export default ItemText;