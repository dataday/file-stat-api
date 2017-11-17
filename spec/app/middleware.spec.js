'use strict'
// module under test
import * as middleware from '../../src/app/middleware'
import chai from 'chai'
import mocha from 'mocha'
import sinonChai from 'sinon-chai'

// abstracted suite behaviour
import suite from '../suite'

chai.use(sinonChai)

const expect = chai.expect

describe('App', () => {
  describe('middleware', () => {
    const root = {}
    const arr = [
      'representations',
      'cors',
      'compression',
      'staticPath',
      'logger',
      'helmet',
      'router',
      'errorHandler'
    ]

    beforeEach('setUp', () => {
      suite.beforeEach(root)
    })

    afterEach('tearDown', () => {
      suite.afterEach(root)
    })

    describe('sequence', () => {
      it('has expected members', () => {
        expect(middleware.sequence).to.have.members(arr)
      })
    })

    describe('methods', () => {
      arr.forEach(str => {
        it(`has the property '${ str }'`, () => {
          root.sandbox.stub(middleware, 'methods')
          middleware.methods.should.have.property(str)
        })

        it(`has the function '${ str }'`, () => {
          const method = root.sandbox.stub(middleware.methods)
          expect(method).to.respondTo(str)
        })

        it(`the function '${ str }' is callable`, () => {
          const method = root.sandbox.stub(middleware.methods, str)
          method()
          method.calledOnce.should.be.equal(true)
        })
      })
    })

  })
})
