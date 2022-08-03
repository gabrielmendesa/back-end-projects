const sinon = require('sinon')
const { expect, use } = require('chai')
const productService = require('../../../services/productService')
const productModel = require('../../../models/productModel')
const { productMock, productsMock } = require('../mocks/productMocks')
const chaiAsPromised = require('chai-as-promised')
use(chaiAsPromised)


describe('Product Service', () => {
  beforeEach(() => {
    sinon.restore();
  })
  describe('listar produtos', () => {
    it('retorna lista de produtos', async () => {
      sinon.stub(productModel, 'getAllProducts').resolves(productsMock)
      const items = await productService.getAllProducts()
      expect(items).to.be.deep.eq(productsMock)
    })
  })
  describe('produto por id', () => {
    it('retorna produto por id', async () => {
      sinon.stub(productModel, 'getProductById').resolves(productMock)
      const item = await productService.getProductById(1)
      expect(item).to.be.deep.eq(productMock)
    })
    it('verifica se dispara erro quando não existe o id', () => {
      expect(() => productService.checkIfExists()).to.be.throw('Product not found')
    })
    it('verifica retorna true quando existe o id', () => {
      const validate = productService.checkIfExists(productMock)
      expect(validate).to.be.eq(true)
    })
  })
  describe('cria um produto', () => {
    it('retorna o id do produto inserido', async () => {
      sinon.stub(productModel, 'createProduct').resolves(15)
      const insertId = await productService.createProduct({ name: "Produto" })
      expect(insertId).to.be.eq(15)
    })
    it('verifica se dispara erro quando não existe o nome', () => {
      expect(() => productService.checkProduct({})).to.be.throw('"name" is required')
    })
    it('verifica se dispara erro quando tem menos que 5 caracteres', () => {
      expect(() => productService.checkProduct({ name: 'test' })).to.be.throw('"name" length must be at least 5 characters long')
    })
    it('verifica retorna true o nome está validado', () => {
      const validate = productService.checkProduct({ name: 'teste' })
      expect(validate).to.be.eq(true)
    })
  })
  describe('atualizar um produto', () => {
    it('altera e retorna linhas afetadas ao alterar o produto', async () => {
      sinon.stub(productModel, 'updateProduct').resolves(1)
      const item = await productService.updateProduct({ name: "Produto" }, 3)
      expect(item).to.be.deep.eq(1)
    })
  })
  describe('deletar um produto', () => {
    it('deleta e retorna linhas afetadas ao deletar o produto', async () => {
      sinon.stub(productModel, 'deleteProduct').resolves(1)
      const item = await productService.deleteProduct(3)
      expect(item).to.be.deep.eq(1)
    })
  })
})