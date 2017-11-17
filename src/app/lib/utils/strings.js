// Strings
// =======
// @flow
/* eslint arrow-parens: 0 */
/* eslint quotes: 0 */
'use strict'

/**
 * Marshal to string and trim
 *
 * @param {string} str input string
 * @returns {string} trimmed string
 */
export const trimString = (str: string): string => (str || '').toString().trim()

/**
 * Removes certain non-alphanumeric characters from filename
 * Uses explict long form character classes
 *
 * @param {string} filename input string
 * @returns {string} sanitised filename string
 */
export const sanitiseFileName = (filename: string): string =>
  trimString(filename || '')
    .toLowerCase()
    .replace(/[^0-9a-z.\-_]/g, '')
    .replace(/^[^0-9a-z]+|[^0-9a-z]+$/gm, '')

/**
 * Removes most non-alphanumeric characters from string input
 * Numbers, as here, are usually considered within word counts
 * $ man isalnum Vs $ man isalpha
 *
 * @param {string} str string input
 * @returns {string} sanitised result
 */
export const sanitiseText = (str: string): string =>
  trimString(
    (str || '')
      .toLowerCase()
      // replace line breaks with spaces
      // single word lines should be catered for
      .replace(/[\n\r]/g, ' ')
      // keep alphanumeric characters and spaces
      .replace(/[^0-9a-z ]/g, '')
      // replaces double spaces with single space
      .replace(/ {2}/g, ' ')
  )

/**
 * Removes line breaks from a string
 *
 * @param {string} str input string
 * @returns {string} replacement string
 */
export const removeLineBreaks = (str: string): string =>
  trimString(str || '').replace(/[\n\r]/g, '')

/**
 * Gets words in list format from a input string
 *
 * @param {string} str input string
 * @returns {Array<string>} list of words
 */
export const getWords = (str: string): Array<string> =>
  removeLineBreaks(
    sanitiseText(str)
  ).split(' ')
    // swaps empty strings, null or undefined values for zero
    // maintains explict zeros
    .filter(item => item === 0 || item)

/**
 * Gets the average characters per word
 *
 * @param {Array<string>} words list of words
 * @returns {number} average characters in words
 */
export const getAverageWordLength = (words: Array<string>): number => {
  const characters = words.join('')
  return characters.length / words.length || 0
}

/**
 * Gets line count
 *
 * @param {string} str input string
 * @returns {number} number of lines
 */
export const getLineCount = (str: string): number => str.split("\n").length

/**
 * Gets a list of characters from a list of words
 *
 * @param {Array<string>} words list of words
 * @returns {Array<string>} list of characters
 */
export const getWordsCharacterList = (words: Array<string>): Array<string> =>
  words
    .join('')
    .split('')

/**
 * Calculates the length of a string
 *
 * @param {string} str input string
 * @returns {number} length of string
 */
export const getStringLength = (str: string): number => str.length

/**
 * Calculates the length of strings in a list
 *
 * @param {Array<string>} list list of strings
 * @returns {Array<number>} list of string lengths
 */
export const getStringLengths = (list: Array<string>): Array<number> => {
  const lengths = []

  // retain word lengths
  list.forEach(str =>
    lengths.push(
      getStringLength(str)
    )
  )

  return lengths
}
