import { Schema, model } from 'mongoose';

interface Sponsor {
  name: {
    en: string;
    ar: string;
  };
  url: string;
  image: string;
  type: 'official' | 'gold' | 'platinum' | 'silver' | 'bronze';
  status: 'active' | 'inactive';
}

const sponsorSchema = new Schema<Sponsor>(
  {
    name: {
      en: {
        type: String,
        required: true,
      },
      ar: {
        type: String,
        required: true,
      },
    },
    url: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['official', 'gold', 'platinum', 'silver', 'bronze'],
    },
    status: {
      type: String,
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

export default model<Sponsor>('Sponsor', sponsorSchema);
