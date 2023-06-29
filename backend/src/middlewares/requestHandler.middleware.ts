import { NextFunction, Request, Response } from "express"
import { HttpException } from "../exceptions/httpException"

export const requestHandler = (func: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next)
      if (!res.headersSent) {
        console.warn("Sending default 200")
        res.status(200).send()
      }
    } catch (error) {
      if (!res.headersSent) {
        const msg = error.message || "Internal Server Error"
        const statusCode = error instanceof HttpException ? error.status : 500
        res.status(statusCode).json({ message: msg })
      }
    }
  }
}
