export const multiplier = (price, qty) => price * qty;

export const reducer = (accumulator, currentValue) => (
  accumulator + multiplier(currentValue.price, currentValue.quantity)
);

export const total = (cart) => cart.reduce(reducer, 0);
