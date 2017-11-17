// Router
// ======
// @flow
/* eslint arrow-parens: 0 */
'use strict'
import * as utils from './lib/utils'
import { HttpError } from './exceptions'
import { Router } from 'express'
import getResponseObj from './responses'
import getStatistics from './lib/statistics'
import uploader from './uploader'

const router = Router()
const accepts = uploader.single('file')

/**
 * [GET] Index route
 */
router.get('/', utils.common.asyncAwait(async (req, res) => {
  const json = await getResponseObj()
  // serve results
  res.status(200).json(json)
}))

/**
 * Error 405 on remaining routes
 */
router.all('/', utils.common.asyncAwait(async (req, res, next) =>
  next(new HttpError('405 Method Not Allowed', 405))
))

/**
 * [POST] Upload route
 */
router.post('/upload', accepts, utils.common.asyncAwait(async (req, res, next) => {
  if (req.file)
    // check for file content
    if (req.file.size > 0) {
      // get file statistics
      const data = await getStatistics(req.file)
      // create success response object
      const json = utils.objects.cloneWithAdditions(
        getResponseObj(),
        { data }
      )
      // serve results
      return res.status(201).json(json)
    }

  next(new HttpError('400 Bad Request', 400))
}))

/**
 * Error 405 on remaining routes
 */
router.all('/upload', utils.common.asyncAwait(async (req, res, next) =>
  next(new HttpError('405 Method Not Allowed', 405))
))

/**
 * Error 400 on remaining routes
 */
router.use((req, res, next) =>
  next(new HttpError('404 Not Found', 404))
)

export default router
