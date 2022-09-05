import { Schema, model } from 'mongoose';

interface Webinar {
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  slug: string;
  date: string;
  time: string;
  status: 'active' | 'inactive';
  image: string;
  url: string;
}

const webinarsSchema = new Schema<Webinar>(
  {
    title: {
      en: {
        type: String,
        required: true,
      },
      ar: {
        type: String,
        required: true,
      },
    },
    description: {
      en: {
        type: String,
      },
      ar: {
        type: String,
      },
    },
    slug: {
      type: String,
      required: true,
    },
    date: String,
    time: String,
    status: {
      type: String,
      default: 'active',
    },
    image: {
      type: String,
      required: true,
      default: '/image/webinars/default.jpg',
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('webinar', webinarsSchema);
