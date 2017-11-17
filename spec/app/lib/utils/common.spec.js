'use strict'
// module under test
import chai from 'chai'
import { common } from '../../../../src/app/lib/utils'
import mocha from 'mocha'
import sinonChai from 'sinon-chai'

// abstracted suite behaviour
import suite from '../../../suite'

chai.use(sinonChai)

describe('utilities', () => {
  describe('common', () => {
    const root = {}

    beforeEach('setUp', () => {
      suite.beforeEach(root)
    })

    afterEach('tearDown', () => {
      suite.afterEach(root)
    })

    describe('isProduction', () => {
      const res = [ true, false ]

      it('is callable', () => {
        const method = root.sandbox.stub(common, 'isProduction')
        method()
        method.calledOnce.should.be.equal(true)
      })

      res.forEach(bool => {
        it(`returns valid result: '${ bool }'`, () => {
          const method = root.sandbox.stub(common, 'isProduction').returns(bool)
          method()
          method.returned(bool)
        })
      })
    })

    describe('isTest', () => {
      const res = [ true, false ]

      it('is callable', () => {
        const method = root.sandbox.stub(common, 'isTest')
        method()
        method.calledOnce.should.be.equal(true)
      })

      res.forEach(bool => {
        it(`returns valid result: '${ bool }'`, () => {
          const method = root.sandbox.stub(common, 'isTest').returns(bool)
          method()
          method.returned(bool)
        })
      })
    })

    describe('sortCompare', () => {
      const arr = [ 1, 7, 6, 9 ]
      const res = [ 1, 6, 7, 9 ]

      it('is callable', () => {
        const method = root.sandbox.stub(common, 'sortCompare')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it(`accepts argument: '${ arr }'`, () => {
        const method = root.sandbox.stub(common, 'sortCompare')
        method(arr)
        method.should.have.been.calledWith(arr)
      })

      it(`returns valid result: '${ res }'`, () => {
        root.sandbox.spy(arr, 'sort')
        arr.sort(common.sortCompare)
        arr.sort.should.have.been.returned(res)
      })
    })

    describe('getRoundedNumber', () => {
      const arr = [ 10, 0, 3, 0, 0, 4.666666666666667, 4, 4, 2 ]
      const res = [ 10, 0, 3, 0, 0, 4.7, 4, 4, 2 ]

      it('is callable', () => {
        const method = root.sandbox.stub(common, 'getRoundedNumber')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it(`accepts argument: '${ arr[0] }'`, () => {
        const method = root.sandbox.stub(common, 'getRoundedNumber')
        method(arr[0])
        method.should.have.been.calledWith(arr[0])
      })

      arr.forEach((num, index) => {
        it(`returns valid result: '${ res[index] }' for '${ num }'`, () => {
          const method = root.sandbox.spy(common, 'getRoundedNumber')
          method(num)
          method.should.have.been.returned(res[index])
        })
      })
    })

    describe('getFrequency', () => {
      let arr = null
      let res = null

      it('is callable', () => {
        const method = root.sandbox.stub(common, 'getFrequency')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it('charRepeatFour returns valid result', () => {
        const method = root.sandbox.spy(common, 'getFrequency')
        arr = [ 10 ]
        res = { 10: 1 }
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('empty returns valid result', () => {
        const method = root.sandbox.spy(common, 'getFrequency')
        arr = []
        res = {}
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('onlyNonAlpha returns valid result', () => {
        const method = root.sandbox.spy(common, 'getFrequency')
        arr = [ 4, 1, 4 ]
        res = {
          1: 1,
          4: 2
        }
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('onlyNonAlphaNum returns valid result', () => {
        const method = root.sandbox.spy(common, 'getFrequency')
        arr = []
        res = {}
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('onlySpaces returns valid result', () => {
        const method = root.sandbox.spy(common, 'getFrequency')
        arr = []
        res = {}
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('wordLineWord returns valid result', () => {
        const method = root.sandbox.spy(common, 'getFrequency')
        arr = [ 4, 5, 5, 4, 5, 5 ]
        res = {
          4: 2,
          5: 4
        }
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('wordSpacesWord returns valid result', () => {
        const method = root.sandbox.spy(common, 'getFrequency')
        arr = [ 4, 4 ]
        res = { 4: 2 }
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('word returns valid result', () => {
        const method = root.sandbox.spy(common, 'getFrequency')
        arr = [ 4 ]
        res = { 4: 1 }
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('zeroWordZero returns valid result', () => {
        const method = root.sandbox.spy(common, 'getFrequency')
        arr = [ 1, 4, 1 ]
        res = {
          1: 2,
          4: 1
        }
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })
    })

    describe('getIsoFormattedDate', () => {
      const str = '0000-00-00T00:00:00.000Z'

      it('is callable', () => {
        const method = root.sandbox.stub(common, 'getIsoFormattedDate')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it(`accepts argument: '${ str }'`, () => {
        const method = root.sandbox.stub(common, 'getIsoFormattedDate')
        method(str)
        method.should.have.been.calledWith(str)
      })

      it(`returns valid ISO8601 result: '${ str }'`, () => {
        const method = root.sandbox.stub(common, 'getIsoFormattedDate').returns(str)
        method()
        method.should.have.been.returned(str)
      })
    })

  })
})
