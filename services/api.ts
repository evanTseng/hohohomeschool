
/**
 * Hou Hou Si Shu - Resilient API Client
 * 
 * 優先嘗試連線 Python (FastAPI) 後端。
 * 若連線失敗（例如伺服器未啟動），將自動切換至「展示模式」，使用本地 IndexedDB。
 */

const BASE_URL = 'http://localhost:8000/api/v1';
let isDemoMode = false;

const getAuthHeader = async () => {
  const db = await import('../lib/db');
  const auths = await db.getAll<any>('auth');
  const session = auths.find(a => a.id === 'current_session');
  return session?.token ? { 'Authorization': `Bearer ${session.token}` } : {};
};

const request = async (endpoint: string, options: RequestInit = {}) => {
  // 如果已經確定在展示模式，直接拋出錯誤進入 fallback
  if (isDemoMode) throw new Error('DEMO_MODE');

  const authHeader = await getAuthHeader();
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
      ...options.headers,
    }
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || '請求失敗');
    }
    return response;
  } catch (error: any) {
    if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
      console.warn(`[API] 無法連線至 Python 伺服器 (${BASE_URL})，切換至本地展示模式。`);
      isDemoMode = true; 
      throw new Error('DEMO_MODE');
    }
    throw error;
  }
};

// Fallback 處理邏輯
const withFallback = async (apiCall: () => Promise<any>, fallbackCall: () => Promise<any>) => {
  try {
    return await apiCall();
  } catch (error: any) {
    if (error.message === 'DEMO_MODE') {
      return await fallbackCall();
    }
    throw error;
  }
};

export const api = {
  services: {
    list: async () => {
      return withFallback(
        async () => (await request('/services')).json(),
        async () => {
          const db = await import('../lib/db');
          return await db.getAll('services');
        }
      );
    },
    create: async (item: any) => {
      return withFallback(
        async () => (await request('/services', { method: 'POST', body: JSON.stringify(item) })).json(),
        async () => {
          const db = await import('../lib/db');
          await db.putItem('services', item);
          return item;
        }
      );
    },
    seed: async (defaults: any[]) => {
      const existing = await api.services.list();
      if (existing.length === 0) {
        for (const item of defaults) {
          const { icon, ...rest } = item;
          await api.services.create({ ...rest, iconType: item.iconType || 'Palette' });
        }
      }
    }
  },

  resources: {
    list: async () => {
      return withFallback(
        async () => (await request('/resources')).json(),
        async () => {
          const db = await import('../lib/db');
          return await db.getAll('resources');
        }
      );
    },
    create: async (item: any) => {
      return withFallback(
        async () => (await request('/resources', { method: 'POST', body: JSON.stringify(item) })).json(),
        async () => {
          const db = await import('../lib/db');
          await db.putItem('resources', item);
          return item;
        }
      );
    },
    seed: async (defaults: any[]) => {
      const existing = await api.resources.list();
      if (existing.length === 0) {
        for (const item of defaults) {
          await api.resources.create(item);
        }
      }
    }
  },

  auth: {
    login: async (email: string, password: string) => {
      return withFallback(
        async () => {
          const response = await request('/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
          });
          const data = await response.json();
          const db = await import('../lib/db');
          const sessionUser = { ...data.user, id: 'current_session', token: data.access_token };
          await db.putItem('auth', sessionUser);
          return sessionUser;
        },
        async () => {
          // 本地模擬登入
          if (email === 'houhouadmin@gmail.com' && password === 'houhouadmin@gmail') {
            const user = { name: '厚厚管理員 (本地模式)', email, id: 'current_session', avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}` };
            const db = await import('../lib/db');
            await db.putItem('auth', user);
            return user;
          }
          throw new Error('帳號密碼不正確 (展示模式)');
        }
      );
    },
    getSession: async () => {
      const db = await import('../lib/db');
      const auths = await db.getAll<any>('auth');
      return auths.find(a => a.id === 'current_session') || null;
    },
    logout: async () => {
      const db = await import('../lib/db');
      const store = await db.dbQuery('auth', 'readwrite');
      store.delete('current_session');
      isDemoMode = false; // 登出時重置模式
    }
  }
};
