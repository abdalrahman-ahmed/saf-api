import { NextFunction, Request, Response } from 'express';
import Contact from '../../models/contact';

export const postContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, phone, subject, message } = req.body;
  try {
    const contact = new Contact({
      name: name,
      email: email,
      phone: phone,
      subject: subject,
      message: message,
    });
    await contact.save();
    return res
      .status(201)
      .json({ status: 201, message: req.t('Success.form') });
  } catch (err) {
    next(err);
  }
};
