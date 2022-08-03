const utilServices = {
  toCamelCase: (object) => {
    const convert = {
      saleId: object.sale_id,
      date: object.date,
      productId: object.product_id,
      quantity: object.quantity,
    };
    const { date, productId, quantity } = convert;
    return object.sale_id ? convert : { date, productId, quantity };
  },
};

module.exports = utilServices;