'use strict'
/* eslint object-shorthand: ["error", "never"] */
/* eslint arrow-body-style: ["error", "as-needed", { "requireReturnForObjectLiteral": true }] */
/* eslint-env es6 */
import chai from 'chai'
import fs from 'fs-extra'
/* eslint import/no-nodejs-modules: ["error", {"allow": ["path"]}] */
import path from 'path'

const expect = chai.expect

/**
 * Creates the path to a specified fixture file
 *
 * @param {string} filePath file path input
 * @returns {string} file path
 */
export const createFixturePath = (filePath: string): string =>
  path.join(__dirname, '/fixtures', filePath)

/**
 * Loads fixtures from disk
 *
 * @param {Object} obj fixture name and file path pairs
 * @returns {Object} fixture name and actual data pairs
 */
export const loadFixtures = async (obj: Object): Object => {
  const results = {}

  for (const file in obj) {
    const dataKey = file.concat('Data')
    // read file data
    const data = await fs.readFile(createFixturePath(obj[file]), 'utf8')
    // retain original file reference
    results[file] = createFixturePath(obj[file])
    // convert JSON to native JS object
    results[dataKey] = /\.json/.test(obj[file])
      ? JSON.parse(data)
      : data
  }

  return results
}

/**
 * Tests result status and JSON rendering calls
 *
 * @param {number} code HTTP status code
 * @param {string} message HTTP status message
 * @param {Function} done mocha done function
 * @returns {Object} rendering object
 */
export const testStatusResult = (
  code: number,
  message: string,
  done: Function
): Object => {
  // avoid binding
  return {
    status: function (status: number) {
      expect(status).to.equal(code)
      return this
    },
    json: function (json: Object) {
      expect(json.status).to.equal(message)
      done()
    }
  }
}
