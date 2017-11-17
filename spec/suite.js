'use strict'
import * as specUtils from './utils'
import fsMock from 'mock-fs'
import { requests } from './fixtures'
import sinon from 'sinon'

const suite = {
  before: async (root: Object) => {
    root.fixtures = {}
    root.fixtures.requests = await specUtils.loadFixtures(requests)
  },

  after: (root: Object) =>
    root.fixtures = null,

  beforeEach: (root: Object) => {
    root.sandbox = sinon.sandbox.create({
      properties: [ 'spy', 'stub', 'mock', 'clock', 'server', 'requests' ],
      useFakeTimers: true,
      useFakeServer: true
    })
    root.fsMock = fsMock({
      '/mock/path/to/dir': {
        'mock-file.txt': 'Mock file content.',
        '/tmp/file-stat-mock': {}
      }
    })
  },

  afterEach: (root: Object) => {
    root.sandbox.restore()
    fsMock.restore()
  }
}

export default suite
