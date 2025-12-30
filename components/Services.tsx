import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, ChevronDown, CheckCircle, Plus } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const Services: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { services } = useContent();
  // 調整為 1，讓您在只有 2 筆資料時也能看到加載按鈕
  const [visibleCount, setVisibleCount] = useState(1);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, services.length));
  };

  if (id) {
    const service = services.find(s => s.id === id);
    if (!service) {
      return (
        <div className="min-h-screen pt-32 pb-24 text-center bg-rose-50">
            <h2 className="text-2xl font-serif text-stone-800 mb-4">找不到此項目</h2>
            <button onClick={() => navigate('/services')} className="text-rose-600 underline">回到列表</button>
        </div>
      );
    }

    return (
      <article className="min-h-screen bg-white animate-[fadeIn_0.5s_ease-out]">
         <div className="w-full h-[40vh] md:h-[50vh] relative">
            <img src={service.fullImage} alt={service.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-stone-900/40"></div>
            <div className="absolute top-28 left-6 md:left-12 z-20">
                 <button onClick={() => navigate('/services')} className="flex items-center gap-2 text-white/90 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-black/40 transition-all">
                    <ArrowLeft size={18} /> <span className="text-sm font-medium">回到列表</span>
                </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-stone-900/80 to-transparent">
                <div className="max-w-4xl mx-auto flex items-end gap-6">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl hidden md:flex text-rose-200 border border-white/20">
                         {React.cloneElement(service.icon as React.ReactElement<any>, { size: 48 })}
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-serif text-white font-bold leading-tight drop-shadow-lg mb-2">{service.title}</h1>
                        <p className="text-rose-100 text-lg opacity-90">{service.description}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="prose prose-stone prose-lg max-w-none">
                <p className="lead text-xl text-stone-600 font-serif italic mb-10 pl-6 border-l-4 border-rose-300">{service.longDescription}</p>
                <div className="bg-rose-50 rounded-2xl p-8 md:p-12 mt-12">
                    <h3 className="text-2xl font-serif font-bold text-stone-800 mb-8 flex items-center gap-3">內容包含</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {service.details.map((detail, index) => (
                            <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-rose-100 hover:shadow-md transition-shadow">
                                <CheckCircle size={24} className="text-rose-400 shrink-0 mt-0.5" />
                                <span className="text-stone-700 font-medium">{detail}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </article>
    );
  }

  const visibleServices = services.slice(0, visibleCount);
  return (
    <section id="services" className="py-24 bg-rose-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-4">我們分享的事物</h2>
          <div className="w-16 h-1 bg-rose-300 mx-auto mb-6"></div>
          <p className="text-stone-600 max-w-2xl mx-auto">點擊下方項目，了解我們如何將設計與教育融入生活。</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {visibleServices.map((service) => (
            <div key={service.id} onClick={() => navigate(`/services/${service.id}`)} className="bg-white p-8 rounded-sm shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer h-full flex flex-col">
              <div className="mb-6 p-4 bg-rose-50 rounded-full w-20 h-20 flex items-center justify-center group-hover:bg-rose-100 transition-colors text-rose-400">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-stone-800 mb-3 group-hover:text-rose-700">{service.title}</h3>
              <p className="text-stone-600 text-sm flex-grow">{service.description}</p>
              <div className="flex items-center text-rose-300 text-xs font-bold uppercase mt-6 group-hover:text-rose-800">
                查看內容 <ArrowRight size={14} className="ml-2 group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
        
        {/* 載入更多：優雅的圓形圖示按鈕 */}
        {visibleCount < services.length && (
            <div className="mt-20 flex flex-col items-center">
                <button 
                  onClick={handleLoadMore} 
                  className="flex flex-col items-center gap-4 group transition-all"
                >
                    <span className="text-[10px] font-bold tracking-[0.4em] text-stone-400 uppercase group-hover:text-rose-800 transition-colors">
                      繼續加載更多課程
                    </span>
                    <div className="w-14 h-14 rounded-full bg-white border border-rose-100 flex items-center justify-center shadow-md shadow-rose-900/5 group-hover:shadow-xl group-hover:border-rose-300 group-hover:-translate-y-1 transition-all">
                        <Plus size={24} className="text-rose-400 group-hover:rotate-90 transition-transform duration-500" />
                    </div>
                </button>
            </div>
        )}
      </div>
    </section>
  );
};

export default Services;