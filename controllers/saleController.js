const saleService = require('../services/saleService');

const saleController = {
  getSaleById: async (req, res) => {
    const sale = await saleService.getSaleById(req.params.id);
    saleService.checkIfExist(sale);
    res.status(200).json(sale);
  },
  getAllSales: async (_req, res) => {
    const allSales = await saleService.getAllSales();
    res.status(200).json(allSales);
  },
  createSale: async (req, res) => {
    const products = req.body;
    products.forEach((product) => saleService.checkSaleProduct(product));
    await saleService.checkIfExistProduct(products);
    const response = await saleService.createSale(products);
    res.status(201).json(response);
  },
  deleteSale: async (req, res) => {
    const { id } = req.params;
    await saleService.deleteSale(id);
    res.sendStatus(204);
  },
  updateSale: async (req, res) => {
    const products = req.body;
    const saleId = req.params.id;
    await saleService.checkSaleId(saleId);
    products.forEach((product) => saleService.checkSaleProduct(product));
    await saleService.checkIfExistProduct(products);
    const response = await saleService.updateSale(products, saleId);
    res.status(200).json(response);
  },
};

module.exports = saleController;