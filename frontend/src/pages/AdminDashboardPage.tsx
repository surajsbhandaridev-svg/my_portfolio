import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import {
  Layers,
  Code,
  GraduationCap,
  BookOpen,
  Sparkles,
  Inbox,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  ExternalLink,
  Shield,
  Eye,
  RefreshCw,
  Search,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects' | 'skills' | 'education' | 'journey' | 'beyond' | 'messages' | 'settings'>('dashboard');
  const [admin, setAdmin] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  // Tab Data States
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [journey, setJourney] = useState<any>(null);
  const [beyond, setBeyond] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>(null);

  // Modals & Editing States
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string>('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Auth check & load initial stats
  useEffect(() => {
    api.adminGetMe()
      .then((res) => {
        if (res.success && res.admin) {
          setAdmin(res.admin);
          loadAllData();
        } else {
          navigate('/admin/login');
        }
      })
      .catch(() => {
        navigate('/admin/login');
      });
  }, [navigate]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [statsRes, projRes, skillsRes, eduRes, journeyRes, beyondRes, msgRes, settingsRes] = await Promise.all([
        api.adminGetDashboard(),
        api.getProjects(),
        api.getSkills(),
        api.getEducation(),
        api.getJourney(),
        api.getBeyondCode(),
        api.adminGetMessages(),
        api.getSiteSettings(),
      ]);

      if (statsRes.success) setStats(statsRes.stats);
      if (projRes.success) setProjects(projRes.data);
      if (skillsRes.success) setSkills(skillsRes.data);
      if (eduRes.success) setEducation(eduRes.data);
      if (journeyRes.success) setJourney(journeyRes.data);
      if (beyondRes.success) setBeyond(beyondRes.data);
      if (msgRes.success) setMessages(msgRes.data);
      if (settingsRes.success) setSiteSettings(settingsRes.data);
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await api.adminLogout();
    navigate('/admin/login');
  };

  // Project Actions
  const handleSaveProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      title: formData.get('title'),
      slug: formData.get('slug'),
      description: formData.get('description'),
      longDescription: formData.get('longDescription'),
      technologies: formData.get('technologies'),
      category: formData.get('category'),
      status: formData.get('status'),
      image: formData.get('image'),
      githubUrl: formData.get('githubUrl'),
      liveUrl: formData.get('liveUrl'),
      featured: formData.get('featured') === 'on',
    };

    try {
      if (editingItem?._id) {
        await api.adminUpdateProject(editingItem._id, payload);
        showToast('Project updated successfully.');
      } else {
        await api.adminCreateProject(payload);
        showToast('New project created.');
      }
      setIsModalOpen(false);
      setEditingItem(null);
      loadAllData();
    } catch (err: any) {
      alert(err.message || 'Failed to save project');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.adminDeleteProject(id);
      showToast('Project deleted.');
      loadAllData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Skill Actions
  const handleSaveSkill = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      category: formData.get('category'),
      status: formData.get('status'),
    };

    try {
      if (editingItem?._id) {
        await api.adminUpdateSkill(editingItem._id, payload);
        showToast('Skill updated.');
      } else {
        await api.adminCreateSkill(payload);
        showToast('Skill added.');
      }
      setIsModalOpen(false);
      setEditingItem(null);
      loadAllData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm('Delete this skill?')) return;
    try {
      await api.adminDeleteSkill(id);
      showToast('Skill deleted.');
      loadAllData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Education Actions
  const handleSaveEducation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      institution: formData.get('institution'),
      degree: formData.get('degree'),
      field: formData.get('field'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      current: formData.get('current') === 'on',
      description: formData.get('description'),
      milestones: formData.get('milestones'),
    };

    try {
      if (editingItem?._id) {
        await api.adminUpdateEducation(editingItem._id, payload);
        showToast('Education record updated.');
      } else {
        await api.adminCreateEducation(payload);
        showToast('Education record created.');
      }
      setIsModalOpen(false);
      setEditingItem(null);
      loadAllData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteEducation = async (id: string) => {
    if (!confirm('Delete education record?')) return;
    try {
      await api.adminDeleteEducation(id);
      showToast('Education record deleted.');
      loadAllData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Journey Update
  const handleSaveJourney = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      introduction: formData.get('introduction'),
      howIStarted: formData.get('howIStarted'),
      story: formData.get('story'),
      problemSolvingApproach: formData.get('problemSolvingApproach'),
      currentLearning: formData.get('currentLearning'),
      futureGoals: formData.get('futureGoals'),
    };

    try {
      await api.adminUpdateJourney(payload);
      showToast('Journey content updated successfully.');
      loadAllData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Site Settings Update
  const handleSaveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      tagline: formData.get('tagline'),
      subtitle: formData.get('subtitle'),
      email: formData.get('email'),
      github: formData.get('github'),
      linkedin: formData.get('linkedin'),
      resumeUrl: formData.get('resumeUrl'),
      statusText: formData.get('statusText'),
    };

    try {
      await api.adminUpdateSettings(payload);
      showToast('Site settings updated.');
      loadAllData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Message Actions
  const handleToggleMessageRead = async (id: string, currentState: boolean) => {
    try {
      await api.adminMarkMessageRead(id, !currentState);
      showToast('Message status updated.');
      loadAllData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    try {
      await api.adminDeleteMessage(id);
      showToast('Message deleted.');
      loadAllData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e11] text-zinc-100 flex font-sans selection:bg-[#F2A6AC] selection:text-[#101010]">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161618] border border-[#8FCF9B] text-[#8FCF9B] px-4 py-3 rounded-lg shadow-xl text-sm flex items-center gap-2">
          <CheckCircle size={16} />
          <span>{toast}</span>
        </div>
      )}

      {/* Modern SaaS Admin Sidebar */}
      <aside className="w-64 bg-[#141416] border-r border-zinc-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo / Brand */}
          <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
            <div className="p-2 bg-[#F2A6AC]/10 border border-[#F2A6AC]/30 rounded-lg text-[#F2A6AC]">
              <Shield size={20} />
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-tight text-white">Journal Admin</h1>
              <p className="text-[11px] font-mono text-zinc-500">v2.0 // MERN STACK</p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-3 space-y-1 text-sm font-medium">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Layers size={18} />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md transition-colors ${
                activeTab === 'projects'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Code size={18} />
              <span>Projects</span>
              <span className="ml-auto text-xs font-mono bg-zinc-800 px-2 py-0.5 rounded text-zinc-400">
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md transition-colors ${
                activeTab === 'skills'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Sparkles size={18} />
              <span>Skills Arsenal</span>
              <span className="ml-auto text-xs font-mono bg-zinc-800 px-2 py-0.5 rounded text-zinc-400">
                {skills.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md transition-colors ${
                activeTab === 'education'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <GraduationCap size={18} />
              <span>Education</span>
            </button>

            <button
              onClick={() => setActiveTab('journey')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md transition-colors ${
                activeTab === 'journey'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <BookOpen size={18} />
              <span>Journey Chapter</span>
            </button>

            <button
              onClick={() => setActiveTab('beyond')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md transition-colors ${
                activeTab === 'beyond'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Sparkles size={18} />
              <span>Beyond Code</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md transition-colors ${
                activeTab === 'messages'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Inbox size={18} />
              <span>Messages</span>
              {stats?.unreadMessages > 0 && (
                <span className="ml-auto text-xs font-bold bg-[#F2A6AC] text-[#101010] px-2 py-0.5 rounded-full">
                  {stats.unreadMessages}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md transition-colors ${
                activeTab === 'settings'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Settings size={18} />
              <span>Site Settings</span>
            </button>
          </nav>
        </div>

        {/* User profile & Logout */}
        <div className="p-4 border-t border-zinc-800 space-y-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between text-xs text-zinc-400 hover:text-white px-2 py-1.5 rounded hover:bg-zinc-800/50"
          >
            <span>View Public Website</span>
            <ExternalLink size={14} />
          </Link>

          <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
            <div className="truncate">
              <p className="text-xs font-medium text-white truncate">{admin?.name || 'Suraj Singh'}</p>
              <p className="text-[11px] font-mono text-zinc-500 truncate">{admin?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded text-zinc-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white capitalize">
              {activeTab === 'dashboard' ? 'Overview & Metrics' : activeTab}
            </h1>
            <p className="text-xs text-zinc-400">
              Manage live content on Suraj Singh Bhandari's engineering portfolio.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAllData}
              className="p-2 rounded border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white hover:border-zinc-700"
              title="Refresh data"
            >
              <RefreshCw size={15} />
            </button>
          </div>
        </div>

        {/* ===================== TAB: OVERVIEW / DASHBOARD ===================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="p-5 rounded-lg bg-[#141416] border border-zinc-800 space-y-1">
                <span className="text-xs font-mono text-zinc-400 uppercase">Total Projects</span>
                <p className="text-3xl font-bold text-white">{stats?.totalProjects || projects.length}</p>
              </div>
              <div className="p-5 rounded-lg bg-[#141416] border border-zinc-800 space-y-1">
                <span className="text-xs font-mono text-[#8FCF9B] uppercase">Published</span>
                <p className="text-3xl font-bold text-[#8FCF9B]">{stats?.publishedProjects || 0}</p>
              </div>
              <div className="p-5 rounded-lg bg-[#141416] border border-zinc-800 space-y-1">
                <span className="text-xs font-mono text-amber-300 uppercase">Draft / Exp.</span>
                <p className="text-3xl font-bold text-amber-300">{stats?.draftProjects || 0}</p>
              </div>
              <div className="p-5 rounded-lg bg-[#141416] border border-zinc-800 space-y-1">
                <span className="text-xs font-mono text-[#76A9FF] uppercase">Total Skills</span>
                <p className="text-3xl font-bold text-[#76A9FF]">{stats?.totalSkills || skills.length}</p>
              </div>
              <div className="p-5 rounded-lg bg-[#141416] border border-zinc-800 space-y-1">
                <span className="text-xs font-mono text-[#F2A6AC] uppercase">Unread Inquiries</span>
                <p className="text-3xl font-bold text-[#F2A6AC]">{stats?.unreadMessages || 0}</p>
              </div>
            </div>

            {/* Quick Actions & Recent Messages */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Recent Messages */}
              <div className="lg:col-span-7 bg-[#141416] border border-zinc-800 rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-sm text-white flex items-center gap-2">
                    <Inbox size={16} className="text-[#F2A6AC]" /> Recent Inquiries
                  </h2>
                  <button
                    onClick={() => setActiveTab('messages')}
                    className="text-xs text-[#F2A6AC] hover:underline"
                  >
                    View All Messages
                  </button>
                </div>

                {messages.length === 0 ? (
                  <p className="text-xs text-zinc-500 py-6 text-center">No messages received yet.</p>
                ) : (
                  <div className="space-y-3">
                    {messages.slice(0, 4).map((m) => (
                      <div
                        key={m._id}
                        className={`p-3.5 rounded border transition-colors ${
                          !m.isRead
                            ? 'bg-zinc-900 border-[#F2A6AC]/30'
                            : 'bg-zinc-900/40 border-zinc-800/80'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-medium text-white">{m.name}</span>
                          <span className="text-zinc-500 font-mono">
                            {new Date(m.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300 font-medium">{m.subject}</p>
                        <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">{m.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Verified System Verification */}
              <div className="lg:col-span-5 bg-[#141416] border border-zinc-800 rounded-lg p-6 space-y-4">
                <h2 className="font-semibold text-sm text-white flex items-center gap-2">
                  <Shield size={16} className="text-[#8FCF9B]" /> System Architecture Status
                </h2>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-zinc-900 rounded border border-zinc-800 flex items-center justify-between">
                    <span className="text-zinc-400">Database Engine</span>
                    <span className="font-mono text-emerald-400 font-semibold">MongoDB Atlas</span>
                  </div>
                  <div className="p-3 bg-zinc-900 rounded border border-zinc-800 flex items-center justify-between">
                    <span className="text-zinc-400">Auth Security</span>
                    <span className="font-mono text-[#76A9FF] font-semibold">JWT + bcrypt Hashing</span>
                  </div>
                  <div className="p-3 bg-zinc-900 rounded border border-zinc-800 flex items-center justify-between">
                    <span className="text-zinc-400">Rate Limiting</span>
                    <span className="font-mono text-[#8FCF9B] font-semibold">Express Rate Limit</span>
                  </div>
                  <div className="p-3 bg-zinc-900 rounded border border-zinc-800 flex items-center justify-between">
                    <span className="text-zinc-400">3D Silicon Visual</span>
                    <span className="font-mono text-[#F2A6AC] font-semibold">Three.js WebGL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB: PROJECTS ===================== */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">
                Manage personal projects, technology tags, and repository links.
              </span>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setModalType('project');
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#F2A6AC] text-[#101010] font-semibold text-xs rounded hover:opacity-90 transition-opacity"
              >
                <Plus size={15} /> Add Project
              </button>
            </div>

            <div className="bg-[#141416] border border-zinc-800 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-900 text-zinc-400 border-b border-zinc-800 font-mono uppercase">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Technologies</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {projects.map((p) => (
                    <tr key={p._id} className="hover:bg-zinc-900/40">
                      <td className="p-4 font-medium text-white">{p.title}</td>
                      <td className="p-4 text-zinc-400 uppercase font-mono">{p.category}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                            p.status === 'completed'
                              ? 'bg-emerald-950 text-[#8FCF9B]'
                              : p.status === 'ongoing'
                              ? 'bg-blue-950 text-[#76A9FF]'
                              : 'bg-amber-950 text-amber-300'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4 text-zinc-400 font-mono text-[11px]">
                        {p.technologies?.slice(0, 3).join(', ')}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingItem(p);
                            setModalType('project');
                            setIsModalOpen(true);
                          }}
                          className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p._id)}
                          className="p-1 rounded text-zinc-400 hover:text-rose-400 hover:bg-rose-950/30"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================== TAB: SKILLS ===================== */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">
                Organize languages, frontend, backend, databases, tools, and CS foundations.
              </span>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setModalType('skill');
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#F2A6AC] text-[#101010] font-semibold text-xs rounded hover:opacity-90 transition-opacity"
              >
                <Plus size={15} /> Add Skill
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((s) => (
                <div
                  key={s._id}
                  className="p-4 rounded-lg bg-[#141416] border border-zinc-800 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-sm text-white">{s.name}</h3>
                    <p className="text-[11px] font-mono text-zinc-500 uppercase">{s.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                        s.status === 'proficient'
                          ? 'bg-emerald-950 text-[#8FCF9B]'
                          : s.status === 'learning'
                          ? 'bg-blue-950 text-[#76A9FF]'
                          : 'bg-purple-950 text-purple-300'
                      }`}
                    >
                      {s.status}
                    </span>
                    <button
                      onClick={() => {
                        setEditingItem(s);
                        setModalType('skill');
                        setIsModalOpen(true);
                      }}
                      className="p-1 rounded text-zinc-400 hover:text-white"
                      title="Edit"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(s._id)}
                      className="p-1 rounded text-zinc-400 hover:text-rose-400"
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB: EDUCATION ===================== */}
        {activeTab === 'education' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">
                Manage academic timeline, Graphic Era Hill University (GEHU), and coursework milestones.
              </span>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setModalType('education');
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#F2A6AC] text-[#101010] font-semibold text-xs rounded hover:opacity-90 transition-opacity"
              >
                <Plus size={15} /> Add Record
              </button>
            </div>

            <div className="space-y-4">
              {education.map((e) => (
                <div
                  key={e._id}
                  className="p-5 rounded-lg bg-[#141416] border border-zinc-800 flex items-start justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm text-white">{e.institution}</h3>
                      <span className="text-xs font-mono text-zinc-500">
                        ({e.startDate} – {e.endDate})
                      </span>
                    </div>
                    <p className="text-xs text-[#76A9FF] font-medium">
                      {e.degree} — {e.field}
                    </p>
                    <p className="text-xs text-zinc-400 max-w-xl">{e.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingItem(e);
                        setModalType('education');
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-800"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteEducation(e._id)}
                      className="p-1.5 rounded text-zinc-400 hover:text-rose-400 hover:bg-rose-950/30"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB: JOURNEY ===================== */}
        {activeTab === 'journey' && (
          <div className="max-w-3xl space-y-6">
            <span className="text-xs text-zinc-400">
              Update storytelling chapters, problem-solving mindset, and future milestones.
            </span>

            <form onSubmit={handleSaveJourney} className="space-y-4 bg-[#141416] p-6 rounded-lg border border-zinc-800">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Introduction</label>
                <textarea
                  name="introduction"
                  defaultValue={journey?.introduction}
                  rows={3}
                  className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">How I Started Programming</label>
                <textarea
                  name="howIStarted"
                  defaultValue={journey?.howIStarted}
                  rows={3}
                  className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Building Systems Story</label>
                <textarea
                  name="story"
                  defaultValue={journey?.story}
                  rows={3}
                  className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Problem Solving Approach</label>
                <textarea
                  name="problemSolvingApproach"
                  defaultValue={journey?.problemSolvingApproach}
                  rows={3}
                  className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Currently Learning</label>
                  <textarea
                    name="currentLearning"
                    defaultValue={journey?.currentLearning}
                    rows={3}
                    className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Future Goals</label>
                  <textarea
                    name="futureGoals"
                    defaultValue={journey?.futureGoals}
                    rows={3}
                    className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-2 text-right">
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#F2A6AC] text-[#101010] font-semibold text-xs rounded hover:opacity-90"
                >
                  Save Journey Content
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ===================== TAB: MESSAGES ===================== */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <span className="text-xs text-zinc-400">
              Inquiries and messages submitted through the public contact form.
            </span>

            <div className="space-y-3">
              {messages.map((m) => (
                <div
                  key={m._id}
                  className={`p-5 rounded-lg border transition-all ${
                    !m.isRead ? 'bg-zinc-900/90 border-[#F2A6AC]/40' : 'bg-[#141416] border-zinc-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white">{m.name}</span>
                        <span className="text-xs font-mono text-zinc-500">({m.email})</span>
                        {!m.isRead && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F2A6AC] text-[#101010] font-bold">
                            NEW
                          </span>
                        )}
                      </div>
                      <h3 className="text-xs font-medium text-[#76A9FF]">{m.subject}</h3>
                      <p className="text-xs text-zinc-300 pt-1 whitespace-pre-wrap">{m.message}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleToggleMessageRead(m._id, m.isRead)}
                        className="px-2.5 py-1 text-[11px] rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                      >
                        {m.isRead ? 'Mark Unread' : 'Mark Read'}
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(m._id)}
                        className="p-1.5 rounded text-zinc-500 hover:text-rose-400 hover:bg-rose-950/30"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB: SITE SETTINGS ===================== */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-6">
            <span className="text-xs text-zinc-400">
              Customize core identity, social links, resume URL, and system status text.
            </span>

            <form onSubmit={handleSaveSettings} className="space-y-4 bg-[#141416] p-6 rounded-lg border border-zinc-800">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Developer Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={siteSettings?.name}
                  className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Hero Tagline</label>
                <input
                  type="text"
                  name="tagline"
                  defaultValue={siteSettings?.tagline}
                  className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Hero Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  defaultValue={siteSettings?.subtitle}
                  className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Primary Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={siteSettings?.email}
                    className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">GitHub Profile URL</label>
                  <input
                    type="url"
                    name="github"
                    defaultValue={siteSettings?.github}
                    className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    name="linkedin"
                    defaultValue={siteSettings?.linkedin}
                    className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Resume File Link</label>
                  <input
                    type="text"
                    name="resumeUrl"
                    defaultValue={siteSettings?.resumeUrl}
                    className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Status Bar Text</label>
                <input
                  type="text"
                  name="statusText"
                  defaultValue={siteSettings?.statusText}
                  className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-white"
                />
              </div>

              <div className="pt-2 text-right">
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#F2A6AC] text-[#101010] font-semibold text-xs rounded hover:opacity-90"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Modal Dialog for Project, Skill, or Education */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-[#161618] border border-zinc-800 rounded-lg p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-base font-bold text-white capitalize">
                {editingItem ? `Edit ${modalType}` : `Create New ${modalType}`}
              </h2>

              {/* PROJECT FORM */}
              {modalType === 'project' && (
                <form onSubmit={handleSaveProject} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-medium text-zinc-300 mb-1">Title</label>
                    <input
                      name="title"
                      defaultValue={editingItem?.title}
                      required
                      className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-zinc-300 mb-1">Slug</label>
                    <input
                      name="slug"
                      defaultValue={editingItem?.slug}
                      placeholder="e.g. dostleague"
                      className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-zinc-300 mb-1">Short Description</label>
                    <textarea
                      name="description"
                      defaultValue={editingItem?.description}
                      required
                      rows={2}
                      className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-zinc-300 mb-1">Long Architectural Description</label>
                    <textarea
                      name="longDescription"
                      defaultValue={editingItem?.longDescription}
                      rows={3}
                      className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-zinc-300 mb-1">Technologies (comma separated)</label>
                    <input
                      name="technologies"
                      defaultValue={editingItem?.technologies?.join(', ')}
                      placeholder="React, TypeScript, Node.js"
                      className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-zinc-300 mb-1">Category</label>
                      <select
                        name="category"
                        defaultValue={editingItem?.category || 'fullstack'}
                        className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded text-white"
                      >
                        <option value="fullstack">Full-Stack</option>
                        <option value="ai">AI & Security</option>
                        <option value="tools">Developer Tools</option>
                        <option value="systems">Systems & Data</option>
                        <option value="backend">Backend & APIs</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium text-zinc-300 mb-1">Status</label>
                      <select
                        name="status"
                        defaultValue={editingItem?.status || 'completed'}
                        className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded text-white"
                      >
                        <option value="completed">Completed</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="experimental">Experimental</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block font-medium text-zinc-300 mb-1">Image URL</label>
                    <input
                      name="image"
                      defaultValue={editingItem?.image}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-zinc-300 mb-1">GitHub URL</label>
                      <input
                        name="githubUrl"
                        defaultValue={editingItem?.githubUrl}
                        className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-zinc-300 mb-1">Live URL</label>
                      <input
                        name="liveUrl"
                        defaultValue={editingItem?.liveUrl}
                        className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded text-white"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      defaultChecked={editingItem?.featured}
                    />
                    <label htmlFor="featured" className="text-zinc-300">Feature on homepage hero</label>
                  </div>
                  <div className="pt-3 flex justify-end gap-2 border-t border-zinc-800">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-3.5 py-1.5 rounded bg-zinc-800 text-zinc-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded bg-[#F2A6AC] text-[#101010] font-semibold"
                    >
                      Save Project
                    </button>
                  </div>
                </form>
              )}

              {/* SKILL FORM */}
              {modalType === 'skill' && (
                <form onSubmit={handleSaveSkill} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-medium text-zinc-300 mb-1">Skill Name</label>
                    <input
                      name="name"
                      defaultValue={editingItem?.name}
                      required
                      placeholder="e.g. C++ or Docker"
                      className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-zinc-300 mb-1">Category</label>
                    <select
                      name="category"
                      defaultValue={editingItem?.category || 'languages'}
                      className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded text-white"
                    >
                      <option value="languages">Programming Languages</option>
                      <option value="frontend">Frontend Development</option>
                      <option value="backend">Backend Development</option>
                      <option value="databases">Databases</option>
                      <option value="tools">Developer Tools</option>
                      <option value="core_cs">Core Computer Science</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-zinc-300 mb-1">Proficiency Status</label>
                    <select
                      name="status"
                      defaultValue={editingItem?.status || 'proficient'}
                      className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded text-white"
                    >
                      <option value="proficient">Proficient</option>
                      <option value="learning">Learning</option>
                      <option value="exploring">Exploring</option>
                    </select>
                  </div>
                  <div className="pt-3 flex justify-end gap-2 border-t border-zinc-800">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-3.5 py-1.5 rounded bg-zinc-800 text-zinc-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded bg-[#F2A6AC] text-[#101010] font-semibold"
                    >
                      Save Skill
                    </button>
                  </div>
                </form>
              )}

              {/* EDUCATION FORM */}
              {modalType === 'education' && (
                <form onSubmit={handleSaveEducation} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-medium text-zinc-300 mb-1">Institution</label>
                    <input
                      name="institution"
                      defaultValue={editingItem?.institution}
                      required
                      className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-zinc-300 mb-1">Degree</label>
                      <input
                        name="degree"
                        defaultValue={editingItem?.degree}
                        required
                        className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-zinc-300 mb-1">Field of Study</label>
                      <input
                        name="field"
                        defaultValue={editingItem?.field}
                        className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-zinc-300 mb-1">Start Date</label>
                      <input
                        name="startDate"
                        defaultValue={editingItem?.startDate}
                        placeholder="2024"
                        className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-zinc-300 mb-1">End Date</label>
                      <input
                        name="endDate"
                        defaultValue={editingItem?.endDate}
                        placeholder="2028"
                        className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-medium text-zinc-300 mb-1">Description</label>
                    <textarea
                      name="description"
                      defaultValue={editingItem?.description}
                      rows={2}
                      className="w-full p-2 bg-zinc-900 border border-zinc-800 rounded text-white"
                    />
                  </div>
                  <div className="pt-3 flex justify-end gap-2 border-t border-zinc-800">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-3.5 py-1.5 rounded bg-zinc-800 text-zinc-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded bg-[#F2A6AC] text-[#101010] font-semibold"
                    >
                      Save Record
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
