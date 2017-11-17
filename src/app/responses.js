// Responses
// =========
// @flow
/* eslint arrow-body-style: ["error", "as-needed", { "requireReturnForObjectLiteral": true }] */
/* eslint-env es6 */
'use strict'
import * as utils from './lib/utils'

/**
 * Gets HTTP response object
 *
 * @type {Object}
 * @property {string} api API name
 * @property {string} version version number
 * @property {string} status response status
 * @property {boolean} success Success status
 * @property {string} dateTime ISO formatted data time
 * @returns {Object} response object
 */
const getResponseObj = (): Object => {
  return {
    api: 'file-stat-api',
    version: '0.1.0',
    status: 'OK',
    success: true,
    dateTime: utils.common.getIsoFormattedDate()
  }
}

export default getResponseObj
