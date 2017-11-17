// App
// ===
// @flow
/* eslint no-unused-vars: 0 */
/* global app */
'use strict'
import * as middleware from './app/middleware'
import express from 'express'

/**
 * Class representing the app
 *
 * @class App
 */
class App {
  app: Function

  /**
   * Constructor
   *
   * @return {void}
   * @constructor
   */
  constructor (): void {
    this.app = express()
  }

  /**
   * Configure middleware support
   *
   * @return {void}
   */
  configure (): void {
    const app: Function = this.app
    // sequence middleware insertion
    middleware.sequence.forEach(name => {
      const method = middleware.methods[name]
      console.log('+ Middleware', name)
      app.use(method())
    })
  }

  /**
   * Starts server, called from ./bin/server
   *
   * @return {void}
   */
  start (): void {
    const app: Function = this.app
    app.disable('x-powered-by')
    this.configure()
  }
}

export default App
