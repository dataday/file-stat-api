'use strict'
/* eslint object-property-newline: ["error", { "allowMultiplePropertiesPerLine": true }] */
import chai from 'chai'
import mocha from 'mocha'
// module under test
import { objects } from '../../../../src/app/lib/utils'
import sinonChai from 'sinon-chai'

// abstracted suite behaviour
import suite from '../../../suite'

chai.use(sinonChai)

describe('utilities', () => {
  describe('objects', () => {
    const root = {}

    beforeEach('setUp', () => {
      suite.beforeEach(root)
    })

    afterEach('tearDown', () => {
      suite.afterEach(root)
    })

    describe('cloneWithOmissions', () => {
      const obj = { one: 'value', two: 'value', three: 'value', four: 'value' }
      const arr = [ 'two', 'four' ]
      const res = { one: 'value', three: 'value' }

      it('is callable', () => {
        const method = root.sandbox.stub(objects, 'cloneWithOmissions')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it(`accepts argument: '${ obj }' and '${ arr }'`, () => {
        const method = root.sandbox.stub(objects, 'cloneWithOmissions')
        method(obj, arr)
        method.should.have.been.calledWith(obj, arr)
      })

      it(`returns valid result: '${ res }'`, () => {
        const method = root.sandbox.spy(objects, 'cloneWithOmissions')
        method(obj, arr)
        method.should.have.been.returned(res)
      })
    })

    describe('cloneWithAdditions', () => {
      const obj1 = { one: 'value', two: 'value' }
      const obj2 = { three: 'value', four: 'value' }
      const res = { one: 'value', two: 'value', three: 'value', four: 'value' }

      it('is callable', () => {
        const method = root.sandbox.stub(objects, 'cloneWithAdditions')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it(`accepts argument: '${ obj1 }' and '${ obj2 }'`, () => {
        const method = root.sandbox.stub(objects, 'cloneWithAdditions')
        method(obj1, obj2)
        method.should.have.been.calledWith(obj1, obj2)
      })

      it(`returns valid result: '${ res }'`, () => {
        const method = root.sandbox.spy(objects, 'cloneWithAdditions')
        method(obj1, obj2)
        method.should.have.been.returned(res)
      })
    })

    describe('sortObjectByValue numbers (descending)', () => {
      const num = -1
      const obj = { four: 4, two: 2, three: 3, one: 1 }
      const res = { one: 1, two: 2, three: 3, four: 4 }

      it('is callable', () => {
        const method = root.sandbox.stub(objects, 'sortObjectByValue')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it(`accepts argument: '${ obj }' and '${ num }'`, () => {
        const method = root.sandbox.stub(objects, 'sortObjectByValue')
        method(obj, num)
        method.should.have.been.calledWith(obj, num)
      })

      it(`returns valid result: '${ res }'`, () => {
        const method = root.sandbox.spy(objects, 'sortObjectByValue')
        method(obj, num)
        method.should.have.been.returned(res)
      })
    })

    describe('sortObjectByValue letters (descending)', () => {
      const num = -1
      const obj = { four: 'd', two: 'b', three: 'c', one: 'a' }
      const res = { one: 'a', two: 'b', three: 'c', four: 'd' }

      it('is callable', () => {
        const method = root.sandbox.stub(objects, 'sortObjectByValue')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it(`accepts argument: '${ obj }' and '${ num }'`, () => {
        const method = root.sandbox.stub(objects, 'sortObjectByValue')
        method(obj, num)
        method.should.have.been.calledWith(obj, num)
      })

      it(`returns valid result: '${ res }'`, () => {
        const method = root.sandbox.spy(objects, 'sortObjectByValue')
        method(obj, num)
        method.should.have.been.returned(res)
      })
    })

    describe('sortObjectByValue numbers (ascending)', () => {
      const num = 1
      const obj = { four: 4, two: 2, three: 3, one: 1 }
      const res = { four: 4, three: 3, two: 2, one: 1 }

      it('is callable', () => {
        const method = root.sandbox.stub(objects, 'sortObjectByValue')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it(`accepts argument: '${ obj }' and '${ num }'`, () => {
        const method = root.sandbox.stub(objects, 'sortObjectByValue')
        method(obj, num)
        method.should.have.been.calledWith(obj, num)
      })

      it(`returns valid result: '${ res }'`, () => {
        const method = root.sandbox.spy(objects, 'sortObjectByValue')
        method(obj, num)
        method.should.have.been.returned(res)
      })
    })

    describe('sortObjectByValue letters (ascending)', () => {
      const num = 1
      const obj = { four: 'd', two: 'b', three: 'c', one: 'a' }
      const res = { four: 'd', three: 'c', two: 'b', one: 'a' }

      it('is callable', () => {
        const method = root.sandbox.stub(objects, 'sortObjectByValue')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it(`accepts argument: '${ obj }' and '${ num }'`, () => {
        const method = root.sandbox.stub(objects, 'sortObjectByValue')
        method(obj, num)
        method.should.have.been.calledWith(obj, num)
      })

      it(`returns valid result: '${ res }'`, () => {
        const method = root.sandbox.spy(objects, 'sortObjectByValue')
        method(obj, num)
        method.should.have.been.returned(res)
      })
    })

  })
})
