# Suraj Singh Bhandari — Developer's Sketchbook & Engineering Journal

> *"Building. Breaking. Learning. Engineering."*  
> **B.Tech CSE Student · Aspiring Software Engineer · Full-Stack Developer**  
> Graphic Era University (GEU '28) · Dehradun, Uttarakhand

---

## 📖 Visual Concept & Design Identity

**"The Developer's Sketchbook — A Personal Engineering Journal"**  
An editorial, handwritten engineering notebook aesthetic crafted with modern web technologies:
- **Matte Black Ruled Notebook Background** (`#101010`) with horizontal lines (`#353535`) spaced at 28px intervals.
- **Continuous Shooting Star Canvas Animation** traversing diagonally with luminous heads, soft fading tails, and twinkling background stars.
- **Handwritten Typography** using Google Fonts (*Caveat*, *Patrick Hand*) combined with elegant serif descriptions (*Lora*) and clean monospace metadata.
- **Engineering Visuals**: Interactive 3D isometric floating CPU processor (*Three.js*) with organic radiating PCB copper traces and glowing signal nodes—strictly engineering and silicon, with zero space/astronomy objects.
- **Scrapbook Layout**: Polaroid workspace photographs tilted with translucent scotch tape strips, torn-paper quick facts notes, and handwritten checklist items.
- **Separate Professional SaaS Admin Portal** for managing projects, skills, education, storytelling chapters, and contact messages.

---

## 🛠️ Tech Stack Architecture

### Frontend
- **React 19 + TypeScript**: Modern component architecture
- **Vite**: Ultra-fast build pipeline
- **Tailwind CSS**: Custom palette (`#101010`, `#F0E9EF`, `#F2A6AC`, `#76A9FF`, `#8FCF9B`)
- **Three.js**: Interactive 3D CPU processor with mouse tilt and circuit traces
- **HTML5 Canvas**: Non-blocking diagonal shooting star animation
- **React Router**: Client-side routing for 7 notebook chapters + admin portal
- **Lucide Icons**: Clean interface icons

### Backend & Database
- **Node.js + Express + TypeScript**: RESTful API service
- **MongoDB Atlas + Mongoose**: Persistent document schemas with indexing and timestamps
- **Resilient Fallback Mode**: In-memory store pre-seeded with authentic data for offline/standalone execution
- **Security**: JWT authentication in HTTP-only cookies, bcrypt password hashing, Helmet, CORS, and Express Rate Limit
- **Centralized Error Handling**: Safe error formatting without stack traces in production

---

## 📁 Repository Structure

```
portfolio/
├── frontend/
│   ├── public/
│   │   └── chip-icon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── CpuProcessor3D.tsx       # 3D floating CPU with circuit traces
│   │   │   ├── ShootingStarsCanvas.tsx  # Continuous diagonal shooting stars
│   │   │   ├── NotebookNav.tsx          # Vertical torn-paper left navigation
│   │   │   └── Icons.tsx                # GitHub & LinkedIn SVG icons
│   │   ├── layouts/
│   │   │   └── NotebookLayout.tsx       # Master sketchbook layout with footer
│   │   ├── pages/
│   │   │   ├── HomePage.tsx             # Chapter 01 (Hero + Journey Preview)
│   │   │   ├── JourneyPage.tsx          # Chapter 02 (Personal Storytelling)
│   │   │   ├── ProjectsPage.tsx         # Chapter 03 (Scrapbook Grid + Detail Modal)
│   │   │   ├── SkillsPage.tsx           # Chapter 04 (Technical Arsenal Checklist)
│   │   │   ├── EducationPage.tsx        # Chapter 05 (Academic Timeline at GEU)
│   │   │   ├── BeyondCodePage.tsx       # Chapter 06 (Interests & Creative Scrapbook)
│   │   │   ├── ContactPage.tsx          # Chapter 07 (Stationery Contact Form)
│   │   │   ├── AdminLoginPage.tsx       # Secure Admin Login
│   │   │   └── AdminDashboardPage.tsx   # SaaS Admin Portal with CRUD
│   │   ├── services/
│   │   │   └── api.ts                   # REST client for public & admin endpoints
│   │   ├── App.tsx                      # Route declarations
│   │   ├── index.css                    # Notebook lines, tape, torn paper styles
│   │   └── main.tsx
│   ├── tailwind.config.js
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts                    # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.ts        # JWT login, logout, me
│   │   │   ├── projectController.ts     # Project CRUD & slug query
│   │   │   ├── skillController.ts       # Skill CRUD & grouping
│   │   │   ├── educationController.ts   # Education timeline CRUD
│   │   │   ├── journeyController.ts     # Storytelling updates
│   │   │   ├── settingsController.ts    # Metadata & social updates
│   │   │   ├── beyondCodeController.ts  # Creative interest CRUD
│   │   │   ├── messageController.ts     # Contact submissions & read flags
│   │   │   └── dashboardController.ts   # Stats & counts
│   │   ├── middleware/
│   │   │   ├── auth.ts                  # JWT verify from cookie/header
│   │   │   ├── errorHandler.ts          # Centralized error handler
│   │   │   └── rateLimiter.ts           # Login & contact rate limiters
│   │   ├── models/                      # Mongoose schemas
│   │   ├── routes/                      # Public & protected admin routes
│   │   ├── services/                    # Data service with pre-seeded fallback
│   │   ├── utils/
│   │   │   └── seed.ts                  # Database seeder
│   │   └── index.ts                     # Express entry point
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18+)
- npm or yarn

### 1. Backend Setup
```bash
cd portfolio/backend
npm install
```

Configure `.env` (optional for local testing, required for MongoDB Atlas):
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/suraj_portfolio?retryWrites=true&w=majority
JWT_SECRET=super_secret_sketchbook_jwt_key_2026_suraj_bhandari
ADMIN_EMAIL=admin@surajsinghbhandari.dev
ADMIN_PASSWORD=Admin@Sketchbook2026!
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

Start the backend:
```bash
npm run dev
# or build & start:
npm run build
npm start
```
The server will run at `http://localhost:5000`.

### 2. Frontend Setup
```bash
cd portfolio/frontend
npm install
npm run dev
```
The portfolio will launch at `http://localhost:5173`.

---

## 🔐 Admin Portal Credentials

- **URL**: `http://localhost:5173/admin/login`
- **Email**: `admin@surajsinghbhandari.dev`
- **Password**: `Admin@Sketchbook2026!`

Once logged in, the admin can:
1. Create, edit, and delete **Projects** (with category, technologies, image, and repository links)
2. Add, modify, and delete **Skills** across 6 categories (Proficient, Learning, Exploring)
3. Maintain **Education Timeline** milestones for Graphic Era University
4. Edit the **Journey story, background, and goals**
5. Curate **Beyond Code** entries (photographs, notes, and tags)
6. Review, mark as read, and delete received **Contact Messages**
7. Update **Site Settings** (name, tagline, email, social links, resume link, status text)

---

## 🌐 Production Deployment

### Frontend Deployment (Vercel)
1. Push the repository to GitHub.
2. In Vercel, import the repo and set the **Root Directory** to `frontend`.
3. Set the Environment Variable:
   - `VITE_API_BASE_URL`: `https://your-backend.onrender.com/api`
4. Deploy!

### Backend Deployment (Render)
1. In Render, create a new **Web Service** pointing to the repository.
2. Set the **Root Directory** to `backend`.
3. Build Command: `npm install && npm run build`
4. Start Command: `npm start`
5. Configure Environment Variables in Render:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `DATABASE_URL`: `your_mongodb_atlas_connection_string`
   - `JWT_SECRET`: `a_strong_random_secret_at_least_32_characters`
   - `ADMIN_EMAIL`: `admin@surajsinghbhandari.dev`
   - `ADMIN_PASSWORD`: `your_secure_admin_password`
   - `ALLOWED_ORIGINS`: `https://your-portfolio.vercel.app`
6. Deploy!
