import { ACTIONS } from '../helpers/constants';
import { addToCart, updateQuantity, removeFromCart } from '../helpers/cartHelpers';

export default function cartReducer(cart, action) {

  switch (action.type) {
    case ACTIONS.ADD_TO_CART:

      return addToCart(cart, action.payload.item, action.payload.qty)

    case ACTIONS.UPDATE_QUANTITY:

      return updateQuantity(cart, action.payload.item, action.payload.qty)

    case ACTIONS.REMOVE_FROM_CART:

      return removeFromCart(cart, action.payload.item, action.payload.qty)

    default:

      return cart;
  }

};
