import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteSettings extends Document {
  name: string;
  tagline: string;
  subtitle: string;
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  resumeUrl: string;
  statusText: string;
  quickFacts: string[];
  updatedAt: Date;
}

const SiteSettingsSchema: Schema = new Schema(
  {
    name: { type: String, default: 'Suraj Singh Bhandari' },
    tagline: { type: String, default: 'Building. Breaking. Learning. Engineering.' },
    subtitle: {
      type: String,
      default: 'B.Tech CSE Student · Aspiring Software Engineer · Full-Stack Developer',
    },
    email: { type: String, default: 'bhandarisuraj382@gmail.com' },
    github: { type: String, default: 'https://github.com/surajsbhandaridev-svg' },
    linkedin: { type: String, default: 'https://linkedin.com' },
    twitter: { type: String, default: '' },
    resumeUrl: { type: String, default: '/resume.pdf' },
    statusText: { type: String, default: 'SYSTEM ONLINE // SCROLL TO EXPLORE' },
    quickFacts: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export const SiteSettings = mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
