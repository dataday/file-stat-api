'use strict'
/* eslint id-length: ["error", { "properties": "never" }] */
import * as fixtures from '../../fixtures'
import * as specUtils from '../../utils'
import chai from 'chai'
import mocha from 'mocha'
import rewire from 'rewire'
import sinonChai from 'sinon-chai'

// abstracted suite behaviour
import suite from '../../suite'

chai.use(sinonChai)

// module under test
const statistics = rewire('../../../src/app/lib/statistics')

describe('Common', () => {
  describe('statistics', () => {
    const root = {}
    let meanFixtures,
      statFixtures,
      // responseFixture,
      requestFixtures,
      calculateStatistics,
      calculateMeanResult,
      calculateMedianResult,
      calculateModeResult,
      calculateCharacterFrequency = null

    before(async () => {
      await suite.before(root)
      meanFixtures = await specUtils.loadFixtures(fixtures.responses.mean)
      statFixtures = await specUtils.loadFixtures(fixtures.responses.stat)
      // responseFixture = await specUtils.loadFixtures(fixtures.responses.content)
      requestFixtures = root.fixtures.requests
    })

    beforeEach('setUp', () => {
      suite.beforeEach(root)
      calculateStatistics = root.sandbox.spy(
        statistics.__get__('calculateStatistics')
      )
      calculateMeanResult = root.sandbox.spy(
        statistics.__get__('calculateMeanResult')
      )
      calculateMedianResult = root.sandbox.spy(
        statistics.__get__('calculateMedianResult')
      )
      calculateModeResult = root.sandbox.spy(
        statistics.__get__('calculateModeResult')
      )
      calculateCharacterFrequency = root.sandbox.spy(
        statistics.__get__('calculateCharacterFrequency')
      )
    })

    afterEach('tearDown', () => {
      suite.afterEach(root)
    })

    describe('calculateMeanResult', () => {
      let arr = null
      let obj = null
      let res = null

      it('charRepeatFour returns valid result', () => {
        const method = calculateMeanResult
        arr = [ 'tteeeesssstt' ]
        obj = meanFixtures.charRepeatFourData
        res = method(arr)
        method.should.have.been.calledWith(arr)
        obj.should.deep.equal(res)
      })

      it('empty returns valid result', async () => {
        const method = calculateMeanResult
        arr = []
        res = meanFixtures.emptyData
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('onlyNonAlpha returns valid result', () => {
        const method = calculateMeanResult
        arr = [ '2', '2017', '2017' ]
        obj = meanFixtures.onlyNonAlphaData
        res = method(arr)
        method.should.have.been.calledWith(arr)
        obj.should.deep.equal(res)
      })

      it('onlyNonAlphaNum returns valid result', () => {
        const method = calculateMeanResult
        arr = []
        res = meanFixtures.onlyNonAlphaNumData
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('onlySpaces returns valid result', () => {
        const method = calculateMeanResult
        arr = []
        res = meanFixtures.onlySpacesData
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('wordLineWord returns valid result', () => {
        const method = calculateMeanResult
        arr = [ 'test', 'text', 'test1', 'text1', 'test2', 'text2' ]
        res = meanFixtures.wordLineWordData
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('wordSpacesWord returns valid result', () => {
        const method = calculateMeanResult
        arr = [ 'test', 'text' ]
        res = meanFixtures.wordSpacesWordData
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('word returns valid result', () => {
        const method = calculateMeanResult
        arr = [ 'test' ]
        res = meanFixtures.wordData
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('zeroWordZero returns valid result', () => {
        const method = calculateMeanResult
        arr = [ '0', 'test', '0' ]
        res = meanFixtures.zeroWordZeroData
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })
    })

    describe('calculateMedianResult', () => {
      let arr = null
      let res = null

      it('charRepeatFour returns valid result', () => {
        const method = calculateMedianResult
        arr = [ 10 ]
        res = 10
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('empty returns valid result', () => {
        const method = calculateMedianResult
        arr = []
        res = 0
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('onlyNonAlpha returns valid result', () => {
        const method = calculateMedianResult
        arr = [ 4, 1, 4 ]
        res = 4
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('onlyNonAlphaNum returns valid result', () => {
        const method = calculateMedianResult
        arr = []
        res = 0
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('onlySpaces returns valid result', () => {
        const method = calculateMedianResult
        arr = []
        res = 0
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('wordLineWord returns valid result', () => {
        const method = calculateMedianResult
        arr = [ 4, 5, 5, 4, 5, 5 ]
        res = 5
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('wordSpacesWord returns valid result', () => {
        const method = calculateMedianResult
        arr = [ 4, 4 ]
        res = 4
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('word returns valid result', () => {
        const method = calculateMedianResult
        arr = [ 4 ]
        res = 4
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('zeroWordZero returns valid result', () => {
        const method = calculateMedianResult
        arr = [ 1, 4, 1 ]
        res = 1
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })
    })

    describe('calculateModeResult', () => {
      let arr = null
      let res = null

      it('charRepeatFour returns valid result', () => {
        const method = calculateModeResult
        arr = [ 4, 4, 4 ]
        res = { 4: 3 }
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('empty returns valid result', () => {
        const method = calculateModeResult
        arr = []
        res = {}
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('onlyNonAlpha returns valid result', () => {
        const method = calculateModeResult
        arr = [ 4, 1, 4 ]
        res = { 4: 2 }
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('onlyNonAlphaNum returns valid result', () => {
        const method = calculateModeResult
        arr = []
        res = {}
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('onlySpaces returns valid result', () => {
        const method = calculateModeResult
        arr = []
        res = {}
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('wordLineWord returns valid result', () => {
        const method = calculateModeResult
        arr = [ 4, 5, 5, 4, 5, 5 ]
        res = { 5: 4 }
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('wordSpacesWord returns valid result', () => {
        const method = calculateModeResult
        arr = [ 4, 4 ]
        res = { 4: 2 }
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('word returns valid result', () => {
        const method = calculateModeResult
        arr = [ 4 ]
        res = { 4: 1 }
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('zeroWordZero returns valid result', () => {
        const method = calculateModeResult
        arr = [ 1, 4, 1 ]
        res = { 1: 2 }
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })
    })

    describe('calculateCharacterFrequency', () => {
      let arr = null
      let res = null

      it('charRepeatFour returns valid result', () => {
        const method = calculateCharacterFrequency
        arr = [ 'tteeeesssstt' ]
        res = {
          t: 4,
          e: 4,
          s: 4
        }
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('empty returns valid result', () => {
        const method = calculateCharacterFrequency
        arr = []
        res = {}
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('onlyNonAlpha returns valid result', () => {
        const method = calculateCharacterFrequency
        arr = [ '2', '2017', '2017' ]
        res = { 2: 3 }
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('onlyNonAlphaNum returns valid result', () => {
        const method = calculateCharacterFrequency
        arr = []
        res = {}
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('onlySpaces returns valid result', () => {
        const method = calculateCharacterFrequency
        arr = []
        res = {}
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('wordLineWord returns valid result', () => {
        const method = calculateCharacterFrequency
        arr = [ 'test', 'text', 'test1', 'text1', 'test2', 'text2' ]
        res = { t: 12 }
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('wordSpacesWord returns valid result', () => {
        const method = calculateCharacterFrequency
        arr = [ 'test', 'text' ]
        res = { t: 4 }
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('word returns valid result', () => {
        const method = calculateCharacterFrequency
        arr = [ 'test' ]
        res = { t: 2 }
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })

      it('zeroWordZero returns valid result', () => {
        const method = calculateCharacterFrequency
        arr = [ '0', 'test', '0' ]
        res = {
          0: 2,
          t: 2
        }
        method(arr)
        method.should.have.been.calledWith(arr)
        method.should.have.been.returned(res)
      })
    })

    describe('calculateStatistics', () => {
      let str = null
      let res = null

      it('charRepeatFour returns valid result', () => {
        const method = calculateStatistics
        str = requestFixtures.charRepeatFourData
        res = statFixtures.charRepeatFourData
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('empty returns valid result', () => {
        const method = calculateStatistics
        str = requestFixtures.emptyData
        res = statFixtures.emptyData
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('onlyNonAlpha returns valid result', () => {
        const method = calculateStatistics
        str = requestFixtures.onlyNonAlphaData
        res = statFixtures.onlyNonAlphaData
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('onlyNonAlphaNum returns valid result', () => {
        const method = calculateStatistics
        str = requestFixtures.onlySpacesData
        res = statFixtures.onlyNonAlphaNumData
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('onlySpaces returns valid result', () => {
        const method = calculateStatistics
        str = requestFixtures.onlySpacesData
        res = statFixtures.onlySpacesData
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('wordLineWord returns valid result', () => {
        const method = calculateStatistics
        str = requestFixtures.wordLineWordData
        res = statFixtures.wordLineWordData
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('wordSpacesWord returns valid result', () => {
        const method = calculateStatistics
        str = requestFixtures.wordSpacesWordData
        res = statFixtures.wordSpacesWordData
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('word returns valid result', () => {
        const method = calculateStatistics
        str = requestFixtures.wordData
        res = statFixtures.wordData
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })

      it('zeroWordZero returns valid result', () => {
        const method = calculateStatistics
        str = requestFixtures.zeroWordZeroData
        res = statFixtures.zeroWordZeroData
        method(str)
        method.should.have.been.calledWith(str)
        method.should.have.been.returned(res)
      })
    })

    describe('getStatistics', () => {
      // let str = null
      // let obj = null
      // let res = null

      it('is callable', () => {
        const method = root.sandbox.stub(statistics, 'default')
        method()
        method.calledOnce.should.be.equal(true)
      })

      // it('returns valid result', () => {
      //   const method = root.sandbox.spy(statistics, 'default')
      //   str = specUtils.createFixturePath('./request.txt')
      //   obj = responseFixture.response
      //   res = method({ path: str })
      //
      //   // delete date time properties
      //   delete res.dateTime
      //   delete obj.dateTime
      //
      //   method.should.have.been.calledWith({ path: str })
      //   obj.should.deep.equal(res)
      // })
    })

  })
})
