/* eslint-disable @typescript-eslint/no-unused-vars */
import { error } from 'console'
import {
  NextFunction,
  Request,
  Response,
} from 'express'

export const notFound = (
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response => res.status(404).json({ message: 'Not Found' })

export const serverError = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (!err.status) {
    error(err.stack)
  }

  res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal Server Error' })
}
