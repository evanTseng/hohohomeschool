import React from 'react';
import { Facebook, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-rose-950 text-rose-200 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-2xl font-serif text-white mb-6">厚厚私塾</h3>
          <p className="leading-relaxed mb-6 font-light text-rose-100/80">
            由兩位設計系媽媽創立，分享慢養心得、閱讀與設計手作。<br />
            讓我們一起在育兒路上，發現美好。
          </p>
        </div>
        
        <div className="md:text-center">
          <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-sm">Links</h4>
          <ul className="space-y-3 font-light flex flex-col">
            <li><Link to="/about" className="hover:text-white transition-colors">關於我們</Link></li>
            <li><Link to="/founders" className="hover:text-white transition-colors">講師介紹</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">課程服務</Link></li>
            <li><Link to="/resources" className="hover:text-white transition-colors">資源分享</Link></li>
            <li><Link to="/ai-companion" className="hover:text-white transition-colors">AI 諮詢</Link></li>
          </ul>
        </div>

        <div className="md:text-right">
          <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-sm">Contact</h4>
          <div className="flex flex-col md:items-end space-y-3 font-light">
             <a href="mailto:hello@houhou.com" className="flex items-center hover:text-white transition-colors gap-2">
               <Mail size={18} /> hello@houhou.com
             </a>
             <div className="flex gap-4 mt-4">
               <a href="#" className="hover:text-white transition-colors"><Facebook /></a>
               <a href="#" className="hover:text-white transition-colors"><Instagram /></a>
             </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-rose-900 text-center text-xs text-rose-300/60">
        © 2023-2024 Hou Hou Si Shu. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;