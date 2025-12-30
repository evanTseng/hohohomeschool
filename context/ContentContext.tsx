
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ServiceItem } from '../types';
import { BookOpen, Heart, PenTool, Sprout, Utensils, Sun, Users, Home, Palette } from 'lucide-react';
import { api } from '../services/api';

export interface ResourceItem {
  id: string;
  category: 'parenting' | 'reading' | 'crafts';
  title: string;
  summary: string;
  image: string;
  date?: string;
  author?: string;
  tags?: string[];
  content: string[];
}

interface ContentContextType {
  services: ServiceItem[];
  resources: ResourceItem[];
  isLoading: boolean;
  addService: (service: Omit<ServiceItem, 'icon'> & { iconType: string }) => Promise<void>;
  addResource: (resource: Omit<ResourceItem, 'id' | 'date'>) => Promise<void>;
  refresh: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const getIcon = (type: string) => {
  switch (type) {
    case 'Sprout': return <Sprout size={32} />;
    case 'Heart': return <Heart size={32} />;
    case 'BookOpen': return <BookOpen size={32} />;
    case 'PenTool': return <PenTool size={32} />;
    case 'Utensils': return <Utensils size={32} />;
    case 'Sun': return <Sun size={32} />;
    case 'Users': return <Users size={32} />;
    case 'Home': return <Home size={32} />;
    default: return <Palette size={32} />;
  }
};

const defaultServicesData = [
  {
    id: 'slow-living',
    title: '慢養心得',
    description: '在快節奏的時代，我們練習慢下來。',
    iconType: 'Sprout',
    fullImage: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc91cb4?auto=format&fit=crop&q=80&w=1200',
    longDescription: '我們分享如何在日常生活中實踐「慢養」。',
    details: ['練習等待的藝術', '情緒調節']
  },
  {
    id: 'positive-discipline',
    title: '正向教養',
    description: '運用溫和而堅定的態度，建立相互尊重的親子關係。',
    iconType: 'Heart',
    fullImage: 'https://images.unsplash.com/photo-1628143769167-375971488c9f?auto=format&fit=crop&q=80&w=1200',
    longDescription: '尋求「溫和」與「堅定」的平衡。',
    details: ['溫和而堅定的溝通', '家庭會議']
  }
];

const defaultResourcesData = [
  {
    id: '1',
    category: 'parenting',
    title: '允許孩子慢慢來：等待的藝術',
    summary: '當我願意停下來等待，孩子眼裡的光芒是如此不同。',
    image: 'https://picsum.photos/id/1060/800/600',
    date: '2023.10.15',
    author: 'Iris',
    tags: ['慢養', '情緒調節'],
    content: ['「快一點！」這句話似乎成了現代父母的口頭禪。']
  },
  {
    id: '2',
    category: 'reading',
    title: '繪本中的溫柔力量',
    summary: '認識內心的小怪獸。',
    image: 'https://picsum.photos/id/488/800/600',
    date: '2023.11.20',
    author: 'Iris',
    tags: ['繪本', '共讀'],
    content: ['繪本不只是故事，更是一扇窗。']
  }
];

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = async () => {
    setIsLoading(true);
    try {
      // Seed if empty (Simulating migration/initial state)
      await api.services.seed(defaultServicesData);
      await api.resources.seed(defaultResourcesData);

      const [sData, rData] = await Promise.all([
        api.services.list(),
        api.resources.list()
      ]);

      setServices(sData.map((s: any) => ({ ...s, icon: getIcon(s.iconType) })));
      // Fix: Cast rData to ResourceItem[] to resolve TypeScript assignment error
      setResources(rData as ResourceItem[]);
    } catch (err) {
      console.error("Failed to fetch data from API:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const addService = async (service: Omit<ServiceItem, 'icon'> & { iconType: string }) => {
    await api.services.create(service);
    await refresh();
  };

  const addResource = async (resource: Omit<ResourceItem, 'id' | 'date'>) => {
    const newResource = {
      ...resource,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('zh-TW').replace(/\//g, '.'),
      author: resource.author || '厚厚小編'
    };
    await api.resources.create(newResource);
    await refresh();
  };

  return (
    <ContentContext.Provider value={{ services, resources, isLoading, addService, addResource, refresh }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within a ContentProvider');
  return context;
};
