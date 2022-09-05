import { Schema, model } from 'mongoose';

interface Event {
  title: {
    en: string;
    ar: string;
  };
  shortDescription: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  slug: string;
  status: 'active' | 'inactive';
  image: string;
  date: string;
  time: string;
  location: string;
}

const eventsSchema = new Schema<Event>(
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
    shortDescription: {
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
    status: {
      type: String,
      default: 'active',
    },
    image: {
      type: String,
      required: true,
    },
    date: { type: String, default: null },
    time: { type: String, default: null },
    location: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model<Event>('event', eventsSchema);
