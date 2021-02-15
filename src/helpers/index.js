import axios from 'axios';

const baseURL = 'https://stickers-shopv1.herokuapp.com/';

export const fetchData = async (name) => {
  try {
    const { data } = await axios.get(`${baseURL}${name}`);
    return data;
  } catch (err) {
    return err;
  }
};

export const getTotalPrice = (cart) => {
  let totalPrice = 0;
  cart.forEach(({ price, quantity }) => {
    totalPrice += price * quantity;
  });
  return totalPrice.toFixed(2);
};
