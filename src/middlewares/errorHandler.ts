import { NextFunction, Request, Response } from 'express';

export class CustomError {
  constructor(public message: string, public status: number = 501) {}
}

export default (
  error: CustomError | Error,
  req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  let err;
  if (!(error instanceof CustomError)) {
    err = new CustomError(
      'Internal Server Error Occurred 😣. Please Try Again Later!'
    );
  } else {
    err = error;
  }
  console.log(error);
  return res
    .status(err.status)
    .json({ status: err.status, message: err.message });
};
