import { Request, Response, NextFunction } from 'express'
import { AnyZodObject, ZodError } from 'zod'

export const validate =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse(req.body)
      console.log({ 'in controller': result })
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        res
          .status(400)
          .send(error.issues.map((issue) => ({ message: issue.message, path: issue.path })))
        return
      }
      res.status(500).json(error)
    }
  }
