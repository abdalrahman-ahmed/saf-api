import { NextFunction, Request, Response } from 'express';
import paginationHandler, {
  ITEMS_PER_PAGE,
} from '../../utils/paginationHandler';
import News from '../../models/news';
import {StatusCodes} from "../../types/statusCodes";

export const getAllNews = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || ITEMS_PER_PAGE;
  const tags = req.query.tags || undefined;
  const filter: any = { status: 'active' };
  if (tags) {
    filter.tags = tags;
  }
  try {
    const totalItems = await News.find(filter).countDocuments();
    const pagination = paginationHandler(page, totalItems, limit);
    const allNews = await News.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
    return res.status(StatusCodes.success).json({
      status: StatusCodes.success,
      message: req.t('Success.retrieve'),
      data: allNews,
      pagination: pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const getNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.newsSlug;
    const news = await News.findOne({
      status: 'active',
      slug: slug
    })
    if(!news) {
      return res.status(StatusCodes.notFound).json({ status: StatusCodes.notFound, message: req.t('Error.notFound') });
    }
    return res.status(StatusCodes.success).json({ status: StatusCodes.success, message: req.t('Success.retrieve'), data: news });
  }
  catch (error) {
    next(error)
  }
}