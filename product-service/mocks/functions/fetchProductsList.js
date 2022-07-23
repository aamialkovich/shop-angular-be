import products from '../data/products.json';

export const fetchProductsList = () => {
  return new Promise((resolve) => {
    resolve(products);
  });
};
