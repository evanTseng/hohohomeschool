import React from 'react';
import Hero from './Hero';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      
      {/* About Teaser Section */}
      <section className="bg-rose-50 py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 md:order-1">
             <div className="absolute top-6 left-6 w-full h-full border-2 border-rose-200 rounded-sm"></div>
             <img 
               src="https://picsum.photos/id/65/800/600" 
               alt="Warm interaction" 
               className="relative z-10 w-full h-[400px] object-cover rounded-sm shadow-md"
             />
          </div>
          <div className="md:pl-10 order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-6">關於我們</h2>
            <h3 className="text-xl text-rose-800 mb-6 font-light">Iris & 小霞</h3>
            <div className="w-12 h-1 bg-rose-300 mb-8"></div>
            <p className="text-stone-600 leading-relaxed mb-8 text-justify">
              我們是兩位設計系媽媽，也是彼此育兒路上的好夥伴。
              Iris 專注於正向教養，相信溫柔堅持的力量能化解親子衝突；
              小霞熱愛和諧粉彩，擅長捕捉大自然的光影，用色彩療癒人心。
              我們結合各自的專業，創立了厚厚私塾，
              期盼能與更多家庭分享這份溫暖與美好，一起在慢養中成長。
            </p>
            <Link 
              to="/about" 
              className="inline-flex items-center gap-2 text-stone-800 border-b border-stone-800 pb-1 hover:text-rose-600 hover:border-rose-600 transition-all group"
            >
              認識更多 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;