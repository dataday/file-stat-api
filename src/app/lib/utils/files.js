// Files
// =====
// @flow
/* eslint arrow-parens: 0 */
/* eslint import/no-nodejs-modules: 0 */
'use strict'
import fs from 'fs-extra'
import path from 'path'
import util from 'util'

// fs-extra acts as a subsitute to some methods and promise chaining
// nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original
const unlink = util.promisify(fs.unlink)
const stat = util.promisify(fs.stat)

/**
 * Validates a file suffix
 *
 * @param {string} name file name
 * @returns {boolean} true if successful, otherwise false
 */
export const isValidSuffix = (name: string): boolean =>
  /\.txt$/.test(name)

/**
 * Destructures a file name into component parts
 *
 * @param {string} filename file name
 * @returns {Array<string>} filename.basename and filename.extname
 */
export const destructureFilename = (filename: string): Array<string> => {
  const extname = path.extname(filename)
  const basename = path.basename(filename, extname)
  return [ basename, extname ]
}

/**
 * Creates a directory with permissions
 * x-team.com/blog/file-system-permissions-umask-node-js/
 *
 * - read, write, and execute for owner only
 * - alias: u+rwx
 *
 * @param {string} destination directory name
 * @param {string} mode file permissions
 * @returns {Object} promised result
 */
export const createDirectory = (
  destination: string,
  mode: string = '0700'
): Object =>
  fs.ensureDir(
    destination,
    // o700 & (~process.umask())
    // $FlowFixMe
    Number(mode) & ~process.umask()
  )

/**
 * Gets data contained in a specified file
 * nodejs.org/api/fs.html#fs_fs_createreadstream_path_options
 *
 * @param {string} path file path
 * @param {string} encoding file encoding (default: utf8)
 * @returns {string} file content
 */
export const readFileStream = (path: string, encoding: string = 'utf8'): string =>
  // $FlowFixMe
  new Promise((resolve, reject) => {
    let output = ''
    // read file data
    const stream = fs.createReadStream(path, {
      bufferSize: 4 * 1024,
      encoding
    })
    // accompanied promise with async / await
    // to retrieve data, subscribed to stream
    // events via EventEmitter
    stream.on('data', chunk => output += chunk)
      .on('error', error => reject(`BBBBDBBBB ${ error }`))
      .on('end', () => resolve(output))
  })

/**
 * Gets data contained in specified file
 *
 * @param {string} path file path
 * @returns {Object} results object
 */
export const unlinkFile = async (path: string): Object =>
  await unlink(path)
    .then(() =>
      stat(path)
        .then(result => result)
        .catch(error => error)
    )
    .catch(error => error)
