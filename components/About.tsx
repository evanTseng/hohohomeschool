import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Image Section */}
            <div className="relative fade-in">
                <div className="absolute top-4 left-4 w-full h-full border-2 border-rose-100 rounded-sm -z-10"></div>
                <img 
                    src="https://picsum.photos/id/433/800/1000" 
                    alt="Warm minimalism" 
                    className="w-full h-[500px] object-cover rounded-sm shadow-sm"
                />
            </div>

            {/* Text Section */}
            <div className="text-center md:text-left fade-in">
                <h1 className="text-4xl font-serif text-stone-800 mb-8">關於厚厚私塾</h1>
                <div className="w-16 h-1 bg-rose-300 mb-8 mx-auto md:mx-0"></div>
                
                <div className="space-y-6 text-lg font-light text-stone-600 leading-loose text-justify md:text-left">
                    <p>
                    「厚厚」是一種累積，也是一種溫度。
                    </p>
                    <p>
                    厚厚私塾由兩位設計系媽媽於 2021 年 7 月創立。
                    我們相信，育兒不是單向的教導，而是雙向的學習。
                    </p>
                    <p>
                    在這裡，我們提供慢養心得、閱讀分享、設計手作等資源，
                    希望讓這條育兒之路，因為有彼此的陪伴，而不再孤單。
                    </p>
                    <p>
                    我們期許這裡成為一個溫暖的角落，
                    讓每一位父母都能在這裡找到力量，
                    讓每一個孩子都能在愛與尊重中，慢慢長大。
                    </p>
                </div>

                <div className="mt-12">
                    <Link 
                        to="/founders" 
                        className="inline-flex items-center gap-3 px-8 py-3 bg-rose-800 text-white rounded-full hover:bg-rose-700 transition-all shadow-md hover:shadow-lg group"
                    >
                        <span className="tracking-widest">認識創辦人</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;