import { NextFunction, Request, Response } from 'express';
import {validationResult} from "express-validator";
import Contact from '../../models/contact';
import {StatusCodes} from "../../types/statusCodes";

export const postContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, phone, subject, message } = req.body;
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(StatusCodes.invalid).json({status: StatusCodes.invalid, message: req.t("Error.invalidInputs"), errors: errors.array()})
    }
    const contact = new Contact({
      name: name,
      email: email,
      phone: phone,
      subject: subject,
      message: message,
    });
    await contact.save();
    return res
      .status(StatusCodes.created)
      .json({ status: StatusCodes.created, message: req.t('Success.form') });
  } catch (err) {
    next(err);
  }
};
