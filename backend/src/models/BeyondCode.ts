import mongoose, { Schema, Document } from 'mongoose';

export interface IBeyondCode extends Document {
  title: string;
  category: string;
  description: string;
  annotation: string;
  image?: string;
  tags: string[];
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const BeyondCodeSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    annotation: { type: String, default: '' },
    image: { type: String, default: '' },
    tags: [{ type: String, trim: true }],
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const BeyondCode = mongoose.model<IBeyondCode>('BeyondCode', BeyondCodeSchema);
