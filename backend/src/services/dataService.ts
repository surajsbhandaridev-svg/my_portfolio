import mongoose from 'mongoose';
import { Project, IProject } from '../models/Project';
import { Skill, ISkill } from '../models/Skill';
import { Education, IEducation } from '../models/Education';
import { Message, IMessage } from '../models/Message';
import { SiteSettings, ISiteSettings } from '../models/SiteSettings';
import { JourneyContent, IJourneyContent } from '../models/JourneyContent';
import { BeyondCode, IBeyondCode } from '../models/BeyondCode';
import { Admin, IAdmin } from '../models/Admin';
import bcrypt from 'bcryptjs';

import fs from 'fs';
import path from 'path';

export const isDbConnected = (): boolean => {
  return mongoose.connection.readyState === 1;
};

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

// Persistent JSON File Store (Zero-config embedded DB fallback)
class InMemoryStore {
  projects: any[] = [];
  skills: any[] = [];
  education: any[] = [];
  messages: any[] = [];
  siteSettings: any = null;
  journeyContent: any = null;
  beyondCode: any[] = [];
  admins: any[] = [];

  constructor() {
    this.init();
  }

  init() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        this.projects = parsed.projects || [];
        this.skills = parsed.skills || [];
        this.education = parsed.education || [];
        this.messages = parsed.messages || [];
        this.siteSettings = parsed.siteSettings || null;
        this.journeyContent = parsed.journeyContent || null;
        this.beyondCode = parsed.beyondCode || [];
        this.admins = parsed.admins || [];
        console.log('📦 Loaded existing portfolio database from data/store.json');
        this.syncEnvAdmin();
        return;
      }
    } catch (err) {
      console.warn('Could not read existing store.json, re-seeding...', err);
    }

    this.seedInitial();
    this.saveToFile();
  }

  syncEnvAdmin() {
    try {
      const email = (process.env.ADMIN_EMAIL || 'admin@surajsinghbhandari.dev').trim().toLowerCase();
      const password = process.env.ADMIN_PASSWORD || 'Admin@Sketchbook2026!';
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password, salt);

      const existingIndex = this.admins.findIndex(
        (a) => a.email === email || a.role === 'admin'
      );

      if (existingIndex >= 0) {
        this.admins[existingIndex].email = email;
        this.admins[existingIndex].passwordHash = passwordHash;
        this.admins[existingIndex].updatedAt = new Date();
      } else {
        this.admins.push({
          _id: 'admin_1',
          email,
          passwordHash,
          role: 'admin',
          name: 'Suraj Singh Bhandari',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      this.saveToFile();
      console.log(`🔐 Admin credentials synchronized with environment variables: ${email}`);
    } catch (e) {
      console.error('Error synchronizing admin credentials:', e);
    }
  }

  saveToFile() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const dataToSave = {
        projects: this.projects,
        skills: this.skills,
        education: this.education,
        messages: this.messages,
        siteSettings: this.siteSettings,
        journeyContent: this.journeyContent,
        beyondCode: this.beyondCode,
        admins: this.admins,
      };
      fs.writeFileSync(DATA_FILE, JSON.stringify(dataToSave, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to save data/store.json:', err);
    }
  }

  seedInitial() {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'Admin@Sketchbook2026!', salt);

    this.admins = [
      {
        _id: 'admin_1',
        email: (process.env.ADMIN_EMAIL || 'admin@surajsinghbhandari.dev').toLowerCase(),
        passwordHash,
        role: 'admin',
        name: 'Suraj Singh Bhandari',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    this.projects = [
      {
        _id: 'proj_1',
        title: 'DostLeague',
        slug: 'dostleague',
        description: 'Real-time multiplayer trivia and party game platform featuring 11 interactive modes, live leaderboards, and room-based WebSocket gameplay.',
        longDescription: 'DostLeague is a full-featured real-time multiplayer trivia and party battle game platform. Built with TypeScript, React, and Node.js with Socket.IO, it features 11 game modes including Math Rush, Odd One Out, Word Scramble, Memory Battle, and Caption Battle. Supports anonymous guest play, instant challenge links, daily tournaments (Daily Dangal), category-wise leaderboards, and persistent state across connections.',
        technologies: ['TypeScript', 'React', 'Node.js', 'Express', 'Socket.IO', 'PostgreSQL', 'Tailwind CSS'],
        category: 'fullstack',
        status: 'completed',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
        githubUrl: 'https://github.com/surajsbhandaridev-svg/dostleague',
        liveUrl: 'https://dostleague.onrender.com',
        featured: true,
        sortOrder: 1,
        createdAt: new Date('2026-11-04'),
        updatedAt: new Date('2026-11-04'),
      },
      {
        _id: 'proj_2',
        title: 'VulnGuard AI',
        slug: 'vulnguard-ai',
        description: 'AI-assisted code security analysis and vulnerability scanning platform with AST parsing and automated security rule evaluation.',
        longDescription: 'An automated security engine designed to parse source code, detect critical vulnerability patterns (SQL injections, XSS, insecure deserialization, weak cryptographic primitives), and provide AI-generated remediation diffs. Incorporates Dockerized sandboxes for isolated analysis.',
        technologies: ['TypeScript', 'Python', 'React', 'Docker', 'AST Parser', 'Node.js'],
        category: 'ai',
        status: 'completed',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
        githubUrl: 'https://github.com/surajsbhandaridev-svg/vulnguard-ai',
        liveUrl: '',
        featured: true,
        sortOrder: 2,
        createdAt: new Date('2026-11-03'),
        updatedAt: new Date('2026-11-03'),
      },
      {
        _id: 'proj_3',
        title: 'GeoTag-Pro',
        slug: 'geotag-pro',
        description: 'Geographical metadata tagging, geospatial tracking, and interactive mapping interface for location-aware applications.',
        longDescription: 'High-precision geospatial utility for tagging metadata to geographic coordinates, parsing EXIF geolocation data from media, and visual plotting with interactive cluster mapping.',
        technologies: ['TypeScript', 'React', 'Leaflet', 'GeoJSON', 'Node.js', 'Express'],
        category: 'tools',
        status: 'completed',
        image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
        githubUrl: 'https://github.com/surajsbhandaridev-svg',
        liveUrl: '',
        featured: true,
        sortOrder: 3,
        createdAt: new Date('2026-10-25'),
        updatedAt: new Date('2026-10-25'),
      },
      {
        _id: 'proj_4',
        title: 'TaskFlow',
        slug: 'taskflow',
        description: 'Clean, responsive productivity and agile task management dashboard with drag-and-drop workflow kanban boards.',
        longDescription: 'Engineered for developers and engineering teams to track sprint backlogs, task assignments, and progress analytics with real-time updates and priority sorting.',
        technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS'],
        category: 'fullstack',
        status: 'completed',
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80',
        githubUrl: 'https://github.com/surajsbhandaridev-svg',
        liveUrl: '',
        featured: false,
        sortOrder: 4,
        createdAt: new Date('2026-10-15'),
        updatedAt: new Date('2026-10-15'),
      },
      {
        _id: 'proj_5',
        title: 'OceanTrace',
        slug: 'oceantrace',
        description: 'Environmental ocean data tracker and numerical simulation utility for tracking oceanographic metrics.',
        longDescription: 'Developed using Python to process marine sensory datasets, visualize salinity and thermal gradient shifts, and export clean analytical metrics for scientific research.',
        technologies: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Data Analytics'],
        category: 'systems',
        status: 'completed',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        githubUrl: 'https://github.com/surajsbhandaridev-svg/Oceantrace',
        liveUrl: '',
        featured: false,
        sortOrder: 5,
        createdAt: new Date('2026-10-18'),
        updatedAt: new Date('2026-10-18'),
      },
      {
        _id: 'proj_6',
        title: 'Private Chat',
        slug: 'private-chat',
        description: 'Lightweight, end-to-end peer-to-peer real-time messaging application with encrypted socket tunnels.',
        longDescription: 'Minimalist encrypted communication tool built with modern web technologies, providing private ephemeral chat rooms without server-side message persistence.',
        technologies: ['TypeScript', 'WebSockets', 'React', 'Node.js', 'Cryptography'],
        category: 'backend',
        status: 'completed',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        githubUrl: 'https://github.com/surajsbhandaridev-svg/private-chat',
        liveUrl: '',
        featured: false,
        sortOrder: 6,
        createdAt: new Date('2026-08-12'),
        updatedAt: new Date('2026-08-12'),
      },
    ];

    this.skills = [
      // Programming Languages
      { _id: 'sk_1', name: 'C++', category: 'languages', status: 'proficient', sortOrder: 1 },
      { _id: 'sk_2', name: 'TypeScript', category: 'languages', status: 'proficient', sortOrder: 2 },
      { _id: 'sk_3', name: 'JavaScript (ES6+)', category: 'languages', status: 'proficient', sortOrder: 3 },
      { _id: 'sk_4', name: 'Python', category: 'languages', status: 'proficient', sortOrder: 4 },
      { _id: 'sk_5', name: 'Go', category: 'languages', status: 'exploring', sortOrder: 5 },
      { _id: 'sk_6', name: 'Rust', category: 'languages', status: 'learning', sortOrder: 6 },

      // Frontend Development
      { _id: 'sk_7', name: 'React.js', category: 'frontend', status: 'proficient', sortOrder: 1 },
      { _id: 'sk_8', name: 'Tailwind CSS', category: 'frontend', status: 'proficient', sortOrder: 2 },
      { _id: 'sk_9', name: 'HTML5 & Semantic CSS', category: 'frontend', status: 'proficient', sortOrder: 3 },
      { _id: 'sk_10', name: 'Three.js / WebGL', category: 'frontend', status: 'learning', sortOrder: 4 },
      { _id: 'sk_11', name: 'Next.js', category: 'frontend', status: 'learning', sortOrder: 5 },

      // Backend Development
      { _id: 'sk_12', name: 'Node.js & Express', category: 'backend', status: 'proficient', sortOrder: 1 },
      { _id: 'sk_13', name: 'RESTful API Architecture', category: 'backend', status: 'proficient', sortOrder: 2 },
      { _id: 'sk_14', name: 'WebSockets & Socket.IO', category: 'backend', status: 'proficient', sortOrder: 3 },
      { _id: 'sk_15', name: 'JWT & Session Security', category: 'backend', status: 'proficient', sortOrder: 4 },
      { _id: 'sk_16', name: 'Microservices & Queues', category: 'backend', status: 'exploring', sortOrder: 5 },

      // Databases
      { _id: 'sk_17', name: 'MongoDB & Mongoose', category: 'databases', status: 'proficient', sortOrder: 1 },
      { _id: 'sk_18', name: 'PostgreSQL & Supabase', category: 'databases', status: 'proficient', sortOrder: 2 },
      { _id: 'sk_19', name: 'Redis Caching', category: 'databases', status: 'learning', sortOrder: 3 },

      // Developer Tools
      { _id: 'sk_20', name: 'Git & GitHub Workflows', category: 'tools', status: 'proficient', sortOrder: 1 },
      { _id: 'sk_21', name: 'Docker & Containerization', category: 'tools', status: 'learning', sortOrder: 2 },
      { _id: 'sk_22', name: 'Postman & API Testing', category: 'tools', status: 'proficient', sortOrder: 3 },
      { _id: 'sk_23', name: 'Linux / Bash Environment', category: 'tools', status: 'proficient', sortOrder: 4 },
      { _id: 'sk_24', name: 'CI/CD & Render / Vercel', category: 'tools', status: 'proficient', sortOrder: 5 },

      // Core Computer Science
      { _id: 'sk_25', name: 'Data Structures & Algorithms', category: 'core_cs', status: 'proficient', sortOrder: 1 },
      { _id: 'sk_26', name: 'Object-Oriented Programming (OOP)', category: 'core_cs', status: 'proficient', sortOrder: 2 },
      { _id: 'sk_27', name: 'Operating Systems & Concurrency', category: 'core_cs', status: 'learning', sortOrder: 3 },
      { _id: 'sk_28', name: 'Computer Networks & Protocols', category: 'core_cs', status: 'learning', sortOrder: 4 },
      { _id: 'sk_29', name: 'Database Management Systems (DBMS)', category: 'core_cs', status: 'proficient', sortOrder: 5 },
    ];

    this.education = [
      {
        _id: 'edu_1',
        institution: 'Graphic Era Hill University (GEHU)',
        degree: 'Bachelor of Technology (B.Tech)',
        field: 'Computer Science & Engineering',
        startDate: '2024',
        endDate: '2028 (Expected)',
        current: true,
        description: 'Pursuing foundational and advanced computer science coursework including Algorithms, Computer Organization, Database Systems, Web Technologies, and Software Engineering.',
        milestones: [
          'Core coursework: Data Structures, OOP, Discrete Math, Database Systems',
          'Active participant in algorithmic programming competitions and hackathons',
          'Building real-world software and open-source developer tooling alongside academic curriculum',
        ],
        sortOrder: 1,
      },
      {
        _id: 'edu_2',
        institution: 'Senior Secondary Education',
        degree: 'Higher Secondary Certificate (PCM)',
        field: 'Physics, Chemistry, Mathematics & Computer Science',
        startDate: '2022',
        endDate: '2024',
        current: false,
        description: 'Completed higher secondary education with a strong emphasis on analytical problem-solving, advanced mathematics, and foundational computer science.',
        milestones: [
          'Built early desktop utilities and algorithmic scripts',
          'Developed keen interest in competitive programming and system architectures',
        ],
        sortOrder: 2,
      },
    ];

    this.siteSettings = {
      _id: 'settings_1',
      name: 'Suraj Singh Bhandari',
      tagline: 'Building. Breaking. Learning. Engineering.',
      subtitle: 'B.Tech CSE Student · Aspiring Software Engineer · Full-Stack Developer',
      email: 'bhandarisuraj382@gmail.com',
      github: 'https://github.com/surajsbhandaridev-svg',
      linkedin: 'https://linkedin.com',
      twitter: '',
      resumeUrl: '/resume.pdf',
      statusText: 'SYSTEM ONLINE // SCROLL TO EXPLORE',
      quickFacts: [
        'B.Tech CSE Student @ GEHU',
        'DSA Enthusiast',
        'Full-Stack Developer',
        'Project Builder',
      ],
      updatedAt: new Date(),
    };

    this.journeyContent = {
      _id: 'journey_1',
      introduction: "I'm a Computer Science Engineering student passionate about software development, problem-solving, and building useful digital products. I enjoy exploring technologies, learning by building, and turning ideas into working solutions.",
      story: "My developer journey started with a deep fascination with how complex systems function behind the screen. Rather than just learning syntax, I've always preferred building practical applications from scratch. From real-time multiplayer servers in DostLeague to automated vulnerability scanners, every challenge has shaped my technical foundation.",
      howIStarted: "I wrote my first lines of code understanding loops, pointers, and memory mechanics in C++. That early experience with low-level thinking sparked an obsession with clean code, runtime efficiency, and algorithm design. Soon after, I began architecting full-stack web applications using Node.js and TypeScript.",
      problemSolvingApproach: "When facing a complex problem, I deconstruct it into small, independent sub-systems. I focus first on data modeling and interface boundaries before writing implementation code. Writing testable, predictable logic and profiling performance bottlenecks are central to my workflow.",
      currentLearning: "Currently deepening my understanding of Advanced Graph Algorithms, Dynamic Programming, Distributed System primitives, Database indexing strategies, and microservice communication patterns.",
      futureGoals: "My objective is to grow into an impactful systems software engineer, contribute meaningfully to high-performance open-source projects, and architect resilient software that solves real user challenges at scale.",
      updatedAt: new Date(),
    };

    this.beyondCode = [
      {
        _id: 'bc_1',
        title: 'Algorithmic Problem Solving & LeetCode',
        category: 'DSA & Logic',
        description: 'Spending time daily breaking down algorithmic puzzles, practicing tree/graph traversals, and optimizing time complexity.',
        annotation: 'Solving puzzles keeps the engineering blade sharp.',
        image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=800&q=80',
        tags: ['Algorithms', 'Logic', 'DSA', 'Optimization'],
        sortOrder: 1,
      },
      {
        _id: 'bc_2',
        title: 'Hardware & Microprocessor Curiosity',
        category: 'Hardware & Tech',
        description: 'Fascinated by processor architecture, instruction sets, CPU cache hierarchy, and how silicon translates code into physical computation.',
        annotation: 'Software is fast only when it respects the silicon underneath.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
        tags: ['Silicon', 'Microprocessors', 'Architecture', 'Circuits'],
        sortOrder: 2,
      },
      {
        _id: 'bc_3',
        title: 'Minimalist Engineering Desk Setup',
        category: 'Workspace',
        description: 'Curating a clean, distraction-free mechanical keyboard and dual-monitor workstation designed for deep flow states.',
        annotation: 'A calm space leads to clean, structured code.',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
        tags: ['Focus', 'Productivity', 'Setup', 'Flow'],
        sortOrder: 3,
      },
      {
        _id: 'bc_4',
        title: 'Open Source Reading & Technical Books',
        category: 'Continuous Learning',
        description: 'Reading production codebases, architecture RFCs, and literature on operating systems and distributed consensus.',
        annotation: 'Read more code than you write.',
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
        tags: ['Books', 'Open Source', 'Architecture', 'Growth'],
        sortOrder: 4,
      },
    ];

    this.messages = [
      {
        _id: 'msg_1',
        name: 'Technical Recruiter',
        email: 'recruiter@techventures.io',
        subject: 'Software Engineer Internship Inquiry',
        message: 'Hi Suraj, I came across your DostLeague and VulnGuard AI projects on GitHub. Impressive full-stack and systems work! We would love to discuss upcoming internship opportunities.',
        isRead: false,
        createdAt: new Date(Date.now() - 3600000 * 4),
      },
    ];
  }
}

export const inMemoryStore = new InMemoryStore();
