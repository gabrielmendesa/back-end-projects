const { expect } = require('chai')
const sinon = require('sinon')
const connection = require('../../../models/connection')
const saleModel = require('../../../models/saleModel')

const salesMock = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2
  }
]
const productSaleMock = [
  {
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2
  }
]

describe('Sale Model', () => {
  beforeEach(() => {
    sinon.restore()
  })
  describe('Cria uma sale', () => {
    it('Verifica se ao preencher a tabela sale retorna id', async () => {
      sinon.stub(connection, 'query').returns([{ insertId: 1 }])
      const result = await saleModel.createSale()
      expect(result).to.be.eq(1)
    })
  })
  describe('Cadastra lista de produtos em sale products', () => {
    it('Verifica se faz a checagem de produtos existentes', async () => {
      sinon.stub(connection, 'query').returns([[{ 1: 1 }]])
      const result = await saleModel.checkIfExistProduct(1)
      expect(result).to.be.eq(true)
    })
    it('Verifica se ao cadastrar um produto em product sales retorna confirmação', async () => {
      const product = { productId: 1, quantity: 1 }
      sinon.stub(connection, 'query').returns([{ affectedRows: 1 }])
      const result = await saleModel.createSaleProduct(product, 1)
      expect(result).to.be.eq(true)
    })
  })
  describe('Busca e retorna lista todos produtos de sales', () => {
    it('Verifica se retorna array com sale products e data de venda', async () => {
      sinon.stub(connection, 'query').returns([salesMock])
      const result = await saleModel.getAllSales()
      expect(result).to.be.eq(salesMock)
    })
  })
  describe('Busca e retorna sales products por id', () => {
    it('Verifica se retorna sale product referente ao id e data de venda', async () => {
      sinon.stub(connection, 'query').returns([productSaleMock])
      const result = await saleModel.getSaleById(1)
      expect(result).to.be.eq(productSaleMock)
    })
  })
})