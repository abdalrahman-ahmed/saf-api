import { Schema, model } from 'mongoose';

interface News {
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
  tags: string[];
}

const newsSchema = new Schema<News>(
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
    tags: {
      type: [String],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default model<News>('new', newsSchema);
