const productService = require('../services/productService');

const productController = {
  getAllProducts: async (_req, res) => {
    const allProducts = await productService.getAllProducts();
    res.status(200).json(allProducts);
  },
  getProductById: async (req, res) => {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    productService.checkIfExists(product);
    res.status(200).json(product);
  },
  getProductByName: async (req, res) => {
    const name = req.query.q;
    const result = await productService.getProductByName(name);
    res.status(200).json(result);
  },
  createProduct: async (req, res) => {
    const product = req.body;
    productService.checkProduct(product);
    const insertId = await productService.createProduct(product);
    res.status(201).json({ ...product, id: insertId });
  },
  updateProduct: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    productService.checkProduct(data);
    const affectedRows = await productService.updateProduct(data, Number(id));
    productService.checkIfExists(affectedRows);
    res.status(200).json({ id, name: data.name });
  },
  deleteProduct: async (req, res) => {
    const { id } = req.params;
    const affectedRows = await productService.deleteProduct(Number(id));
    productService.checkIfExists(affectedRows);
    res.sendStatus(204);
  },
};

module.exports = productController;