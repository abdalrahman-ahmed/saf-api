import Webinar from '../../models/webinar';
import { NextFunction, Request, Response } from 'express';
import paginationHandler, {
  ITEMS_PER_PAGE,
} from '../../utils/paginationHandler';

export const getWebinars = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || ITEMS_PER_PAGE;
  const EX_LANGUAGE = req.t('excludeLang');
  try {
    const totalItems = await Webinar.find({
      status: 'active',
    }).countDocuments();
    const pagination = paginationHandler(page, totalItems, limit);
    const webinars = await Webinar.find({ status: 'active' })
      .skip((page - 1) * limit)
      .limit(limit)
      .select({
        title: { [EX_LANGUAGE]: 0 },
        description: { [EX_LANGUAGE]: 0 },
      });
    return res.status(200).json({
      status: 200,
      message: req.t('Success.retrieve'),
      data: webinars,
      pagination: pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const getWebinar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const EX_LANGUAGE = req.t('excludeLang');
  const slug = req.params.webinarSlug;
  try {
    const webinar = await Webinar.findOne({
      slug: slug,
      status: 'active',
    }).select({
      title: { [EX_LANGUAGE]: 0 },
      description: { [EX_LANGUAGE]: 0 },
    });
    if (!webinar) {
      return res
        .status(404)
        .json({ status: 404, message: req.t('Error.notFound') });
    }
    return res
      .status(200)
      .json({ status: 200, message: req.t('Success.retrieve'), data: webinar });
  } catch (error) {
    next(error);
  }
};
