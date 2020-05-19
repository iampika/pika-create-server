/* eslint-disable no-unused-vars */
import { error } from 'console'

export const notFound = (req, res, next) =>
  res.status(404).json({ message: 'Not Found' })

export const serverError = (err, req, res, next) => {
  if (!err.status) {
    error(err.stack)
  }

  res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal Server Error' })
}
