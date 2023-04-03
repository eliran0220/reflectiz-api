import { Request, Response, NextFunction, RequestHandler } from 'express';

type AsyncReqHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export default function errorWrapper(routingFunc: AsyncReqHandler | RequestHandler):AsyncReqHandler {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await routingFunc(req, res, next);
    } catch (err) {
        console.log("cought at error wrapper")
      next(err);
    }
  };
}