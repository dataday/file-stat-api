'use strict'
// module under test
import App from '../../src/app'
import chai from 'chai'
import mocha from 'mocha'
import sinonChai from 'sinon-chai'

// abstracted suite behaviour
import suite from '../suite'

chai.use(sinonChai)
chai.should()

const expect = chai.expect

describe('App', () => {
  const root = {}
  let AppSpy,
    server = null

  beforeEach('setUp', () => {
    suite.beforeEach(root)
    AppSpy = root.sandbox.spy(() =>
      root.sandbox.createStubInstance(App)
    )
    server = new AppSpy()
  })

  afterEach('tearDown', () => {
    suite.afterEach(root)
  })

  it('is invoked with new', () => {
    AppSpy.calledWithNew
  })

  it('has constructor', () => {
    expect(server).itself.to.respondTo('constructor')
  })

  it('has instance methods', () => {
    const start = server.start
    expect(server).itself.to.respondTo('start')

    const configure = server.configure
    expect(server).itself.to.respondTo('configure')

    start()
    start.calledOnce.should.be.equal(true)

    configure()
    configure.calledOnce.should.be.equal(true)
  })

})
