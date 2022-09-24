import { Schema, model } from 'mongoose';

interface Video {
  title: {
    ar: string;
    en: string;
  };
  url: string;
  image: string;
  status: 'active' | 'inactive';
  featured: boolean;
  order: number;
}

const videoSchema = new Schema<Video>(
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
    url: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '/image/resources/saf.jpg',
    },
    status: {
      type: String,
      default: 'active',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<Video>('Video', videoSchema);
