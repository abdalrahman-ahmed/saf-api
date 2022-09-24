import { Schema, model } from 'mongoose';

interface Team {
  name: {
    ar: string;
    en: string;
  };
  position: {
    ar: string;
    en: string;
  };
  image: string;
  category: string;
  committee: string;
  sector: string;
  status: 'active' | 'inactive';
  order: number;
}

const teamSchema = new Schema<Team>(
  {
    name: {
      ar: {
        type: String,
        required: true,
      },
      en: {
        type: String,
        required: true,
      },
    },
    position: {
      ar: {
        type: String,
      },
      en: {
        type: String,
      },
    },
    image: {
      type: String,
      default: '/image/resources/member.jpg',
    },
    category: {
      type: String,
      required: true,
      enum: ['management', 'committees', 'honor', 'team'],
    },
    committee: {
      type: String,
      enum: [
        'social',
        'scientific',
        'financial',
        'media',
        'audit',
        'governance',
      ],
    },
    sector: {
      type: String,
      enum: [
        'general',
        'financial',
        'services',
        'riyadh',
        'dammam',
        'kharj',
        'dawadmi',
        'abha',
      ],
    },
    status: {
      type: String,
      default: 'active',
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

export default model<Team>('team', teamSchema);
