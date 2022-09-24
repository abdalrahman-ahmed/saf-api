import { Schema, model } from 'mongoose';

interface Contact {
  name: string;
  email: string;
  subject: string;
  phone: string;
  message: string;
}

const contactFormSchema = new Schema<Contact>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      required: true,
      type: String,
    },
    subject: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<Contact>('ContactForm', contactFormSchema);
