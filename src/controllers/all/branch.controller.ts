import { NextFunction, Request, Response } from 'express';
import Branch from '../../models/branch';

export const getBranches = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const branches = await Branch.find({ status: 'active' })
    return res.status(200).json({
      status: 200,
      message: req.t('Success.retrieve'),
      data: branches,
    });
  } catch (error) {
    next(error);
  }
};
