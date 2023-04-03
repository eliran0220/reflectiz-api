import { Request, NextFunction, Response } from 'express';

 class HttpException extends Error {
    constructor(public message: string, public statusCode: number) {
      super(message);
    }
  }
  
  export class ServerException extends HttpException {
    constructor(public message: string, public statusCode: number = 500) {
      super(message, statusCode);
    }
  }

  export class UrlNotFoundException extends HttpException {
    constructor(public message: string, public statusCode: number = 404) {
      super(message, statusCode);
    }
  }


  export function NotFound(req: Request, res: Response, next: NextFunction): void {
    console.log("url not found...")
    next(new UrlNotFoundException(`${req.url} is not an endpoint`, 404));
  }

  export function ErrorResponse(
    err: HttpException,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    const response = {
      status: err.statusCode || 500,
      message: err.message,
      stack: err.stack || 'No trace stack.'
    }
    next();
    res.status(response.status).json(response);
  }


  
  