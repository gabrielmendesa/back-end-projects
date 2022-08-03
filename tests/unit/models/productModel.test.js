const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection')
const productModel = require('../../../models/productModel');
const { productMock, productsMock } = require('../mocks/productMocks')

describe('Product Model', () => {
  beforeEach(() => {
    sinon.restore();
  })
  describe('listar produtos', () => {
    it('Retorna lista de produtos', async () => {
      sinon.stub(connection, 'query').resolves([productsMock])
      const items = await productModel.getAllProducts()
      expect(items).to.be.deep.eq(productsMock)
    })
  })
  describe('produto por ID', () => {
    it('Retorna produto pelo id', async () => {
      sinon.stub(connection, 'query').resolves([[productMock]])
      const item = await productModel.getProductById(1)
      expect(item).to.be.deep.eq(productMock)
    })
  })
  describe('criar um produto', () => {
    it('cria e retorna o id do produto', async () => {
      sinon.stub(connection, 'query').resolves([{ insertId: 15 }])
      const item = await productModel.createProduct({ name: "Produto" })
      expect(item).to.be.deep.eq(15)
    })
  })
  describe('atualizar um produto', () => {
    it('altera e retorna linhas afetadas ao alterar o produto', async () => {
      sinon.stub(connection, 'query').resolves([{ affectedRows: 1 }])
      const item = await productModel.updateProduct({ name: "Produto" }, 3)
      expect(item).to.be.deep.eq(1)
    })
  })
  describe('deletar um produto', () => {
    it('deleta e retorna linhas afetadas ao deletar o produto', async () => {
      sinon.stub(connection, 'query').resolves([{ affectedRows: 1 }])
      const item = await productModel.deleteProduct(3)
      expect(item).to.be.deep.eq(1)
    })
  })
})