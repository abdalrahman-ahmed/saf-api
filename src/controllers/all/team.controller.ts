import Team from '../../models/team';
import {SortOrder} from 'mongoose'
import { NextFunction, Request, Response } from 'express';
import {StatusCodes} from "../../types/statusCodes";

export const getTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const category = req.params.category;
  let sort = req.query.sort as unknown as SortOrder;
  const isSort = (value: any): value is SortOrder => {
    return ['asc', 'desc', 'ascending', 'descending', 1 , -1].includes(value)
  }
  if (!isSort(sort)) {
    sort = 'asc'
  }
  try {
    const team = await Team.find({ status: 'active', category: category }).sort({
      order: sort,
    });
    return res.status(StatusCodes.success).json({
      status: StatusCodes.success,
      message: req.t('Success.retrieve'),
      data: team,
    });
  } catch (error) {
    next(error);
  }
};
