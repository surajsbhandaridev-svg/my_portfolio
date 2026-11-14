import mongoose, { Schema, Document } from 'mongoose';

export interface IEducation extends Document {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  milestones: string[];
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const EducationSchema: Schema = new Schema(
  {
    institution: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    field: { type: String, required: true, trim: true },
    startDate: { type: String, required: true, trim: true },
    endDate: { type: String, required: true, trim: true },
    current: { type: Boolean, default: false },
    description: { type: String, default: '' },
    milestones: [{ type: String, trim: true }],
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Education = mongoose.model<IEducation>('Education', EducationSchema);
