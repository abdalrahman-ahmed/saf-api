import {NextFunction, Request, Response} from "express";

import Version from "../../models/version";
import Publication from "../../models/publication";
import paginationHandler, {ITEMS_PER_PAGE} from "../../utils/paginationHandler";
import {StatusCodes} from "../../types/statusCodes";

export const getVersions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const versions = await Version.find({status: 'active'}).sort({order: 'asc'});
        return res.json({status: StatusCodes.success, message: req.t('Success.retrieve'), data: versions})
    } catch (error) {
        next(error)
    }
}

export const getVersion = async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || ITEMS_PER_PAGE
    const {parent} = req.params;
    try {
       const totalItems = await Publication.find({status: 'active', parent: parent}).countDocuments();
       const pagination = paginationHandler(page, totalItems, limit)
        const publications = await Publication.find({status: 'active', parent: parent}).skip((page - 1) * limit).limit(limit)
        return res.status(StatusCodes.success).json({
            status: StatusCodes.success,
            message: req.t('Success.retrieve'),
            data: publications,
            pagination: pagination,
        });
    } catch (error) {
        next(error)
    }
}