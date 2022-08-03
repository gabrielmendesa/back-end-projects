const saleService = require('../../../services/saleService')
const saleController = require('../../../controllers/saleController')
const sinon = require('sinon')
const { expect } = require('chai')

const mockProductsSale = [
  {
    productId: 1,
    quantity: 1
  },
  {
    productId: 2,
    quantity: 5
  }
]

const mockResult = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1
    },
    {
      productId: 2,
      quantity: 5
    }
  ]
}

const getSaleMockConverted = [
  {
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2
  }
]

const getSalesMockConverted = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2
  }
]

describe('Sale Controller', () => {
  describe('Retorno criação de Sale', () => {
    it('Verifica se o status ao criar é 201 e se retorna a resposta do objeto', async () => {
      const req = { body: mockProductsSale }
      const res = {}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub();
      sinon.stub(saleService, 'checkIfExistProduct').resolves(true)
      sinon.stub(saleService, 'createSale').resolves(mockResult)
      await saleController.createSale(req, res)
      expect(res.status.calledWith(201)).to.be.eq(true)
      expect(res.json.calledWith(mockResult)).to.be.eq(true)
    })
  })
  describe('Retorno lista de Sale', () => {
    it('Verifica se o status é 200 e se retorna a resposta com a lista de sales', async () => {
      const req = {}
      const res = {}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub();
      sinon.stub(saleService, 'getAllSales').resolves(getSalesMockConverted)
      await saleController.getAllSales(req, res)
      expect(res.status.calledWith(200)).to.be.eq(true)
      expect(res.json.calledWith(getSalesMockConverted)).to.be.deep.eq(true)
    })
    it('Verifica se o status é 200 e se retorna a resposta com a sale referente ao id', async () => {
      const req = { params: 1 }
      const res = {}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub();
      sinon.stub(saleService, 'getSaleById').resolves(getSaleMockConverted)
      await saleController.getSaleById(req, res)
      expect(res.status.calledWith(200)).to.be.eq(true)
      expect(res.json.calledWith(getSaleMockConverted)).to.be.deep.eq(true)
    })
  })
})