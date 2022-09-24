import { Schema, model } from 'mongoose';

interface Version {
  title: {
    ar: string;
    en: string;
  };
  image: string;
  slug: string;
  status: 'active' | 'inactive';
  order: number;
}

const versionSchema = new Schema<Version>(
  {
    title: {
      ar: {
        type: String,
        required: true,
      },
      en: {
        type: String,
        required: true,
      },
    },
    image: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default model<Version>('Version', versionSchema);
