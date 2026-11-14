import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { Project } from '../models/Project';
import { Skill } from '../models/Skill';
import { Education } from '../models/Education';
import { Message } from '../models/Message';
import { SiteSettings } from '../models/SiteSettings';
import { JourneyContent } from '../models/JourneyContent';
import { BeyondCode } from '../models/BeyondCode';
import { Admin } from '../models/Admin';
import { inMemoryStore } from '../services/dataService';

export const seedDatabaseIfEmpty = async (): Promise<void> => {
  if (mongoose.connection.readyState !== 1) {
    return;
  }

  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      console.log('🌱 Seeding initial admin and portfolio records into MongoDB...');
      const salt = await bcrypt.genSalt(10);
      const password = process.env.ADMIN_PASSWORD || 'Admin@Sketchbook2026!';
      const passwordHash = await bcrypt.hash(password, salt);

      await Admin.create({
        email: (process.env.ADMIN_EMAIL || 'admin@surajsinghbhandari.dev').toLowerCase(),
        passwordHash,
        role: 'admin',
        name: 'Suraj Singh Bhandari',
      });
      console.log(`✅ Admin account seeded: ${process.env.ADMIN_EMAIL || 'admin@surajsinghbhandari.dev'}`);
    }

    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      const cleanProjects = inMemoryStore.projects.map(({ _id, ...rest }) => rest);
      await Project.insertMany(cleanProjects);
      console.log(`✅ Seeded ${cleanProjects.length} projects`);
    }

    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      const cleanSkills = inMemoryStore.skills.map(({ _id, ...rest }) => rest);
      await Skill.insertMany(cleanSkills);
      console.log(`✅ Seeded ${cleanSkills.length} skills`);
    }

    const educationCount = await Education.countDocuments();
    if (educationCount === 0) {
      const cleanEdu = inMemoryStore.education.map(({ _id, ...rest }) => rest);
      await Education.insertMany(cleanEdu);
      console.log(`✅ Seeded ${cleanEdu.length} education records`);
    }

    const settingsCount = await SiteSettings.countDocuments();
    if (settingsCount === 0) {
      const { _id, ...cleanSettings } = inMemoryStore.siteSettings;
      await SiteSettings.create(cleanSettings);
      console.log('✅ Seeded site settings');
    }

    const journeyCount = await JourneyContent.countDocuments();
    if (journeyCount === 0) {
      const { _id, ...cleanJourney } = inMemoryStore.journeyContent;
      await JourneyContent.create(cleanJourney);
      console.log('✅ Seeded journey content');
    }

    const beyondCount = await BeyondCode.countDocuments();
    if (beyondCount === 0) {
      const cleanBeyond = inMemoryStore.beyondCode.map(({ _id, ...rest }) => rest);
      await BeyondCode.insertMany(cleanBeyond);
      console.log(`✅ Seeded ${cleanBeyond.length} beyond code items`);
    }
  } catch (error) {
    console.error('Error during auto-seeding:', error);
  }
};

// Standalone execution
if (require.main === module) {
  const mongoURI = process.env.DATABASE_URL || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/suraj_portfolio';
  mongoose
    .connect(mongoURI)
    .then(async () => {
      console.log('Connected to MongoDB. Running seed script...');
      await seedDatabaseIfEmpty();
      console.log('Seeding completed. Exiting.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('MongoDB connection failed:', err);
      process.exit(1);
    });
}
