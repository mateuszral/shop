import { createStore, createHook } from 'react-sweet-state';

import { fetchData } from 'helpers';

const itemsStore = createStore({
  initialState: {
    items: [],
    cart: [],
  },
  actions: {
    fetchItems: () => ({ setState }) => {
      fetchData('products').then((data) => setState({ items: data }));
    },
    addToCart: ({ id, title, description, price, image }) => ({ setState, getState }) => {
      const itemExists = getState().cart.findIndex(({ itemId }) => itemId === id) >= 0;
      if (!itemExists) {
        const item = { itemId: id, title, description, price, image, quantity: 1 };
        setState({ cart: [...getState().cart, item] });
      } else {
        const newCart = getState().cart.map((item) => {
          if (item.itemId === id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
        setState({ cart: [...newCart] });
      }
    },
    changeItemQuantity: (id, action) => ({ setState, getState }) => {
      const newCart = getState().cart.map((item) => {
        if (item.itemId === id) {
          if (action === 'decrease') {
            if (item.quantity > 1) {
              return {
                ...item,
                quantity: item.quantity - 1,
              };
            }
            return item;
          }
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      setState({ cart: [...newCart] });
    },
    removeItemFromCart: (id) => ({ setState, getState }) => {
      setState({ cart: [...getState().cart.filter(({ itemId }) => itemId !== id)] });
    },
  },
  name: 'items',
});

export const useItems = createHook(itemsStore);
