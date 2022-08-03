const productModel = require('../models/productModel');

const productService = {
  getAllProducts: async () => {
    const allProducts = await productModel.getAllProducts();
    return allProducts;
  },
  getProductById: async (id) => {
    const product = await productModel.getProductById(id);
    return product;
  },
  getProductByName: async (name) => {
    const result = await productModel.getProductByName(name);
    return result;
  },
  createProduct: async (product) => {
    const insertId = await productModel.createProduct(product);
    return insertId;
  },
  checkIfExists: (product) => {
    if (!product) {
      throw new Error('Product not found');
    }
    return true;
  },
  checkProduct: (product) => {
    if (!product.name) {
      throw new Error('"name" is required');
    }
    if (product.name.length < 5) {
      throw new Error('"name" length must be at least 5 characters long');
    }
    return true;
  },
  updateProduct: async (data, id) => {
    const affectedRows = await productModel.updateProduct(data, id);
    return affectedRows;
  },
  deleteProduct: async (id) => {
    const affectedRows = await productModel.deleteProduct(id);
    return affectedRows;
  },
};

module.exports = productService;