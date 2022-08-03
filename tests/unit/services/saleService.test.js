const { expect, use } = require('chai')
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");
const saleModel = require('../../../models/saleModel');
const saleService = require('../../../services/saleService');
const utilServices = require('../../../services/util');

use(chaiAsPromised)

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

const getSalesMock = [
  {
    sale_id: 1,
    date: "2021-09-09T04:54:29.000Z",
    product_id: 1,
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

const getSaleMock = [
  {
    date: "2021-09-09T04:54:29.000Z",
    product_id: 1,
    quantity: 2
  }
]
const getSaleMockConverted = [
  {
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2
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

describe('Sale Service', () => {
  beforeEach(() => {
    sinon.restore()
  })
  describe('Cria Sale e Sale Products', () => {
    it('testa ao criar a sale retorna o objeto com sale id e produtos', async () => {
      sinon.stub(saleModel, 'createSale').resolves(3)
      sinon.stub(saleModel, 'createSaleProduct').resolves(true)
      const result = await saleService.createSale(mockProductsSale)
      expect(result).to.be.deep.eq(mockResult)
    })
    it('testa se dispara erro ao cadastrar informar um product id inexistente', () => {
      sinon.stub(saleModel, 'checkIfExistProduct').resolves(false)
      expect(saleService.checkIfExistProduct(mockProductsSale)).to.be.rejectedWith('Product not found')
    })
    it('testa se dispara erro ao cadastrar informar sem o productId', () => {
      expect(() => saleService.checkSaleProduct({ quantity: 1 })).to.be.throw('"productId" is required')
    })
    it('testa se dispara erro ao cadastrar informar sem o quantity', () => {
      expect(() => saleService.checkSaleProduct({ productId: 1 })).to.be.throw('"quantity" is required')
    })
    it('testa se dispara erro ao cadastrar informar o quantity menor que 1', () => {
      expect(() => saleService.checkSaleProduct({ productId: 1, quantity: 0 })).to.be.throw('"quantity" must be greater than or equal to 1')
    })
    it('testa se retornar true ao checar produto correto', async () => {
      expect(saleService.checkSaleProduct({ productId: 1, quantity: 1 })).to.be.true
    })
    it('testa se retornar true ao verificar que produto existe', async () => {
      sinon.stub(saleModel, 'checkIfExistProduct').returns(true)
      const result = await saleService.checkIfExistProduct(mockProductsSale)
      expect(result).to.be.true
    })
  })
  describe('Busca Sale e Sale Products', () => {
    it('Verifica se converte sales para camelCase', async () => {
      const result = utilServices.toCamelCase(...getSalesMock)
      expect(result).to.be.deep.eq(...getSalesMockConverted)
    })
    it('Verifica se converte sale para camelCase', async () => {
      const result = utilServices.toCamelCase(...getSaleMock)
      expect(result).to.be.deep.eq(...getSaleMockConverted)
    })
    it('Verifica se gera erro quando o id não existe', async () => {
      expect(() => saleService.checkIfExist([])).to.be.throw('Sale not found')
    })
    it('Verifica se retorna true quando produto existe', async () => {
      const result = saleService.checkIfExist(getSaleMock)
      expect(result).to.be.true
    })
    it('Verifica se retorna array com o produto por id', async () => {
      sinon.stub(saleModel, 'getSaleById').returns(getSaleMock)
      const result = await saleService.getSaleById(1)
      expect(result).to.be.deep.eq(getSaleMockConverted)
    })
    it('Verifica se retorna array com todos produtos', async () => {
      sinon.stub(saleModel, 'getAllSales').returns(getSalesMock)
      const result = await saleService.getAllSales()
      expect(result).to.be.deep.eq(getSalesMockConverted)
    })
  })
})