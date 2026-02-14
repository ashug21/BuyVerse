export const getRelatedProducts = (products, currentProductId) => {
    const currentProduct = products.find(
      (product) => product.id === currentProductId
    );
  
    if (!currentProduct) return [];
  
    return products
      .filter(
        (product) =>
          product.category === currentProduct.category &&
          product.id !== currentProductId
      )
      .slice(0, 5);
  };
  