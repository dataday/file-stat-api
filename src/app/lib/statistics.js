// Statistics
// ==========
// @flow
/* eslint arrow-parens: 0 */
'use strict'
import * as utils from './utils'

/**
 * Calculates the number of characters devided by the number of words
 *
 * @param {Array<string>} words list of words
 * @returns {Object} results object
 */
const calculateMeanResult = (words: Array<string>): Object => {
  const averageWordLength = utils.strings.getAverageWordLength(words)
  const averageWordLengthRounded = utils.common.getRoundedNumber(
    averageWordLength,
    10
  )

  const wordCount = words.length
  const characterCount = utils.strings.getWordsCharacterList(words).length

  return {
    wordCount,
    characterCount,
    averageWordLength,
    averageWordLengthRounded
  }
}

/**
 * Calculates the mid-point, i.e., the middle point of word lengths found
 *
 * @param {Array<number>} lengths list of words
 * @returns {number} results
 */
const calculateMedianResult = (lengths: Array<number>): number => {
  const arrSorted = lengths.sort(utils.common.sortCompare)
  const arrLength = arrSorted.length

  let half = 0

  // even: devide middle, add middle and left of middle, and divide total by two
  if (arrLength % 2 === 0) {
    half = arrLength / 2
    half = Number(arrSorted[half] + arrSorted[half - 1]) / 2 || 0

  // odd: round down results of devision by 2
  } else {
    half = Math.floor(arrLength / 2)
    half = Number(arrSorted[half]) || 0
  }

  return half
}

/**
 * Calculates frequently occuring lengths of words detected
 *
 * @param {Array<number>} lengths list of numberics
 * @returns {Object} results
 */
const calculateModeResult = (lengths: Array<number>): Object => {
  const frequencies = utils.common.getFrequency(lengths)
  return utils.objects.getFrequentKeys(frequencies)
}

/**
 * Calculates frequently occuring characters detected
 *
 * @param {Array<string>} words list of words
 * @returns {Object} results
 */
const calculateCharacterFrequency = (words: Array<string>): Object => {
  const characters = utils.strings.getWordsCharacterList(words)
  const frequencies = utils.common.getFrequency(characters)
  return utils.objects.getFrequentKeys(frequencies)
}

/**
 * Calculates text statistics,
 *  e.g., word, character and line counts, etc
 *
 * Text is reduced to usable content only
 * lines without usable content are removed
 * numbers are considered in word counts
 *
 * @param {string} str text string
 * @returns {Object} results from calculation
 */
const calculateStatistics = (str: string): Object => {
  const text = str || ''
  const words = utils.strings.getWords(text)
  const wordLengths = utils.strings.getStringLengths(words)
  const stats = {}

  stats.mean = calculateMeanResult(words)
  stats.median = calculateMedianResult(wordLengths)
  stats.mode = calculateModeResult(wordLengths)
  stats.characterFrequency = calculateCharacterFrequency(words)
  stats.lineCount = utils.strings.getLineCount(text)

  return stats
}

/**
 * Gets statistics for a given file
 *
 * @see Multer
 * @param {Object} obj file input object
 * @returns {Object} file statistics, mean, median and mode, etc
 */
const getStatistics = async (obj: Object): Object => {
  // sensitive properties
  const omissions = [
    // the saved destination path
    'destination',
    // the saved file name
    'filename',
    // the saved full file path
    'path'
  ]

  // promisified: get content
  const content = await utils.files.readFileStream(obj.path, 'utf8')

  // promisified: delete the file
  await utils.files.unlinkFile(obj.path)

  // calculate statistics
  const statistics = calculateStatistics(content)

  // assign results
  const results = await utils.objects.cloneWithAdditions(obj, {
    // assign content
    content,
    // assign statistics
    statistics
  })

  // return conditioned results
  return await utils.objects.cloneWithOmissions(results, omissions)
}

export default getStatistics
