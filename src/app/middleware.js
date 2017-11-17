// Middleware
// ==========
// @flow
/* eslint import/no-nodejs-modules: 0 */
'use strict'
import * as utils from './lib/utils'
import compression from 'compression'
import cors from 'cors'
import { errorHandler } from './exceptions'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'

import router from './router'

const paths = { public: path.join(__dirname, '/../public') }
const logging = utils.common.isProduction()
  ? 'combined'
  : 'dev'

export const sequence = [
  'representations',
  'cors',
  'compression',
  'staticPath',
  'logger',
  'helmet',
  'router',
  'errorHandler'
]

export const methods = {
  staticPath: () => express.static(paths.public),

  representations: () => [
    express.json(),
    express.urlencoded({ extended: true })
  ],

  cors: () => cors({
    methods: [ 'GET', 'POST' ],
    preflightContinue: false
  }),

  compression: () => compression(),

  helmet: () => helmet({ frameguard: false }),

  router: () => router,

  errorHandler: () => errorHandler,

  logger: () => morgan(logging)
}
