const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Helper for HTTP requests
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('sketchbook_token');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include', // for cookies
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Network request failed');
  }

  return data;
}

// Public API Services
export const api = {
  // Projects
  getProjects: (params?: { category?: string; status?: string; featured?: boolean }) => {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.status) query.append('status', params.status);
    if (params?.featured !== undefined) query.append('featured', String(params.featured));
    return request<{ success: boolean; count: number; data: any[] }>(`/projects?${query.toString()}`);
  },

  getProjectBySlug: (slug: string) => {
    return request<{ success: boolean; data: any }>(`/projects/${slug}`);
  },

  // Skills
  getSkills: (grouped = false) => {
    return request<{ success: boolean; count: number; data: any }>(`/skills?grouped=${grouped}`);
  },

  // Education
  getEducation: () => {
    return request<{ success: boolean; count: number; data: any[] }>(`/education`);
  },

  // Journey
  getJourney: () => {
    return request<{ success: boolean; data: any }>(`/journey`);
  },

  // Site Settings
  getSiteSettings: () => {
    return request<{ success: boolean; data: any }>(`/site-settings`);
  },

  // Beyond Code
  getBeyondCode: () => {
    return request<{ success: boolean; count: number; data: any[] }>(`/beyond-code`);
  },

  // Contact
  sendMessage: (data: { name: string; email: string; subject: string; message: string }) => {
    return request<{ success: boolean; message: string; data: any }>(`/contact`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Admin Auth
  adminLogin: async (credentials: { email: string; password: string }) => {
    const res = await request<{ success: boolean; token: string; admin: any }>(`/admin/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (res.token) {
      localStorage.setItem('sketchbook_token', res.token);
    }
    return res;
  },

  adminLogout: async () => {
    localStorage.removeItem('sketchbook_token');
    return request<{ success: boolean }>(`/admin/logout`, { method: 'POST' });
  },

  adminGetMe: () => {
    return request<{ success: boolean; admin: any }>(`/admin/me`);
  },

  // Admin Dashboard
  adminGetDashboard: () => {
    return request<{ success: boolean; stats: any; recentMessages: any[] }>(`/admin/dashboard`);
  },

  // Admin Projects CRUD
  adminCreateProject: (data: any) => {
    return request<{ success: boolean; message: string; data: any }>(`/admin/projects`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  adminUpdateProject: (id: string, data: any) => {
    return request<{ success: boolean; message: string; data: any }>(`/admin/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  adminDeleteProject: (id: string) => {
    return request<{ success: boolean; message: string }>(`/admin/projects/${id}`, {
      method: 'DELETE',
    });
  },

  // Admin Skills CRUD
  adminCreateSkill: (data: any) => {
    return request<{ success: boolean; message: string; data: any }>(`/admin/skills`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  adminUpdateSkill: (id: string, data: any) => {
    return request<{ success: boolean; message: string; data: any }>(`/admin/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  adminDeleteSkill: (id: string) => {
    return request<{ success: boolean; message: string }>(`/admin/skills/${id}`, {
      method: 'DELETE',
    });
  },

  // Admin Education CRUD
  adminCreateEducation: (data: any) => {
    return request<{ success: boolean; message: string; data: any }>(`/admin/education`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  adminUpdateEducation: (id: string, data: any) => {
    return request<{ success: boolean; message: string; data: any }>(`/admin/education/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  adminDeleteEducation: (id: string) => {
    return request<{ success: boolean; message: string }>(`/admin/education/${id}`, {
      method: 'DELETE',
    });
  },

  // Admin Journey & Settings
  adminUpdateJourney: (data: any) => {
    return request<{ success: boolean; message: string; data: any }>(`/admin/journey`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  adminUpdateSettings: (data: any) => {
    return request<{ success: boolean; message: string; data: any }>(`/admin/settings`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Admin Beyond Code CRUD
  adminCreateBeyondCode: (data: any) => {
    return request<{ success: boolean; message: string; data: any }>(`/admin/beyond-code`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  adminUpdateBeyondCode: (id: string, data: any) => {
    return request<{ success: boolean; message: string; data: any }>(`/admin/beyond-code/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  adminDeleteBeyondCode: (id: string) => {
    return request<{ success: boolean; message: string }>(`/admin/beyond-code/${id}`, {
      method: 'DELETE',
    });
  },

  // Admin Messages
  adminGetMessages: (page = 1, limit = 20) => {
    return request<{ success: boolean; total: number; page: number; pages: number; data: any[] }>(
      `/admin/messages?page=${page}&limit=${limit}`
    );
  },

  adminMarkMessageRead: (id: string, isRead = true) => {
    return request<{ success: boolean; data: any }>(`/admin/messages/${id}/read`, {
      method: 'PATCH',
      body: JSON.stringify({ isRead }),
    });
  },

  adminDeleteMessage: (id: string) => {
    return request<{ success: boolean; message: string }>(`/admin/messages/${id}`, {
      method: 'DELETE',
    });
  },
};
