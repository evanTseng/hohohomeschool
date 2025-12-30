import React from 'react';
import { Award, Palette, ArrowRight, ArrowLeft, Star, Quote } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

interface FounderDetail {
  id: string;
  name: string;
  role: string;
  shortDescription: string;
  image: string;
  tags: string[];
  philosophy: string;
  longBio: string[];
  expertise: string[];
  quote: string;
}

const foundersData: FounderDetail[] = [
  {
    id: 'iris',
    name: 'Iris',
    role: '正向教養講師',
    shortDescription: '設計系背景的媽媽，轉身投入親子教育。作為美國正向教養協會認證家長講師，Iris 致力於推廣溫和而堅定的育兒方式。',
    image: 'https://picsum.photos/id/64/800/1000', 
    tags: ['美國正向教養認證', '親子溝通', '慢養哲學'],
    quote: "育兒不只是養育孩子，更是重新養育自己的過程。",
    philosophy: "溫和且堅定 (Kind and Firm)",
    longBio: [
        "Iris 原本是一位平面設計師，習慣用像素與網格來建構世界。然而，成為母親後，她發現孩子的成長是無法被精確排版的。面對育兒初期的焦慮與衝突，她開始尋求答案，進而接觸了阿德勒心理學與正向教養。",
        "在取得美國正向教養協會（PDA）認證講師資格後，Iris 決定將設計思維融入教養中——觀察使用者的需求（看見孩子行為背後的動機），並設計出適合的解決方案（溫和而堅定的溝通）。",
        "她創立厚厚私塾，希望能陪伴更多父母練習「慢養」。她相信，當父母願意先安頓好自己的身心，就能更有力量地接住孩子的情緒。她的課程不只談技巧，更談關係的連結與修復。"
    ],
    expertise: [
        "美國正向教養協會 (PDA) 認證家長講師",
        "兒童情緒引導與調節",
        "阿德勒心理學應用",
        "親子溝通工作坊帶領人"
    ]
  },
  {
    id: 'xia',
    name: '小霞',
    role: '和諧粉彩指導師',
    shortDescription: '擁有敏銳美感的設計師與美術老師。身為日本和諧粉彩 JPHAA 正指導師，小霞喜歡捕捉大自然的細膩光影。',
    image: 'https://picsum.photos/id/104/800/1000', 
    tags: ['JPHAA 正指導師', '美術教育', '自然創作'],
    quote: "藝術沒有對錯，只有當下的感受與流動。",
    philosophy: "自然與療癒 (Nature and Healing)",
    longBio: [
        "小霞從小就熱愛在大自然中奔跑，收集落葉與石頭是她童年最快樂的記憶。設計系畢業後，她一直從事視覺創作相關工作，直到遇見了日本和諧粉彩（Pastel Nagomi Art），才真正找到了心靈的歸屬。",
        "她喜歡粉彩那種需要用手指直接塗抹的觸感，那是一種最直接的「心手合一」。她認為，在這個數位化的時代，孩子們更需要透過真實的觸覺體驗來認識世界。",
        "作為 JPHAA 正指導師，小霞的課程風格自由而充滿詩意。她不教孩子「畫得像」，而是引導孩子「畫出感覺」。她常帶著孩子走出教室，觀察天空的顏色、樹葉的脈絡，將大自然的風景化為創作靈感，讓藝術成為療癒心靈的途徑。"
    ],
    expertise: [
        "日本和諧粉彩 JPHAA 正指導師",
        "兒童美術創意引導",
        "自然素材與環保藝術創作",
        "成人靜心粉彩工作坊"
    ]
  }
];

