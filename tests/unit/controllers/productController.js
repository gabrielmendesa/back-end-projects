const { expect } = require('chai')
const sinon = require('sinon')
const productController = require('../../../controllers/productController')
const productService = require('../../../services/productService')
const { productsMock, productMock } = require('../mocks/productMocks')


describe('Product Controller', () => {
  beforeEach(() => {
    sinon.restore();
  })
  describe('lista de produtos', () => {
    it('verifica se ao listar produtos responde com status 200 e o json com o array de produtos', async () => {
      const req = {}
      const res = {}
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      sinon.stub(productService, 'getAllProducts').resolves(productsMock)
      await productController.getAllProducts(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true)
      expect(res.json.calledWith(productsMock)).to.be.equal(true)
    })
  })
  describe('produto por id', () => {
    it('verifica se ao buscar produto por id responde com status 200 e o json com o objeto produto', async () => {
      const req = { params: 1 }
      const res = {}
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      sinon.stub(productService, 'getProductById').resolves(productMock)
      await productController.getProductById(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true)
      expect(res.json.calledWith(productMock)).to.be.equal(true)
    })
  })
  describe('cria um produto', () => {
    it('verifica se ao criar o produto responde com status 201 e o json com o objeto produto', async () => {
      const req = { body: { name: 'teste' } }
      const res = {}
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      sinon.stub(productService, 'createProduct').resolves(15)
      await productController.createProduct(req, res)
      expect(res.status.calledWith(201)).to.be.equal(true)
      expect(res.json.calledWith({ name: 'teste', id: 15 })).to.be.equal(true)
    })
  })
  describe('atualiza um produto', () => {
    it('verifica se ao atualizar o produto responde com status 200 e o json com o objeto produto', async () => {
      const req = { body: { name: 'teste' }, params: { id: 3 } }
      const res = {}
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      sinon.stub(productService, 'updateProduct').resolves(1)
      await productController.updateProduct(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true)
      expect(res.json.calledWith({ id: 3, name: 'teste' })).to.be.equal(true)
    })
  })
  describe('deleta um produto', () => {
    it('verifica se ao deletar o produto responde com status 204', async () => {
      const req = { params: { id: 3 } }
      const res = {}
      res.sendStatus = sinon.stub()
      sinon.stub(productService, 'deleteProduct').resolves(1)
      await productController.deleteProduct(req, res)
      expect(res.sendStatus.calledWith(204)).to.be.equal(true)
    })
  })
})