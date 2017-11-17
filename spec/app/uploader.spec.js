'use strict'
// module under test
import * as exceptions from '../../src/app/exceptions'
import chai from 'chai'
import mocha from 'mocha'
import rewire from 'rewire'
import sinonChai from 'sinon-chai'
import { strings } from '../../src/app/lib/utils'

// abstracted suite behaviour
import suite from '../suite'

chai.use(sinonChai)

// module under test
const uploader = rewire('../../src/app/uploader')

describe('App', () => {
  describe('uploader', () => {
    const root = {}
    let fileFilter,
      fileFilterCallback = null

    beforeEach('setUp', () => {
      suite.beforeEach(root)
      fileFilter = root.sandbox.spy(
        uploader.__get__('fileFilter')
      )
      fileFilterCallback = root.sandbox.spy()
    })

    afterEach('tearDown', () => {
      suite.afterEach(root)
    })

    describe('fileFilter', () => {
      const obj1 = {}
      const obj2 = { originalname: 'mock-file.txt' }
      const obj3 = { originalname: 'mock-file.exe' }
      const arr = [
        { originalname: 'mock-file.txt' },
        { originalname: 'mock-file.exe' },
        { originalname: 'mock-file.' },
        { originalname: 'mock-file' }
      ]

      arr.forEach(obj => {
        it(`callback is callable: '${ obj.originalname }'`, () => {
          fileFilter(obj1, obj, fileFilterCallback)
          fileFilterCallback.calledOnce.should.be.equal(true)
        })

        it(`input triggers sanitiseFileName: '${ obj.originalname }'`, () => {
          const method = root.sandbox.stub(strings, 'sanitiseFileName')
          fileFilter(obj1, obj, fileFilterCallback)
          method.calledOnce.should.be.equal(true)
        })
      })

      it(`with valid input callback passes file: '${ obj2.originalname }'`,
        () => {
          fileFilter(obj1, obj2, fileFilterCallback)
          fileFilterCallback.should.have.been.calledWith(null, obj2.originalname)
        }
      )

      it(`with invalid input callback passes error: '${ obj3.originalname }'`,
        () => {
          const num = 10
          fileFilter(obj1, obj3, fileFilterCallback)

          fileFilterCallback.should.have.been.calledWith(
            root.sandbox.match.instanceOf(exceptions.ApplicationError)
              .and(root.sandbox.match.has('message', obj3.originalname))
              .and(root.sandbox.match.has('code', num))
          )
        }
      )
    })

  })
})
