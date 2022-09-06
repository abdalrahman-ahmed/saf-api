import { NextFunction, Request, Response } from 'express';
import paginationHandler, {
  ITEMS_PER_PAGE,
} from '../../utils/paginationHandler';
import News from '../../models/news';

export const getAllNews = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || ITEMS_PER_PAGE;
  const tags = req.query.tags || undefined;
  const EX_LANGUAGE = req.t('excludeLang');
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
      .select({
        title: { [EX_LANGUAGE]: 0 },
        description: { [EX_LANGUAGE]: 0 },
        shortDescription: { [EX_LANGUAGE]: 0 },
      });
    return res.status(200).json({
      status: 200,
      message: req.t('Success.retrieve'),
      data: allNews,
      pagination: pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const getNews = async (req: Request, res: Response, next: NextFunction) => {
  const EX_LANGUAGE = req.t('excludeLang');
  try {
    const slug = req.params.newsSlug;
    const news = await News.findOne({
      status: 'active',
      slug: slug
    }).select({
      title: { [EX_LANGUAGE]: 0 },
      description: { [EX_LANGUAGE]: 0 },
      shortDescription: { [EX_LANGUAGE]: 0 },
    });
    if(!news) {
      return res.status(404).json({ status: 404, message: req.t('Error.notFound') });
    }
    return res.status(200).json({ status: 200, message: req.t('Success.retrieve'), data: news });
  }
  catch (error) {
    next(error)
  }
}