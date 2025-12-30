import React, { useState } from 'react';
import { BookOpen, Heart, Palette, ArrowRight, Clock, Tag, ArrowLeft, Loader2, Plus } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const Resources: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { resources, isLoading } = useContent();
  const [filter, setFilter] = useState<'all' | 'parenting' | 'reading' | 'crafts'>('all');
  const [visibleCount, setVisibleCount] = useState(1);
  const [isExpanding, setIsExpanding] = useState(false);

  const handleLoadMore = async () => {
    setIsExpanding(true);
    // Simulate API delay for expanding
    await new Promise(res => setTimeout(res, 800));
    setVisibleCount(v => v + 6);
    setIsExpanding(false);
  };

  if (id) {
    const resource = resources.find(r => r.id === id);
    if (!resource) {
      return (
        <div className="min-h-screen pt-32 pb-24 text-center bg-rose-50">
            <h2 className="text-2xl font-serif text-stone-800 mb-4">找不到此文章</h2>
            <button onClick={() => navigate('/resources')} className="text-rose-600 underline">回到列表</button>
        </div>
      );
    }
    return (
      <article className="min-h-screen bg-white animate-[fadeIn_0.5s_ease-out]">
        <div className="bg-rose-50 pt-32 pb-12 px-6">
            <div className="max-w-4xl mx-auto">
                 <button onClick={() => navigate('/resources')} className="flex items-center gap-2 text-stone-500 hover:text-rose-800 mb-8">
                    <ArrowLeft size={20} /> <span className="text-sm font-medium">回到列表</span>
                </button>
                <div className="flex flex-wrap gap-6 items-center mb-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${resource.category === 'parenting' ? 'bg-rose-400' : resource.category === 'reading' ? 'bg-amber-400' : 'bg-emerald-400'}`}>
                        {resource.category === 'parenting' ? '育兒心得' : resource.category === 'reading' ? '閱讀分享' : '手作靈感'}
                    </span>
                    <div className="text-stone-400 text-sm flex gap-4">
                        {resource.date && <span className="flex items-center gap-1"><Clock size={14}/> {resource.date}</span>}
                        {resource.author && <span className="font-medium text-stone-500">By {resource.author}</span>}
                    </div>
                </div>
                <h1 className="text-3xl md:text-5xl font-serif text-stone-800 font-bold mb-8">{resource.title}</h1>
                <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg mb-12">
                    <img src={resource.image} alt={resource.title} className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
        <div className="max-w-3xl mx-auto px-6 py-12">
             <div className="prose prose-stone prose-lg max-w-none">
                {resource.content.map((p, idx) => <p key={idx} className="mb-6 leading-loose text-stone-600">{p}</p>)}
             </div>
        </div>
      </article>
    );
  }

  const filtered = filter === 'all' ? resources : resources.filter(r => r.category === filter);
  const visible = filtered.slice(0, visibleCount);

  return (
    <section id="resources" className="py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-4">資源與分享</h2>
          <div className="w-16 h-1 bg-rose-300 mx-auto"></div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center py-20">
            <Loader2 className="animate-spin text-rose-300 mb-4" size={40} />
            <p className="text-stone-400 font-serif italic">正在從資料庫讀取內容...</p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {[{k:'all',l:'全部',i:null},{k:'parenting',l:'育兒心得',i:Heart},{k:'reading',l:'閱讀分享',i:BookOpen},{k:'crafts',l:'手作靈感',i:Palette}].map((btn) => (
                    <button key={btn.k} onClick={() => { setFilter(btn.k as any); setVisibleCount(1); }} className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all border ${filter === btn.k ? 'bg-rose-800 text-white shadow-md' : 'bg-white text-stone-500 border-stone-200 hover:text-rose-600'}`}>
                        {btn.i && React.createElement(btn.i, { size: 16 })} {btn.l}
                    </button>
                ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visible.map(r => (
                    <div key={r.id} onClick={() => navigate(`/resources/${r.id}`)} className="group cursor-pointer flex flex-col h-full bg-rose-50/30 rounded-lg overflow-hidden hover:shadow-xl transition-all border border-transparent hover:border-rose-100">
                        <div className="relative h-64 overflow-hidden">
                            <img src={r.image} alt={r.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-serif font-bold text-stone-800 mb-3 group-hover:text-rose-700">{r.title}</h3>
                            <p className="text-stone-600 text-sm line-clamp-3 flex-grow">{r.summary}</p>
                            <div className="pt-4 mt-6 border-t border-rose-100 flex justify-between items-center">
                                <span className="text-rose-500 text-xs font-bold uppercase flex items-center gap-1">閱讀更多 <ArrowRight size={14} /></span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {visibleCount < filtered.length && (
                <div className="mt-20 flex flex-col items-center">
                    <button 
                      onClick={handleLoadMore} 
                      disabled={isExpanding}
                      className="flex flex-col items-center gap-4 group transition-all disabled:opacity-50"
                    >
                        <span className="text-[10px] font-bold tracking-[0.4em] text-stone-400 uppercase group-hover:text-rose-800 transition-colors">
                          {isExpanding ? '正在從雲端獲取...' : '閱讀更多分享內容'}
                        </span>
                        <div className="w-14 h-14 rounded-full bg-white border border-rose-100 flex items-center justify-center shadow-md shadow-rose-900/5 group-hover:shadow-xl group-hover:border-rose-300 group-hover:-translate-y-1 transition-all">
                            {isExpanding ? (
                                <Loader2 className="animate-spin text-rose-400" size={24} />
                            ) : (
                                <Plus size={24} className="text-rose-400 group-hover:rotate-90 transition-transform duration-500" />
                            )}
                        </div>
                    </button>
                </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Resources;