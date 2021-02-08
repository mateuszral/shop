import { createStore, createHook } from 'react-sweet-state';
import axios from 'axios';

const itemsStore = createStore({
  initialState: {
    items: [],
  },
  actions: {
    fetchItems: () => ({ setState }) => {
      axios.get('http://localhost:1337/products').then(({ data }) => setState({ items: data }));
    },
  },
  name: 'items',
});

export const useItems = createHook(itemsStore);
