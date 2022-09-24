import { NextFunction, Request, Response } from 'express';
import Branch from '../../models/branch';
import {StatusCodes} from "../../types/statusCodes";

export const getBranches = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const branches = await Branch.find({ status: 'active' })
    return res.status(StatusCodes.success).json({
      status: StatusCodes.success,
      message: req.t('Success.retrieve'),
      data: branches,
    });
  } catch (error) {
    next(error);
  }
};
