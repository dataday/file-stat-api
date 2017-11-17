// Base
// ====
// @flow
/* eslint arrow-parens: 0 */
'use strict'

/**
 * Tests if the NODE_ENV is production
 *
 * @returns {boolean} true if successful, otherwise false
 */
export const isProduction = (): boolean => process.env.NODE_ENV === 'production'

/**
 * Tests if the NODE_ENV is test
 *
 * @returns {boolean} true if successful, otherwise false
 */
export const isTest = (): boolean => process.env.NODE_ENV === 'test'

/**
 * Gets ISO8601 formatted date
 *
 * @returns {string} ISO8601 formatted date
 */
export const getIsoFormattedDate = (): string => new Date().toISOString()

/**
 * Sorts an array ascending
 * http://www.javascriptkit.com/javatutors/arraysort.shtml
 *
 * @param {number} left left number
 * @param {number} right right number
 * @returns {number} negitive or positive number
 */
export const sortCompare = (left: number, right: number): number =>
  left - right

/**
 * Calculates the average characters per word
 *
 * @param {number} number input number
 * @param {number} decimalPlace decimal place number
 * @returns {number} rounded number
 */
export const getRoundedNumber = (
  number: number,
  decimalPlace: number = 10
): number =>
  Math.round(number * 10) / decimalPlace

/**
 * Gets the frequency of a values in a list
 *
 * @param {Array<any>} arr list of values
 * @returns {Object} frequencies.
 */
export const getFrequency = (arr: Array<any>): Object =>
  // creates a new object of results
  arr.reduce((results, value) => {
    // if the value exists
    results[value]
      // increment it's count
      ? results[value]++
      // mark as seen
      : results[value] = 1
    return results
  }, {})

/**
 * Wraps async functions, manages promisification and error trapping
 * medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
 *
 * @param {Function} fn request
 * @returns {Function} function calling a promise
 */
export const asyncAwait = (fn: Function): Function =>
  (req: Object, res: Object, next: Function): Object =>
    // console.log('AWAIT', req, res, next)
    Promise
      .resolve(fn(req, res, next))
      .catch(err => next(err))
