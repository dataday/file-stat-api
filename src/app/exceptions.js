// Exceptions
// ==========
// @flow
'use strict'
/* eslint no-unused-vars: ["error", {"args": "none"}] */
import * as utils from './lib/utils'
import getResponseObj from './responses'

/**
 * Represents application ApplicationError
 *
 * @extends Error
 */
export class ApplicationError extends Error {
  /**
   * Creates an error
   *
   * @param {string} message error message
   * @param {number} code error code
   */
  constructor (message: string, code: number): void {
    super(message)
    this.name = this.constructor.name
    // $FlowFixMe
    this.code = code
    if (utils.common.isProduction())
      this.stack = `${ this.name }: looks like something went wrong.`
  }
}

/**
 * Represents application HttpError
 *
 * @extends ApplicationError
 */
export class HttpError extends ApplicationError {}

/**
 * Handles application errors
 *
 * @param {Object} err formal err object
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next next function (expressjs)
 * @returns {void}
 */
export const errorHandler = (
  err: Object,
  req: Object,
  res: Object,
  next: Function
): void => {
  // console.log('+ Exception', err)
  switch (err.code) {
  case 'LIMIT_FIELD_COUNT':
    err = new HttpError('400 Bad Request', 400)
    break
  default:
  }

  // HTTP status code
  err.code = err.code >= 100 && err.code <= 598
    ? err.code
    : 500

  // HTTP status message
  err.message = err.code !== 500
    ? err.message
    : '500 Internal Server Error'

  // assign status code and render template
  const json = utils.objects.cloneWithAdditions(
    getResponseObj(), {
      status: err.message,
      message: err.stack,
      success: false
    }
  )
  // serve reults
  res.status(err.code).json(json)
}
