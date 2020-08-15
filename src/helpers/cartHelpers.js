export const addUpdate = (cart, foundItem, quantity, itemClicked) => {
  return foundItem ?
    quantityUpdate(cart, foundItem, quantity) :
    [...cart, { ...itemClicked, quantity }];
}

export const deleteUpdate = (cart, foundItem, quantity) => {
  return foundItem.quantity === quantity ?
    cart.filter(item => item.name !== foundItem.name) :
    quantityUpdate(cart, foundItem, -quantity);
}

export const multiplier = (price, qty) => price * qty;

export const reducer = (accumulator, currentValue) => (
  accumulator + multiplier(currentValue.price, currentValue.quantity)
);

const mapUpdate = (cart, updatedItem, prop) => (
  cart.map(item => (
    item[prop] === updatedItem[prop] ?
      updatedItem : item
  ))
);

const quantityUpdate = (cart, foundItem, quantity) => {
  const updatedItem = { ...foundItem, quantity: foundItem.quantity + quantity };
  return mapUpdate(cart, updatedItem, 'name');
};