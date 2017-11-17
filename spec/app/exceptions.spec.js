'use strict'
// module under test
import * as exceptions from '../../src/app/exceptions'
import * as specUtils from '../utils'
import chai from 'chai'
import mocha from 'mocha'
import sinonChai from 'sinon-chai'

// abstracted suite behaviour
import suite from '../suite'

chai.use(sinonChai)

describe('App', () => {
  describe('exceptions', () => {
    const root = {}
    const req = {}
    const next = () => true

    beforeEach('setUp', () => {
      suite.beforeEach(root)
    })

    afterEach('tearDown', () => {
      suite.afterEach(root)
    })

    describe('ApplicationError', () => {
      const str = 'ApplicationError Message'
      const num = 400

      it('is callable', () => {
        const method = root.sandbox.stub(exceptions, 'ApplicationError')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it(`accepts argument: '${ str }' and '${ num }'`, () => {
        const method = root.sandbox.stub(exceptions, 'ApplicationError')
        method(str, num)
        method.should.have.been.calledWith(str, num)
      })

      it('is an instance of ApplicationError', () => {
        root.sandbox.match.instanceOf(exceptions.HttpError)
      })
    })

    describe('HttpError', () => {
      const str = 'HttpError Message'
      const num = 400

      it('is callable', () => {
        const method = root.sandbox.stub(exceptions, 'HttpError')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it(`accepts argument: '${ str }' and '${ num }'`, () => {
        const method = root.sandbox.stub(exceptions, 'HttpError')
        method(str, num)
        method.should.have.been.calledWith(str, num)
      })

      it('is an instance of HttpError', () => {
        root.sandbox.match.instanceOf(exceptions.HttpError)
      })
    })

    describe('errorHandler', () => {
      const codes = [ 99, 599 ]

      it('is callable', () => {
        const method = root.sandbox.stub(exceptions, 'errorHandler')
        method()
        method.calledOnce.should.be.equal(true)
      })

      codes.forEach(code => {
        it(`responds with 500 Internal Server Error code to '${ code }'`,
          done => {
            const err = new exceptions.HttpError(`${ code } Error`, code)
            const res = specUtils.testStatusResult(
              500,
              '500 Internal Server Error',
              done
            )
            exceptions.errorHandler(err, req, res, next)
          }
        )
      })

      it('responds to custom \'LIMIT_FIELD_COUNT\' error', done => {
        const err = new exceptions.HttpError('An Error', 'LIMIT_FIELD_COUNT')
        const res = specUtils.testStatusResult(
          400,
          '400 Bad Request',
          done
        )
        exceptions.errorHandler(err, req, res, next)
      })

      it('responds with \'405 Method Not Allowed\' error', done => {
        const err = new exceptions.HttpError('405 Method Not Allowed', 405)
        const res = specUtils.testStatusResult(
          405,
          '405 Method Not Allowed',
          done
        )
        exceptions.errorHandler(err, req, res, next)
      })

      it('responds with \'400 Bad Request\' error', done => {
        const err = new exceptions.HttpError('400 Bad Request', 400)
        const res = specUtils.testStatusResult(
          400,
          '400 Bad Request',
          done
        )
        exceptions.errorHandler(err, req, res, next)
      })
    })

  })
})
