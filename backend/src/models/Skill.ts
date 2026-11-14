import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'databases' | 'tools' | 'core_cs';
  status: 'proficient' | 'learning' | 'exploring';
  icon?: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['languages', 'frontend', 'backend', 'databases', 'tools', 'core_cs'],
    },
    status: {
      type: String,
      required: true,
      enum: ['proficient', 'learning', 'exploring'],
      default: 'proficient',
    },
    icon: { type: String, default: '' },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Skill = mongoose.model<ISkill>('Skill', SkillSchema);
