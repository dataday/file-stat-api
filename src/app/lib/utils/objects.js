// Objects
// =======
// @flow
/* eslint arrow-parens: 0 */
'use strict'
import { value as sortByValue } from 'sort-object-properties'

/**
 * Clones object with omissions (non-destructive)
 *
 * @param {Object} obj a object to be cloned
 * @param {Array<string>} omissions omissions to be made to object
 * @returns {Object} new object with omissions
 */
export const cloneWithOmissions = (
  obj: Object,
  omissions: Array<string>
): Object => {
  // reduce to accumulator using current key
  const newObj = Object.keys(obj).reduce((accumulator, currentKey) => {
    if (!omissions.includes(currentKey))
      // spread, assign desired key:value pairs
      return {
        ...accumulator,
        [currentKey]: obj[currentKey]
      }

    return accumulator
  }, {})

  return newObj
}

/**
 * Clones object with additions (non-destructive)
 *
 * @param {Object} obj a object to be cloned
 * @param {Object} additions additions to be made to object
 * @returns {Object} object with additions
 */
export const cloneWithAdditions = (obj: Object, additions: Object): Object =>
  Object.assign({}, obj, additions)

/**
 * Sorts object by property values
 * github.com/Kuchasz/sort-object-properties
 *
 * @param {Object} obj sortable object
 * @param {string} dir sort direction, 1 = ascending or -1 = descending
 * @returns {Object} sorted object
 */
export const sortObjectByValue = (obj: Object, dir: string = '-1'): Object =>
  sortByValue(obj, dir)

/**
 * Gets frequent keys by their frequency value
 *
 * @param {Object} obj frequences object
 * @returns {Object} most frequent key list
 */
export const getFrequentKeys = (obj: Object): Object => {
  const results = {}
  let value = null

  // find highest value
  Object.keys(obj).forEach(key => {
    if (!value)
      // assign initial value
      value = obj[key]
    else if (value < obj[key])
      // if value is less than the current value assign current value
      value = obj[key]
  })

  // find items matching highest value
  Object.keys(obj).filter(key => {
    if (obj[key] === value)
      // store key value pairs of items matching highest value
      results[key] = value
    // returns the last highest value found
    return obj[key] === value
  })

  return results
}
