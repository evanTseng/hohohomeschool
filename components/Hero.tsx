import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/id/28/1920/1080" 
          alt="Peaceful nature" 
          className="w-full h-full object-cover"
        />
        {/* Changed overlay to warm rose tone */}
        <div className="absolute inset-0 bg-rose-900/20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50/10 via-transparent to-rose-50"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl px-6 fade-in mt-20">
        <h2 className="text-lg md:text-xl text-white drop-shadow-md tracking-[0.2em] mb-4 font-light">
          育兒之路，不再孤單
        </h2>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white drop-shadow-lg mb-8 leading-tight">
          分享孩子帶給我們的<br/>學習與共同體驗
        </h1>
        <p className="text-rose-50 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto drop-shadow-md">
          慢養心得 · 閱讀分享 · 設計手作
        </p>
        
        <div className="mt-16 flex justify-center">
          <Link to="/about" className="animate-bounce text-white/80 hover:text-white transition-colors">
            <ArrowDown size={32} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;