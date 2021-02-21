import React from 'react';
import './Item.css';
import { ACTIONS } from '../Store/Store';
import { MODAL } from '../Store/Store';

const Item = ({ item, className, dispatch, children }) => {
  return (
    <li className={className}
      onClick={() => (
        dispatch({ type: ACTIONS.SET, modalType: MODAL.ADD, item })
      )}
    >
      {children}
    </li>
  )
};

export default Item;