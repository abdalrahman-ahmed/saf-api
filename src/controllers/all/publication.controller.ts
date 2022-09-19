import { NextFunction, Request, Response } from 'express';
import Publication from '../../models/publication';
import paginationHandler, {
  ITEMS_PER_PAGE,
} from '../../utils/paginationHandler';


export const getPublication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || ITEMS_PER_PAGE;
  const category = req.query.category;
  const filter: any = {
      status: 'active'
  };
  category && (filter.parent = category)
  try {
    const totalItems = await Publication.find(filter).countDocuments();
    const pagination = paginationHandler(page, totalItems, limit);
    const publications = await Publication.find(filter)
        .skip(limit * (page - 1)).limit(limit)
    return res.status(200).json({
      status: 200,
      message: req.t('Success.retrieve'),
      data: publications,
      pagination: pagination,
    });
  } catch (error) {
    next(error);
  }
};
