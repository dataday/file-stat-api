'use strict'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
// module under test
import { files } from '../../../../src/app/lib/utils'
import mocha from 'mocha'
import sinonChai from 'sinon-chai'

// abstracted suite behaviour
import suite from '../../../suite'

chai.use(sinonChai)
chai.use(chaiAsPromised)

describe('utilities', () => {
  describe('files', () => {
    const root = {}

    beforeEach('setUp', () => {
      suite.beforeEach(root)
    })

    afterEach('tearDown', () => {
      suite.afterEach(root)
    })

    describe('isValidSuffix', () => {
      it('is callable', () => {
        const method = root.sandbox.stub(files, 'isValidSuffix')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it('accepts argument: \'good-file.txt\'', () => {
        const method = root.sandbox.stub(files, 'isValidSuffix')
        method('good-file.txt')
        method.should.have.been.calledWith('good-file.txt')
      })

      it('returns valid result: \'good-file.txt\'', () => {
        const method = root.sandbox.spy(files, 'isValidSuffix')
        method('good-file.txt')
        method.should.have.been.returned(true)
      })

      it('returns invalid result: \'bad-file.\'', () => {
        const method = root.sandbox.spy(files, 'isValidSuffix')
        method('bad-file.')
        method.should.have.been.returned(false)
      })

      it('returns invalid result: \'bad-file.exe\'', () => {
        const method = root.sandbox.spy(files, 'isValidSuffix')
        method('bad-file.exe')
        method.should.have.been.returned(false)
      })
    })

    describe('destructureFilename', () => {
      const str = '/path/to/file.txt'
      const res = [ 'file', '.txt' ]

      it('is callable', () => {
        const method = root.sandbox.stub(files, 'destructureFilename')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it(`accepts argument: '${ str }'`, () => {
        const method = root.sandbox.stub(files, 'destructureFilename')
        method(str)
        method.should.have.been.calledWith(str)
      })

      it(`returns valid result: '${ str }'`, () => {
        const method = root.sandbox.spy(files, 'destructureFilename')
        method(str)
        method.should.have.been.returned(res)
      })
    })

    describe('readFileStream', () => {
      const path = '/mock/path/to/dir/mock-file.txt'
      const encoding = 'utf8'
      const res = 'Mock file content.'

      it('is callable', () => {
        const method = root.sandbox.stub(files, 'readFileStream')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it(`accepts argument: '${ path }'`, () => {
        const method = root.sandbox.stub(files, 'readFileStream')
        method(path)
        method.should.have.been.calledWith(path)
      })

      it(`accepts arguments: '${ path }' and '${ encoding }'`, () => {
        const method = root.sandbox.spy(files, 'readFileStream')
        method(path, encoding)
        method.should.have.been.calledWith(path, encoding)
      })

      it(`returns valid result: '${ res }'`, () => {
        const method = root.sandbox.spy(files, 'readFileStream')
        method(path, encoding).should.eventually.equal(res)
      })
    })

    describe('unlinkFile', () => {
      const path = '/mock/path/to/dir/mock-file.txt'
      const res = `Error: ENOENT, no such file or directory '${ path }'`

      it('is callable', () => {
        const method = root.sandbox.stub(files, 'unlinkFile')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it(`accepts argument: '${ path }'`, () => {
        const method = root.sandbox.stub(files, 'unlinkFile')
        method(path)
        method.should.have.been.calledWith(path)
      })

      it(`returns valid result: '${ res }'`, () => {
        const method = root.sandbox.spy(files, 'unlinkFile')
        method(path).should.eventually.contain(res)
      })
    })

  })
})
