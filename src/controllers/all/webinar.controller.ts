import Webinar from '../../models/webinar';
import { NextFunction, Request, Response } from 'express';
import paginationHandler, {
  ITEMS_PER_PAGE,
} from '../../utils/paginationHandler';
import {StatusCodes} from "../../types/statusCodes";

export const getWebinars = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || ITEMS_PER_PAGE;
  try {
    const totalItems = await Webinar.find({
      status: 'active',
    }).countDocuments();
    const pagination = paginationHandler(page, totalItems, limit);
    const webinars = await Webinar.find({ status: 'active' })
      .skip((page - 1) * limit)
      .limit(limit)
    return res.status(StatusCodes.success).json({
      status: StatusCodes.success,
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
  const slug = req.params.webinarSlug;
  try {
    const webinar = await Webinar.findOne({
      slug: slug,
      status: 'active',
    })
    if (!webinar) {
      return res
        .status(StatusCodes.notFound)
        .json({ status: StatusCodes.notFound, message: req.t('Error.notFound') });
    }
    return res
      .status(StatusCodes.success)
      .json({ status: StatusCodes.success, message: req.t('Success.retrieve'), data: webinar });
  } catch (error) {
    next(error);
  }
};
