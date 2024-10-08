import { Response } from 'express'
import { AppError } from '../types/errors'

const handleHttpError = (res: Response, error: AppError, customMessage?: string) => {
  console.log(error)
  res.status(error.status).json({
    message: customMessage || error.message,
  })
}

export default handleHttpError
