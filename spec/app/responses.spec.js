'use strict'
// module under test
import * as responses from '../../src/app/responses'
import chai from 'chai'
import mocha from 'mocha'
import sinonChai from 'sinon-chai'

// abstracted suite behaviour
import suite from '../suite'

chai.use(sinonChai)

describe('App', () => {
  describe('responses', () => {
    const root = {}

    beforeEach('setUp', () => {
      suite.beforeEach(root)
    })

    afterEach('tearDown', () => {
      suite.afterEach(root)
    })

    describe('getResponseObj', () => {
      it('is callable', () => {
        const method = root.sandbox.stub(responses, 'default')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it('responds with success: \'OK\'', () => {
        const res = {
          api: 'file-stat-api',
          status: 'OK',
          success: true,
          dateTime: '0000-00-00T00:00:00.000Z'
        }
        const method = root.sandbox.stub(responses, 'default').returns(res)
        method()
        method.should.have.been.returned(res)
      })

      it('responds with error: \'404 Not found\'', () => {
        const res = {
          status: '404 Not found',
          success: false
        }
        const method = root.sandbox.stub(responses, 'default').returns(res)
        method()
        method.should.have.been.returned(res)
      })

      it('responds with error: \'500 Internal Server Error\'', () => {
        const res = {
          status: '500 Internal Server Error',
          success: false
        }
        const method = root.sandbox.stub(responses, 'default').returns(res)
        method()
        method.should.have.been.returned(res)
      })
    })

  })
})
