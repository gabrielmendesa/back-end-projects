const saleModel = require('../models/saleModel');
const utilServices = require('./util');

const saleService = {
  checkIfExist: (sale) => {
    if (sale.length < 1) throw new Error('Sale not found');
    return true;
  },
  getSaleById: async (id) => {
    const sale = await saleModel.getSaleById(id);
    return sale.map((item) => utilServices.toCamelCase(item));
  },
  checkSaleId: async (id) => {
    const sale = await saleModel.getSaleById(id);
    if (sale.length < 1) throw new Error('Sale not found');
    return true;
  },
  getAllSales: async () => {
    const allSales = await saleModel.getAllSales();
    return allSales.map((sale) => utilServices.toCamelCase(sale));
  },
  createSale: async (products) => {
    const saleId = await saleModel.createSale();
    const response = {
      id: saleId,
      itemsSold: [],
    };
    products.map(async (product) => {
      const { productId, quantity } = product;
      response.itemsSold.push({ productId, quantity });
      await saleModel.createSaleProduct(product, saleId);
    });
    return response;
  },
  checkIfExistProduct: async (products) => {
    const check = products.map(async (product) => saleModel.checkIfExistProduct(product.productId));
    const checkAll = await Promise.all(check);
    const doesNotExist = checkAll.some((value) => value === false);
    if (doesNotExist) {
      throw new Error('Product not found');
    }
    return true;
  },
  checkSaleProduct: (product) => {
    const { productId, quantity } = product;
    switch (true) {
      case !productId: throw new Error('"productId" is required');
      case quantity < 1: throw new Error('"quantity" must be greater than or equal to 1');
      case !quantity: throw new Error('"quantity" is required');
      default: return true;
    }
  },
  deleteSale: async (id) => {
    const affectedRows = await saleModel.deleteSale(id);
    if (affectedRows < 1) {
      throw new Error('Sale not found');
    }
    return true;
  },
  updateSale: async (products, saleId) => {
    const response = {
      saleId,
      itemsUpdated: [],
    };
    products.map(async (product) => {
      const { productId, quantity } = product;
      response.itemsUpdated.push({ productId, quantity });
      await saleModel.updateSale(product, saleId);
    });
    return response;
  },
};

module.exports = saleService;