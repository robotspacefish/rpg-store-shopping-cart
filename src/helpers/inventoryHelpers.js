// const db = 'https://rpg-store-shopping-cart.firebaseio.com/inventory.json';

// const postItemToDb = (db, item) => {
//   fetch(db, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(item)
//   })
//     .then(res => res.json())
//     .then(data => {
//       console.log(data)
//     })
// };

// export const addItemsToStore = (db, items) => {
//   items.forEach(item => postItemToDb(db, item))
// };

export const STORE_ITEMS = [
  { name: "Sword", price: 100 },
  { name: "Shield", price: 60 },
  { name: "Power Ring", price: 250 },
  { name: "Bow", price: 90 },
  { name: "Arrow", price: 5 },
  { name: "Bomb", price: 10 }
];
