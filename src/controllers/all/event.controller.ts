import { NextFunction, Request, Response } from 'express';
import paginationHandler, {
  ITEMS_PER_PAGE,
} from '../../utils/paginationHandler';
import Event from '../../models/event';

export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || ITEMS_PER_PAGE;
  try {
    const totalItems = await Event.find({
      status: 'active',
    }).countDocuments();
    const pagination = paginationHandler(page, totalItems, limit);
    const events = await Event.find({ status: 'active' })
      .skip((page - 1) * limit)
      .limit(limit)
    return res.status(200).json({
      status: 200,
      message: req.t('Success.retrieve'),
      data: events,
      pagination: pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const getEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const slug = req.params.eventSlug;
  try {
    const event = await Event.findOne({
      slug: slug,
      status: 'active',
    })
    if (!event) {
      return res
        .status(404)
        .json({ status: 404, message: req.t('Error.notFound') });
    }
    return res
      .status(200)
      .json({ status: 200, message: req.t('Success.retrieve'), data: event });
  } catch (error) {
    next(error);
  }
};
