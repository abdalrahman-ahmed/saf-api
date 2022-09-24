import { NextFunction, Request, Response } from 'express';
import paginationHandler, {
  ITEMS_PER_PAGE,
} from '../../utils/paginationHandler';
import Event from '../../models/event';
import {StatusCodes} from "../../types/statusCodes";

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
    return res.status(StatusCodes.success).json({
      status: StatusCodes.success,
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
        .status(StatusCodes.notFound)
        .json({ status: StatusCodes.notFound, message: req.t('Error.notFound') });
    }
    return res
      .status(StatusCodes.success)
      .json({ status: StatusCodes.success, message: req.t('Success.retrieve'), data: event });
  } catch (error) {
    next(error);
  }
};
