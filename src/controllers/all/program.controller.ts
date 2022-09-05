import { NextFunction, Request, Response } from 'express';
import paginationHandler, {
  ITEMS_PER_PAGE,
} from '../../utils/paginationHandler';
import Program from '../../models/program';

interface Filter {
  status: 'active' | 'inactive';
  isProgram: boolean;
  category?: string;
  completed?: boolean;
}

export const getPrograms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || ITEMS_PER_PAGE;
  const category = req.query.category || undefined;
  const EX_LANGUAGE = req.t('excludeLang');
  try {
    const filter: Filter = {
      status: 'active',
      isProgram: true,
    };
    if (category) {
      filter.category = category as unknown as string;
    }
    const totalItems = await Program.find(filter).countDocuments();
    const pagination = paginationHandler(page, totalItems, limit);
    const programs = await Program.find(filter)
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
      data: programs,
      pagination: pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const getProgram = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const EX_LANGUAGE = req.t('excludeLang');
    const slug = req.params.programSlug;
    const program = await Program.findOne({
      slug: slug,
      status: 'active',
    }).select({
      title: { [EX_LANGUAGE]: 0 },
      description: { [EX_LANGUAGE]: 0 },
      shortDescription: { [EX_LANGUAGE]: 0 },
    });
    if (!program) {
      return res
        .status(404)
        .json({ status: 404, message: req.t('Error.notFound') });
    }
    return res
      .status(200)
      .json({ status: 200, message: req.t('Success.retrieve'), data: program });
  } catch (error) {
    next(error);
  }
};
