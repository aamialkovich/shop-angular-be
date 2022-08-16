export const parseProduct = (product) => {
  try {
    const parsedProduct = JSON.parse(product);
    return {
      ...parsedProduct,
      count: parseInt(parsedProduct.count),
      price: parseFloat(parsedProduct.price),
    };
  } catch {
    return {};
  }
};
