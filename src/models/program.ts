import { Schema, model, Types } from 'mongoose';

export enum Category {
  awarness = 'awarness',
  educational = 'educational',
  health = 'health',
  guarantees = 'guarantees',
  qualifying = 'qualifying',
  skill = 'skill',
  service = 'service',
  residential = 'residential',
  societal = 'societal',
  uncategorized = 'uncategorized',
}

interface Program {
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
  image: string;
  status: 'active' | 'inactive';
  amountNeeded?: number;
  amountReceived?: number;
  completed?: boolean;
  hasSms: boolean;
  toSms?: string;
  order: number;
  isProgram: boolean;
  hasShares: boolean;
  sharesValue?: number;
  category: Category;
  sponsor?: Types.ObjectId;
}

const programsSchema = new Schema<Program>(
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
        required: true,
      },
      ar: {
        type: String,
        required: true,
      },
    },
    slug: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
    },
    amountNeeded: {
      type: Number,
      default: 0,
    },
    amountReceived: {
      type: Number,
      default: 0,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    hasSms: {
      type: Boolean,
      default: false,
    },
    toSms: {
      type: String,
      required: function (this: Program) {
        return this.hasSms;
      },
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    isProgram: {
      type: Boolean,
      default: true,
    },
    hasShares: {
      type: Boolean,
      default: false,
    },
    sharesValue: {
      type: Number,
      required: function (this: Program) {
        return this.hasShares;
      },
    },
    category: {
      type: String,
      enum: [
        'awarness',
        'educational',
        'health',
        'guarantees',
        'qualifying',
        'skill',
        'service',
        'residential',
        'societal',
        'uncategorized',
      ],
      required: true,
    },
    sponsor: {
      type: Schema.Types.ObjectId,
      ref: 'Sponsor',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

programsSchema.methods.updateAmount = function (amount: string) {
  this.amountReceived = this.amountReceived + parseInt(amount);
  if (this.amountReceived >= this.amountNeeded) {
    this.completed = true;
  }
  return this.save();
};

export default model<Program>('Program', programsSchema);
