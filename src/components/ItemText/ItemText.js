import React from 'react';
import './ItemText.css';

const ItemText = ({ className, text }) => {
  const classes = className ? `ItemText ${className}` : 'ItemText';
  return (
    <span className={classes}>
      {text}
    </span>
  );
};

export default ItemText;