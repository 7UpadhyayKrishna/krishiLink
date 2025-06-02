import mongoose from 'mongoose';

export interface IStock {
  name: string;
  price: number;
  stock: number;
  category: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const stockSchema = new mongoose.Schema<IStock>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Paan', 'Tobacco', 'Additives', 'Other']
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

export const Stock = mongoose.model<IStock>('Stock', stockSchema);
export default Stock; 