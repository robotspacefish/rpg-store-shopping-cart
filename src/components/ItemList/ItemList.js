import React from 'react'
import Item from '../Item/Item';
import ItemText from '../ItemText/ItemText';
import { multiplier } from '../../helpers/cartHelpers';
import './ItemList.css';

const ItemList = ({ type, items, dispatch, isCart }) => {
  return (
    <ul className={`${type}__list`}>
      {
        items.map(item => (
          <Item
            item={item}
            dispatch={dispatch}
            className={`${type}Item`}
          >
            <ItemText text={item.name} />
            {
              isCart ?
                (
                  <>
                    <ItemText text={`x${item.quantity}`} />
                    <ItemText text={`${multiplier(item.price, item.quantity)}g`} />
                  </>
                )
                :
                <ItemText text={`${item.price}g`} />
            }
          </Item>
        ))
      }
    </ul>
  )
}

export default ItemList;
