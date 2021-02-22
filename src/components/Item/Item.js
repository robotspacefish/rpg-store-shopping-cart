import React from 'react';
import './Item.css';
import { ACTIONS } from '../Store/Store';

const Item = ({ item, className, dispatch, modalType, children }) => {
  return (
    <li className={className}
      onClick={() => (
        dispatch({ type: ACTIONS.SET, modalType, item })
      )}
    >
      {children}
    </li>
  )
};

export default Item;