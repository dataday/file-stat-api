'use strict'
import chai from 'chai'
import mocha from 'mocha'
import sinonChai from 'sinon-chai'
// module under test
import { strings } from '../../../../src/app/lib/utils'

// abstracted suite behaviour
import suite from '../../../suite'

chai.use(sinonChai)

describe('utilities', () => {
  describe('strings', () => {
    const root = {}
    let requestFixtures = null

    before(async () => {
      await suite.before(root)
    })

    beforeEach('setUp', () => {
      suite.beforeEach(root)
      requestFixtures = root.fixtures.requests
    })

    afterEach('tearDown', () => {
      suite.afterEach(root)
    })

    describe('trimString', () => {
      const str = '  string  '
      const res = 'string'

      it('is callable', () => {
        const method = root.sandbox.stub(strings, 'trimString')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it(`accepts argument: '${ str }'`, () => {
        const method = root.sandbox.stub(strings, 'trimString')
        method(str)
        method.should.have.been.calledWith(str)
      })

      it('returns valid result', () => {
        const method = root.sandbox.spy(strings, 'trimString')
        method(str)
        method.should.have.been.returned(res)
      })
    })

    describe('sanitiseText', () => {
      let str = null
      let res = null

      it('is callable', () => {
        const method = root.sandbox.stub(strings, 'sanitiseText')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it('empty returns valid result', () => {
        const method = root.sandbox.spy(strings, 'sanitiseText')
        str = requestFixtures.emptyData
        res = ''
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('onlyNonAlpha returns valid result', () => {
        const method = root.sandbox.spy(strings, 'sanitiseText')
        str = requestFixtures.onlyNonAlphaData
        res = '2 2017 2017'
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('onlySpaces returns valid result', () => {
        const method = root.sandbox.spy(strings, 'sanitiseText')
        str = requestFixtures.onlySpacesData
        res = ''
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('wordLineWord returns valid result', () => {
        const method = root.sandbox.spy(strings, 'sanitiseText')
        str = requestFixtures.wordLineWordData
        res = 'test text test1 text1 test2 text2'
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('wordSpacesWord returns valid result', () => {
        const method = root.sandbox.spy(strings, 'sanitiseText')
        str = requestFixtures.wordSpacesWordData
        res = 'test text'
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('word returns valid result', () => {
        const method = root.sandbox.spy(strings, 'sanitiseText')
        str = requestFixtures.wordData
        res = 'test'
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('zeroWordZero returns valid result', () => {
        const method = root.sandbox.spy(strings, 'sanitiseText')
        str = requestFixtures.zeroWordZeroData
        res = '0 test 0'
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })
    })

    describe('removeLineBreaks', () => {
      const str = "one\ntwo\nthree\nfour"
      const res = 'onetwothreefour'

      it('is callable', () => {
        const method = root.sandbox.stub(strings, 'removeLineBreaks')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it('accepts argument: \'one\\ntwo\\nthree\\nfour\'', () => {
        const method = root.sandbox.stub(strings, 'removeLineBreaks')
        method(str)
        method.should.have.been.calledWith(str)
      })

      it(`returns valid result: '${ res }'`, () => {
        const method = root.sandbox.spy(strings, 'removeLineBreaks')
        method(str)
        method.should.have.been.returned(res)
      })
    })

    describe('sanitiseFileName', () => {
      const arr = [ '../../data.', 'data.../../', '@da$t[<>]a.' ]

      it('is callable', () => {
        const method = root.sandbox.stub(strings, 'sanitiseFileName')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it('accepts argument', () => {
        const method = root.sandbox.stub(strings, 'sanitiseFileName')
        method('data.')
        method.should.have.been.calledWith('data.')
      })

      it('accepts filename with underscores', () => {
        const method = root.sandbox.stub(strings, 'sanitiseFileName')
        method('da_ta.')
        method.should.have.been.calledWith('da_ta.')
      })

      it('accepts filename with hypens', () => {
        const method = root.sandbox.stub(strings, 'sanitiseFileName')
        method('da-ta.')
        method.should.have.been.calledWith('da-ta.')
      })

      it('returns valid result: \'data.txt\'', () => {
        const method = root.sandbox.spy(strings, 'sanitiseFileName')
        method('data.txt')
        method.should.have.been.returned('data.txt')
      })

      arr.forEach(str => {
        it(`returns valid result: '${ str }'`, () => {
          const method = root.sandbox.spy(strings, 'sanitiseFileName')
          method(str)
          method.should.have.been.returned('data')
        })
      })
    })

    describe('getWords', () => {
      let str = null
      let res = null

      it('is callable', () => {
        const method = root.sandbox.stub(strings, 'getWords')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it('charRepeatFour returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getWords')
        str = requestFixtures.charRepeatFourData
        res = [ 'tteeeesssstt' ]
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('empty returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getWords')
        str = requestFixtures.emptyData
        res = []
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('onlyNonAlpha returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getWords')
        str = requestFixtures.onlyNonAlphaData
        res = [ '2', '2017', '2017' ]
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('onlyNonAlphaNum returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getWords')
        str = requestFixtures.onlyNonAlphaNumData
        res = []
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('onlySpaces returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getWords')
        str = requestFixtures.onlySpacesData
        res = []
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('wordLineWord returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getWords')
        str = requestFixtures.wordLineWordData
        res = [ 'test', 'text', 'test1', 'text1', 'test2', 'text2' ]
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('wordSpacesWord returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getWords')
        str = requestFixtures.wordSpacesWordData
        res = [ 'test', 'text' ]
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('word returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getWords')
        str = requestFixtures.wordData
        res = [ 'test' ]
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('zeroWordZero returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getWords')
        str = requestFixtures.zeroWordZeroData
        res = [ '0', 'test', '0' ]
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })
    })

    describe('getAverageWordLength', () => {
      let arr = null
      let res = null

      it('is callable', () => {
        const method = root.sandbox.stub(strings, 'getAverageWordLength')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it('charRepeatFour returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getAverageWordLength')
        arr = [ 'tteeeesssstt' ]
        res = 12
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('empty returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getAverageWordLength')
        arr = []
        res = 0
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('onlyNonAlpha returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getAverageWordLength')
        arr = [ '2', '2017', '2017' ]
        res = 3
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('onlyNonAlphaNum returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getAverageWordLength')
        arr = []
        res = 0
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('onlySpaces returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getAverageWordLength')
        arr = []
        res = 0
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('wordLineWord returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getAverageWordLength')
        arr = [ 'test', 'text', 'test1', 'text1', 'test2', 'text2' ]
        res = 4.666666666666667
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('wordSpacesWord returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getAverageWordLength')
        arr = [ 'test', 'text' ]
        res = 4
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('word returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getAverageWordLength')
        arr = [ 'test' ]
        res = 4
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('zeroWordZero returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getAverageWordLength')
        arr = [ '0', 'test', '0' ]
        res = 2
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })
    })

    describe('getLineCount', () => {
      let str = null
      let res = null

      it('is callable', () => {
        const method = root.sandbox.stub(strings, 'getLineCount')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it('charRepeatFour returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getLineCount')
        str = requestFixtures.charRepeatFourData
        res = 2
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('empty returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getLineCount')
        str = requestFixtures.emptyData
        res = 1
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('onlyNonAlpha returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getLineCount')
        str = requestFixtures.onlyNonAlphaData
        res = 8
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('onlyNonAlphaNum returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getLineCount')
        str = requestFixtures.onlyNonAlphaNumData
        res = 10
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('onlySpaces returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getLineCount')
        str = requestFixtures.onlySpacesData
        res = 12
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('wordLineWord returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getLineCount')
        str = requestFixtures.wordLineWordData
        res = 9
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('wordSpacesWord returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getLineCount')
        str = requestFixtures.wordSpacesWordData
        res = 2
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('word returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getLineCount')
        str = requestFixtures.wordData
        res = 1
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('zeroWordZero returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getLineCount')
        str = requestFixtures.zeroWordZeroData
        res = 6
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })
    })

    describe('getWordsCharacterList', () => {
      const arr = [ 'is', 'a', 'list' ]
      const res = [ 'i', 's', 'a', 'l', 'i', 's', 't' ]

      it('is callable', () => {
        const method = root.sandbox.stub(strings, 'getWordsCharacterList')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it(`accepts argument: '${ arr }'`, () => {
        const method = root.sandbox.stub(strings, 'getWordsCharacterList')
        method(arr)
        method.should.have.been.calledWith(arr)
      })

      it(`returns valid result: '${ res }'`, () => {
        const method = root.sandbox.spy(strings, 'getWordsCharacterList')
        method(arr)
        method.should.have.been.returned(res)
      })
    })

    describe('getStringLength', () => {
      let str = null
      let res = null

      it('is callable', () => {
        const method = root.sandbox.stub(strings, 'getStringLength')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it('charRepeatFour returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getStringLength')
        str = 'tteeeesssstt'
        res = 12
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('empty returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getStringLength')
        str = ''
        res = 0
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('onlyNonAlpha returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getStringLength')
        str = '2 2017 2017'
        res = 11
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('onlyNonAlphaNum returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getStringLength')
        str = ''
        res = 0
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('onlySpaces returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getStringLength')
        str = ''
        res = 0
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('wordLineWord returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getStringLength')
        str = 'test text test1 text1 test2 text2'
        res = 33
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('wordSpacesWord returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getStringLength')
        str = 'test text'
        res = 9
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('word returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getStringLength')
        str = 'test'
        res = 4
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('zeroWordZero returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getStringLength')
        str = '0 test 0'
        res = 8
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })
    })

    describe('getStringLengths', () => {
      let arr = null
      let res = null

      it('is callable', () => {
        const method = root.sandbox.stub(strings, 'getStringLengths')
        method()
        method.calledOnce.should.be.equal(true)
      })

      it('charRepeatFour returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getStringLengths')
        arr = [ 'tteeeesssstt' ]
        res = [ 12 ]
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('empty returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getStringLengths')
        arr = []
        res = []
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('onlyNonAlpha returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getStringLengths')
        arr = [ '2', '2017', '2017' ]
        res = [ 1, 4, 4 ]
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('onlyNonAlphaNum returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getStringLengths')
        arr = []
        res = []
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('onlySpaces returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getStringLengths')
        arr = []
        res = []
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('wordLineWord returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getStringLengths')
        arr = [ 'test', 'text', 'test1', 'text1', 'test2', 'text2' ]
        res = [ 4, 4, 5, 5, 5, 5 ]
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('wordSpacesWord returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getStringLengths')
        arr = [ 'test', 'text' ]
        res = [ 4, 4 ]
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('word returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getStringLengths')
        arr = [ 'test' ]
        res = [ 4 ]
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('zeroWordZero returns valid result', () => {
        const method = root.sandbox.spy(strings, 'getStringLengths')
        arr = [ '0', 'test', '0' ]
        res = [ 1, 4, 1 ]
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })
    })

  })
})
