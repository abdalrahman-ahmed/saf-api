import jwt from 'jsonwebtoken';
import { NextFunction, Request } from 'express';
import { CustomError } from './errorHandler';
import config from '../config';

export default (req: Request, _res: Response, next: NextFunction) => {
  try {
    const auth = req.get('Authorization');
    const bearer = auth?.split(' ')[0].toLowerCase();
    const token = auth?.split(' ')[1];
    if (token && bearer === 'bearer') {
      const verify = jwt.verify(
        token,
        config.tokenSecretKey as unknown as string
      );
      if (verify) {
        next();
      } else {
        throw new CustomError('UnAuthorized', 401);
      }
    } else {
      throw new CustomError('UnAuthorized', 401);
    }
  } catch (err) {
    next(err);
  }
};
