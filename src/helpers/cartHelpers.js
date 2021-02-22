/**
 * Remove specified quantity of item from cart
 * @param {Array} cart
 * @param {Object} item
 * @return
 * @return
 */
export const removeFromCart = (cart, item) => {
  // if (item.quantity === quantity) {
  // remove entire item
  return cart.filter(i => i.name !== item.name);
  // }

  // remove quantity from item
  // return cart.map(i => (
  //   i.name === item.name ?
  //     { ...i, quantity: i.quantity -= quantity }
  //     :
  //     i
  // ))
}

/**
 * Add specified quantity to existing item in cart
 * @param {Array} cart
 * @param {Object} item
 * @param {Number} quantity
 */
export const updateQuantity = (cart, item, quantity) => {

  return cart.map(i => (
    i.name === item.name ?
      { ...i, quantity: i.quantity += quantity } : i
  ))
}

/**
 * Add new item to cart or update existing item quantity
 * @param {Array} cart -
 * @param {Object} item - item to add
 * @param {Number} quantity
 * @return {Array} if cart is empty return new item in array
 * @return {Array} existing cart with new item added
 * @return {Array} cart with existing item quantity updated
 */
export const addToCart = (cart, item, quantity) => {
  if (cart.length === 0) return [{ ...item, quantity }];

  const foundItem = cart.find(i => i.name === item.name);
  if (!foundItem) return [...cart, { ...item, quantity }];

  return updateQuantity(cart, item, quantity);
}


export const multiplier = (price, qty) => price * qty;

export const reducer = (accumulator, currentValue) => (
  accumulator + multiplier(currentValue.price, currentValue.quantity)
);

export const total = (cart) => cart.reduce(reducer, 0);