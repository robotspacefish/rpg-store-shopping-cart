import React from 'react';
import './Item.css';
import { ACTIONS } from '../Store/Store';
import { MODAL } from '../Store/Store';

const Item = ({ handleOnClick, item, className, children, dispatchItemClicked }) => {
  return (
    <li className={className}
      onClick={() => (
        dispatchItemClicked({ type: ACTIONS.SET, modalType: MODAL.ADD, item })
      )}
    >
      {children}
    </li>
  )
};

export default Item;