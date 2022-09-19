import Team from '../../models/team';
import {SortOrder} from 'mongoose'
import { NextFunction, Request, Response } from 'express';

export const getTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const  category = req.params.category;
  const sort: SortOrder = (req.query.sort as unknown as SortOrder) || "asc"
  try {
    const team = await Team.find({ status: 'active', category: category }).sort({
      order: sort,
    });
    return res.status(200).json({
      status: 200,
      message: req.t('Success.retrieve'),
      data: team,
    });
  } catch (error) {
    next(error);
  }
};
