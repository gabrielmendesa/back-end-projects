const connection = require('./connection');

const productModel = {
  getAllProducts: async () => {
    const getAllSql = 'SELECT * FROM StoreManager.products';
    const [items] = await connection.query(getAllSql);
    return items;
  },
  getProductById: async (id) => {
    const getByIdSql = 'SELECT * FROM StoreManager.products where id = ?';
    const [[item]] = await connection.query(getByIdSql, [id]);
    return item;
  },
  getProductByName: async (name) => {
    const getByNameSql = 'SELECT * FROM StoreManager.products WHERE name LIKE ?';
    const [result] = await connection.query(getByNameSql, [`%${name}%`]);
    return result;
  },
  createProduct: async (product) => {
    const createProductSql = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [{ insertId }] = await connection.query(createProductSql, [product.name]);
    return insertId;
  },
  updateProduct: async (data, id) => {
    const updateNameSql = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
    const [{ affectedRows }] = await connection.query(updateNameSql, [data.name, id]);
    return affectedRows;
  },
  deleteProduct: async (id) => {
    const deleteProductSql = 'DELETE FROM StoreManager.products WHERE id = ?';
    const [{ affectedRows }] = await connection.query(deleteProductSql, [id]);
    return affectedRows;
  },
};

module.exports = productModel;