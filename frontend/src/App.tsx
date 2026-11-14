import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NotebookLayout } from './layouts/NotebookLayout';
import { HomePage } from './pages/HomePage';
import { JourneyPage } from './pages/JourneyPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { SkillsPage } from './pages/SkillsPage';
import { EducationPage } from './pages/EducationPage';
import { BeyondCodePage } from './pages/BeyondCodePage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

// Simple 404 Notebook page
const NotFoundPage: React.FC = () => (
  <div className="py-24 text-center space-y-4">
    <span className="font-mono text-sm text-[#F2A6AC]">ERROR // 404_PAGE_NOT_FOUND</span>
    <h1 className="font-handwriting text-6xl font-bold text-[#F0E9EF]">Missing Journal Page</h1>
    <p className="font-serif text-[#BDB5B9]">
      This chapter has not been written yet or the page index is incorrect.
    </p>
    <div className="pt-4">
      <a
        href="/"
        className="font-handwriting text-2xl text-[#76A9FF] hover:text-[#F2A6AC] transition-colors underline"
      >
        Return to Table of Contents (Home) →
      </a>
    </div>
  </div>
);

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Notebook Routes */}
        <Route path="/" element={<NotebookLayout />}>
          <Route index element={<HomePage />} />
          <Route path="journey" element={<JourneyPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="education" element={<EducationPage />} />
          <Route path="beyond-code" element={<BeyondCodePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Separate Admin Portal Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
