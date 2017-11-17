'use strict'
import chai from 'chai'
import chaiHttp from 'chai-http'
import mocha from 'mocha'
import sinonChai from 'sinon-chai'
import { readFileSync } from 'fs'

// abstracted suite behaviour
import suite from '../suite'

chai.use(sinonChai)
chai.use(chaiHttp)

const expect = chai.expect

describe('App', () => {
  describe('router', () => {
    const root = {}
    let request,
      properties,
      contentType,
      requestFixtures = null

    before(async () => {
      await suite.before(root)
    })

    beforeEach('setUp', () => {
      suite.beforeEach(root)
      request = chai.request('http://localhost:7080')
      properties = [ 'api', 'version', 'status', 'success', 'dateTime' ]
      contentType = 'application/json; charset=utf-8'
      requestFixtures = root.fixtures.requests
    })

    afterEach('tearDown', () => {
      suite.afterEach(root)
    })

    describe('GET', () => {
      const arr = [
        'vary',
        'content-type',
        'x-xss-protection',
        'x-content-type-options',
        'strict-transport-security',
        'access-control-allow-origin'
      ]
      arr.forEach(str => {
        it(`/ - responds with '${ str }' header`, done => {
          request.get('/')
            .end((err, res) => {
              res.header.should.have.property(str)
              done()
            })
        })
      })

      it('/ - responds with HTTP status 200', done => {
        request.get('/')
          .end((err, res) => {
            res.body.should.be.a('object')
            properties.forEach(property => {
              res.body.should.have.property(property)
            })
            expect(res).to.have.status(200)
            expect(res.header['content-type']).to.equal(contentType)
            expect(res.body.status).to.equal('OK')
            expect(res.body.success).to.equal(true)
            done()
          })
      })

      it('/upload - responds with HTTP status 405', done => {
        request.get('/upload')
          .end((err, res) => {
            res.body.should.be.a('object')
            properties.forEach(property => {
              res.body.should.have.property(property)
            })
            expect(res).to.have.status(405)
            expect(res.header['content-type']).to.equal(contentType)
            expect(res.body.message).to.contain('HttpError')
            expect(res.body.status).to.equal('405 Method Not Allowed')
            expect(res.body.success).to.equal(false)
            done()
          })
      })

      it('/a-404 = responds with \'HTTP status 404\'', done => {
        request.get('/a-404')
          .end((err, res) => {
            res.body.should.be.a('object')
            properties.forEach(property => {
              res.body.should.have.property(property)
            })
            expect(res).to.have.status(404)
            expect(res.header['content-type']).to.equal(contentType)
            expect(res.body.message).to.contain('HttpError')
            expect(res.body.status).to.equal('404 Not Found')
            expect(res.body.success).to.equal(false)
            done()
          })
      })
    })

    describe('POST', () => {
      it('/ - responds with \'405 Method Not Allowed\'', done => {
        request.post('/')
          .end((err, res) => {
            res.body.should.be.a('object')
            properties.forEach(property => {
              res.body.should.have.property(property)
            })
            expect(res).to.have.status(405)
            expect(res.header['content-type']).to.equal(contentType)
            expect(res.body.message).to.contain('HttpError')
            expect(res.body.status).to.equal('405 Method Not Allowed')
            expect(res.body.success).to.equal(false)
            done()
          })
      })

      it('/upload - responds with \'400 Bad Request\' (no file field)',
        done => {
          request.post('/upload')
            .type('form')
            .end((err, res) => {
              res.body.should.be.a('object')
              properties.forEach(property => {
                res.body.should.have.property(property)
              })
              expect(res).to.have.status(400)
              expect(res.header['content-type']).to.equal(contentType)
              expect(res.body.message).to.contain('HttpError')
              expect(res.body.status).to.equal('400 Bad Request')
              expect(res.body.success).to.equal(false)
              done()
            })
        }
      )

      it('/upload - responds \'400 Bad Request\' (empty file field)',
        done => {
          request.post('/upload')
            .type('form')
            .send({ file: '' })
            .end((err, res) => {
              res.body.should.be.a('object')
              properties.forEach(property => {
                res.body.should.have.property(property)
              })
              expect(res).to.have.status(400)
              expect(res.header['content-type']).to.equal(contentType)
              expect(res.body.message).to.contain('HttpError')
              expect(res.body.status).to.equal('400 Bad Request')
              expect(res.body.success).to.equal(false)
              done()
            })
        }
      )

      // it('/upload - responds with \'400 Bad Request\' (empty file)', done => {
      //   request.post('/upload')
      //     .type('form')
      //     .attach('file', readFileSync(requestFixtures.empty, 'utf8'), 'empty.txt')
      //     .end((err, res) => {
      //       res.body.should.be.a('object')
      //       properties.forEach(property => {
      //         res.body.should.have.property(property)
      //       })
      //       expect(res).to.have.status(400)
      //       expect(res.header['content-type']).to.equal(contentType)
      //       expect(res.body.message).to.contain('HttpError')
      //       expect(res.body.status).to.equal('400 Bad Request')
      //       expect(res.body.success).to.equal(false)
      //       done()
      //     })
      // })

      it('/a-404 = responds with \'404 Not Found\'', done => {
        request.post('/a-404')
          .end((err, res) => {
            res.body.should.be.a('object')
            properties.forEach(property => {
              res.body.should.have.property(property)
            })
            expect(res).to.have.status(404)
            expect(res.header['content-type']).to.equal(contentType)
            expect(res.body.message).to.contain('HttpError')
            expect(res.body.status).to.equal('404 Not Found')
            expect(res.body.success).to.equal(false)
            done()
          })
      })

    })
  })
})
