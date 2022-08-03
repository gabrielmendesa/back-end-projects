const express = require('express');
const productController = require('./controllers/productController');
const saleController = require('./controllers/saleController');
const errorMiddleware = require('./middlewares/errorMiddleware');
require('express-async-errors');

const app = express();
app.use(express.json());

app.get('/', (_request, response) => { // não remova esse endpoint, é para o avaliador funcionar
  response.send();
});

app.post('/products', productController.createProduct);
app.post('/sales', saleController.createSale);
app.get('/products/search', productController.getProductByName);
app.put('/products/:id', productController.updateProduct);
app.delete('/products/:id', productController.deleteProduct);
app.get('/products/:id', productController.getProductById);
app.get('/products', productController.getAllProducts);
app.get('/sales/:id', saleController.getSaleById);
app.put('/sales/:id', saleController.updateSale);
app.delete('/sales/:id', saleController.deleteSale);
app.get('/sales', saleController.getAllSales);

app.use(errorMiddleware);

module.exports = app; // não remova essa exportação, é para o avaliador funcionar