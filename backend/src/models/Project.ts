import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: string;
  status: 'completed' | 'ongoing' | 'experimental';
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String, required: true },
    longDescription: { type: String, default: '' },
    technologies: [{ type: String, trim: true }],
    category: { type: String, default: 'fullstack', trim: true },
    status: {
      type: String,
      enum: ['completed', 'ongoing', 'experimental'],
      default: 'completed',
    },
    image: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>('Project', ProjectSchema);
