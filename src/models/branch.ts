import { Schema, model } from 'mongoose';

interface Branch {
  name: {
    ar: string;
    en: string;
  };
  address: {
    ar: string;
    en: string;
  };
  email: string;
  phone: number;
  bank: string;
  location: {
    lat: string;
    lng: string;
  };
  image: string;
  status: 'active' | 'inactive';
  order: number;
}

const branchSchema = new Schema<Branch>(
  {
    name: {
      ar: String,
      en: String,
    },
    address: {
      ar: String,
      en: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    bank: {
      type: String,
    },
    location: {
      lat: String,
      lng: String,
    },
    image: {
      type: String,
      default: '/image/thumbs/branchMap.jpg',
      required: true,
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

export default model<Branch>('Branch', branchSchema);
