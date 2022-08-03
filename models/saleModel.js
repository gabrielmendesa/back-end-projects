const connection = require('./connection');

const saleModel = {
  getAllSales: async () => {
    const getAllSql = `SELECT sp.sale_id, s.date,sp.product_id, sp.quantity 
    FROM StoreManager.sales_products AS sp INNER JOIN sales AS s ON sp.sale_id = s.id;`;
    const [sales] = await connection.query(getAllSql);
    return sales;
  },
  getSaleById: async (id) => {
    const getByIdSql = `SELECT s.date, sp.product_id, sp.quantity FROM StoreManager.sales_products 
    AS sp INNER JOIN sales AS s ON sp.sale_id = s.id WHERE sale_id = ?;`;
    const [sale] = await connection.query(getByIdSql, [id]);
    return sale;
  },
  createSaleProduct: async (product, saleId) => {
    const prodSql = `INSERT INTO StoreManager.sales_products 
    (sale_id, product_id, quantity) VALUES (?, ?, ?)`;
    const values = [saleId, product.productId, product.quantity];
    const [{ affectedRows }] = await connection.query(prodSql, values);
    return !!affectedRows;
  },
  createSale: async () => {
    const createSaleSql = 'INSERT INTO StoreManager.sales () VALUES ()';
    const [{ insertId }] = await connection.query(createSaleSql);
    return insertId;
  },
  checkIfExistProduct: async (productId) => {
    const checkProductSql = 'SELECT 1 FROM StoreManager.products WHERE id = ?';
    const [[item]] = await connection.query(checkProductSql, [productId]);
    return !!item;
  },
  deleteSale: async (id) => {
    const deleteSaleSql = 'DELETE FROM StoreManager.sales WHERE id = ?';
    const [{ affectedRows }] = await connection.query(deleteSaleSql, [id]);
    return affectedRows;
  },
  updateSale: async (product, saleId) => {
    const { productId, quantity } = product;
    const updateSaleSql = `UPDATE StoreManager.sales_products 
    SET quantity = ? WHERE sale_id = ? AND product_id = ?`;
    const [{ affectedRows }] = await connection.query(updateSaleSql, [quantity, saleId, productId]);
    return affectedRows;
  },
};

module.exports = saleModel;