const Founders: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- Detailed View (Individual Founder Page) ---
  if (id) {
    const founder = foundersData.find(f => f.id === id);

    if (!founder) {
       return (
        <div className="min-h-screen pt-32 pb-24 text-center bg-rose-50">
            <h2 className="text-2xl font-serif text-stone-800 mb-4">找不到這位講師</h2>
            <button onClick={() => navigate('/founders')} className="text-rose-600 underline">回到列表</button>
        </div>
       );
    }

    return (
        <article className="min-h-screen bg-white animate-[fadeIn_0.5s_ease-out]">
            {/* Header / Hero */}
            <div className="bg-rose-50 pt-24 pb-12 md:py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <button 
                        onClick={() => navigate('/founders')}
                        className="group flex items-center gap-2 text-stone-500 hover:text-rose-800 transition-colors mb-8"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="tracking-wide font-medium">回到講師列表</span>
                    </button>
                    
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                         {/* Image */}
                        <div className="w-full md:w-1/3 relative">
                            <div className="aspect-[3/4] rounded-t-[100px] rounded-b-lg overflow-hidden shadow-xl relative z-10">
                                <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute top-10 -left-6 w-full h-full border-2 border-rose-200 rounded-t-[100px] rounded-b-lg -z-0 hidden md:block"></div>
                        </div>

                        {/* Intro Text */}
                        <div className="w-full md:w-2/3">
                             <div className="flex items-center gap-4 mb-4">
                                <h1 className="text-4xl md:text-5xl font-serif text-stone-800 font-bold">{founder.name}</h1>
                                <span className="bg-white text-rose-800 px-3 py-1 rounded-full text-sm font-bold shadow-sm border border-rose-100 flex items-center gap-1">
                                    {founder.id === 'iris' ? <Award size={14}/> : <Palette size={14}/>}
                                    {founder.role}
                                </span>
                             </div>
                             
                             <div className="mb-8 flex flex-wrap gap-2">
                                {founder.tags.map(tag => (
                                    <span key={tag} className="text-stone-500 text-sm bg-stone-100 px-3 py-1 rounded-full">#{tag}</span>
                                ))}
                             </div>

                             <div className="relative p-8 bg-white rounded-lg shadow-sm border-l-4 border-rose-300 mb-8">
                                <Quote className="absolute top-4 left-4 text-rose-100 w-8 h-8 -z-0" />
                                <p className="text-xl md:text-2xl font-serif text-stone-700 italic relative z-10">
                                    {founder.quote}
                                </p>
                             </div>

                             <div className="space-y-4">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400">核心理念</h3>
                                <p className="text-lg text-rose-800 font-medium">{founder.philosophy}</p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Bio */}
                    <div className="md:col-span-2 space-y-8">
                        <h3 className="text-2xl font-serif text-stone-800 border-b border-rose-100 pb-4 mb-6">關於 {founder.name}</h3>
                        <div className="prose prose-stone prose-lg">
                            {founder.longBio.map((para, i) => (
                                <p key={i} className="text-stone-600 leading-loose text-justify">{para}</p>
                            ))}
                        </div>
                    </div>

                    {/* Expertise Sidebar */}
                    <div className="md:col-span-1">
                        <div className="bg-rose-50 p-8 rounded-lg sticky top-32">
                            <h3 className="text-lg font-serif font-bold text-stone-800 mb-6 flex items-center gap-2">
                                <Star size={18} className="text-rose-400" />
                                專業領域
                            </h3>
                            <ul className="space-y-4">
                                {founder.expertise.map((exp, i) => (
                                    <li key={i} className="flex items-start gap-3 text-stone-600 text-sm leading-relaxed">
                                        <div className="w-1.5 h-1.5 bg-rose-400 rounded-full mt-2 shrink-0"></div>
                                        {exp}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-10 border-t border-rose-100 text-center">
                    <p className="text-stone-500 mb-6">想了解更多課程或合作機會？</p>
                    <a href="mailto:hello@houhou.com" className="inline-block px-8 py-3 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors shadow-lg hover:shadow-xl">
                        聯絡我們
                    </a>
                </div>
            </div>
        </article>
    );
  }

  // --- List View (Default) ---
  return (
    <section id="founders" className="py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-4">兩位設計系媽媽</h2>
          <div className="w-16 h-1 bg-rose-300 mx-auto"></div>
          <p className="mt-6 text-stone-600 max-w-2xl mx-auto leading-relaxed">
            我們在 2021 年 7 月創立了厚厚私塾。我們相信，育兒不只是養育孩子，更是重新養育自己的過程。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {foundersData.map((founder, index) => (
            <div 
                key={founder.id} 
                onClick={() => navigate(`/founders/${founder.id}`)}
                className={`flex flex-col group cursor-pointer ${index % 2 !== 0 ? 'md:mt-12' : ''}`}
            >
              <div className="relative overflow-hidden rounded-sm mb-8 shadow-md">
                <img 
                  src={founder.image} 
                  alt={founder.name} 
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-rose-900/90 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-between items-center">
                  <p className="text-white text-sm tracking-wider">{founder.tags.slice(0, 2).join(' · ')}</p>
                  <span className="text-rose-200 text-xs flex items-center gap-1">詳細介紹 <ArrowRight size={12}/></span>
                </div>
              </div>
              
              <div className="px-2">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-3xl font-serif text-stone-800 group-hover:text-rose-800 transition-colors">{founder.name}</h3>
                  <span className="bg-rose-50 text-rose-800 text-xs px-2 py-1 rounded uppercase tracking-wider font-bold">
                    {founder.id === 'iris' ? <Award size={14} className="inline mr-1"/> : <Palette size={14} className="inline mr-1"/>}
                    {founder.role}
                  </span>
                </div>
                <p className="text-stone-600 leading-7 text-justify mb-4 line-clamp-3">
                  {founder.shortDescription}
                </p>
                <button className="text-rose-500 text-sm font-medium flex items-center gap-2 group/btn">
                    閱讀詳細介紹
                    <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Founders;