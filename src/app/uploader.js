// Uploader
// ========
// @flow
'use strict'
import * as utils from './lib/utils'
import { ApplicationError } from './exceptions'
import multer from 'multer'

const destination = '/tmp/file-stat-api'
// upload limitations
const limits: Object = {
  // max file size (in bytes) | 1MB = 1048576
  fileSize: 1048576,
  // max number of file fields
  files: 4,
  // max number of non-file fields
  fields: 0,
  // max field value size
  fieldSize: '1MB',
  // max field name size
  fieldNameSize: 100
}

/**
 * Multer specific file filter
 *
 * @param {Object} req request
 * @param {Object} file file reference
 * @param {Function} callback multer callback
 * @returns {*} true if successful, otherwise Error and false
 */
const fileFilter = (req: Object, file: Object, callback: Function) => {
  const name = utils.strings.sanitiseFileName(file.originalname)
  const error = new ApplicationError(name, 10)
  // uploads will require a valid suffix
  if (!utils.files.isValidSuffix(name))
    // the error is passed back to express
    return callback(error)
  // suffix validated, added string value over boolean
  return callback(null, name)
}

/**
 * Multer specific disk storage
 *
 * @param {Object} req request
 * @param {Object} file file reference
 * @param {Function} callback multer callback
 * @returns {*} true if successful, otherwise Error and false
 */
const storage = multer.diskStorage({
  /**
   * When the destination is passed as a string Multer creates the
   * desired folder structure ;)
   */
  destination,

  /**
   * Multer specific filename for the uploaded file
   *
   * When the destination is passed as a function the service creates the
   * desired folder structure
   * @param {Object} req request
   * @param {Object} file file reference
   * @param {Function} callback multer callback
   * @returns {*} initial callback with destination, otherwise a ApplicationError

    destination: (req: Object, file: Object, callback: Function) => {
      const error = new ApplicationError(destination, 11)
      utils.files.createDirectory(destination).then(() => {
        return callback(null, destination)
      }).catch(error => {
        return callback(error, false)
      })
    },
   */

  /**
   * Multer specific filename for the uploaded file
   *
   * @param {Object} req request
   * @param {Object} file file reference
   * @param {Function} callback multer callback
   * @returns {*} initial callback with new filename argument
   */
  filename: (req: Object, file: Object, callback: Function) => {
    const name = utils.strings.sanitiseFileName(file.originalname)
    const [ basename, extname ] = utils.files.destructureFilename(name)
    const filename = 'upload-'.concat(basename, extname)
    callback(null, filename)
  }
})

const uploader = multer({
  limits,
  storage,
  fileFilter
})

export default uploader
