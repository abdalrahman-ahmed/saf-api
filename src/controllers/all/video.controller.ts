import {NextFunction, Request, Response} from "express";

import Video from '../../models/video'
import {StatusCodes} from "../../types/statusCodes";

export const getVideos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const videos = await Video.find({status: 'active'}).sort({order: 'asc'})
        return res.json({status: StatusCodes.success, message: req.t('Success.retrieve'), data: videos})
    } catch (error) {
        next(error)
    }
}

export const getFeatured = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const videos = await Video.find({status: 'active', featured: true}).sort({order: 'asc'})
        return res.json({status: StatusCodes.success,message: req.t('Success.retrieve'), data: videos})
    } catch (error) {
        next(error)
    }
}