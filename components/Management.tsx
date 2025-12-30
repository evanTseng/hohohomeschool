
import React, { useState, useEffect } from 'react';
import { PlusCircle, BookOpen, Heart, Palette, Save, CheckCircle2, ShieldAlert, Terminal, Play, Server, Code } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Management: React.FC = () => {
  const { addService, addResource } = useContent();
  const [activeTab, setActiveTab] = useState<'service' | 'resource' | 'security'>('service');
  const [showSuccess, setShowSuccess] = useState(false);

  // Form states
  const [serviceForm, setServiceForm] = useState({
    title: '',
    description: '',
    longDescription: '',
    details: '',
    fullImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1200',
    iconType: 'Palette'
  });

  const [resourceForm, setResourceForm] = useState({
    title: '',
    category: 'parenting' as 'parenting' | 'reading' | 'crafts',
    summary: '',
    content: '',
    image: 'https://picsum.photos/id/1060/800/600',
    author: '',
    tags: ''
  });

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addService({
        id: Date.now().toString(),
        title: serviceForm.title,
        description: serviceForm.description,
        longDescription: serviceForm.longDescription,
        fullImage: serviceForm.fullImage,
        details: serviceForm.details.split('\n').filter(d => d.trim()),
        iconType: serviceForm.iconType
      });
      setServiceForm({ title: '', description: '', longDescription: '', details: '', fullImage: serviceForm.fullImage, iconType: 'Palette' });
      triggerSuccess();
    } catch (err) {
      alert("請確保 Python 後端已啟動 (localhost:8000)");
    }
  };

  const handleResourceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addResource({
        title: resourceForm.title,
        category: resourceForm.category,
        summary: resourceForm.summary,
        content: resourceForm.content.split('\n').filter(p => p.trim()),
        image: resourceForm.image,
        author: resourceForm.author,
        tags: resourceForm.tags.split(',').map(t => t.trim()).filter(t => t)
      });
      setResourceForm({ title: '', category: 'parenting', summary: '', content: '', image: resourceForm.image, author: '', tags: '' });
      triggerSuccess();
    } catch (err) {
      alert("傳送失敗，請檢查 API 連線。");
    }
  };

  const triggerSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <section className="py-24 bg-rose-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-4">內容管理後台</h2>
          <p className="text-stone-500">此區域僅限創辦人 Iris 與 小霞 存取</p>
        </div>

        {showSuccess && (
          <div className="mb-8 bg-emerald-50 border border-emerald-200 text-emerald-700 px-6 py-4 rounded-xl flex items-center gap-3 animate-[slideIn_0.3s_ease-out]">
            <CheckCircle2 size={24} />
            <span className="font-medium">發佈成功！您的內容已經儲存至 Python 後端資料庫。</span>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-rose-100">
          {/* Tabs */}
          <div className="flex border-b border-rose-100 overflow-x-auto">
            <button onClick={() => setActiveTab('service')} className={`flex-1 min-w-[120px] py-5 text-sm font-medium tracking-widest uppercase transition-colors flex items-center justify-center gap-2 ${activeTab === 'service' ? 'bg-rose-50 text-rose-800 border-b-2 border-rose-500' : 'text-stone-400 hover:text-stone-600'}`}>
              <Heart size={18} /> 課程
            </button>
            <button onClick={() => setActiveTab('resource')} className={`flex-1 min-w-[120px] py-5 text-sm font-medium tracking-widest uppercase transition-colors flex items-center justify-center gap-2 ${activeTab === 'resource' ? 'bg-rose-50 text-rose-800 border-b-2 border-rose-500' : 'text-stone-400 hover:text-stone-600'}`}>
              <BookOpen size={18} /> 文章
            </button>
            <button onClick={() => setActiveTab('security')} className={`flex-1 min-w-[120px] py-5 text-sm font-medium tracking-widest uppercase transition-colors flex items-center justify-center gap-2 ${activeTab === 'security' ? 'bg-indigo-50 text-indigo-800 border-b-2 border-indigo-500' : 'text-stone-400 hover:text-stone-600'}`}>
              <ShieldAlert size={18} /> Python 伺服器狀態
            </button>
          </div>

          <div className="p-8 md:p-12">
            {activeTab === 'service' && (
              <form onSubmit={handleServiceSubmit} className="space-y-6">
                 {/* ... (表單欄位保持不變) ... */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-700">課程名稱</label>
                    <input required value={serviceForm.title} onChange={e => setServiceForm({ ...serviceForm, title: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-rose-100 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-700">圖示類型</label>
                    <select value={serviceForm.iconType} onChange={e => setServiceForm({ ...serviceForm, iconType: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-rose-100 outline-none">
                      <option value="Palette">藝術調色盤</option>
                      <option value="Heart">暖心教養</option>
                      <option value="Sprout">生命成長</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">詳細介紹</label>
                  <textarea required rows={4} value={serviceForm.longDescription} onChange={e => setServiceForm({ ...serviceForm, longDescription: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-rose-100 outline-none" />
                </div>
                <button type="submit" className="w-full py-4 bg-rose-800 text-white rounded-full font-bold tracking-widest flex items-center justify-center gap-2">
                  <Server size={20} /> 傳送至 Python 伺服器
                </button>
              </form>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8 animate-[fadeIn_0.4s_ease-out]">
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex gap-4">
                  <div className="p-3 bg-white rounded-full h-fit shadow-sm">
                    <Play className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-emerald-900 mb-1">如何啟動 Python 後端？</h4>
                    <p className="text-emerald-800 text-sm">請在您的終端機執行以下步驟，以啟用真實的 API 服務：</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-400 shrink-0 group-hover:bg-rose-100 group-hover:text-rose-600 transition-colors">1</div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-stone-800 mb-2">安裝必要套件</p>
                      <div className="bg-stone-900 rounded-xl p-4 text-rose-300 font-mono text-xs shadow-inner">
                        pip install fastapi uvicorn PyJWT passlib[bcrypt]
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-400 shrink-0 group-hover:bg-rose-100 group-hover:text-rose-600 transition-colors">2</div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-stone-800 mb-2">啟動 FastAPI 伺服器</p>
                      <div className="bg-stone-900 rounded-xl p-4 text-emerald-400 font-mono text-xs shadow-inner">
                        python main.py
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-400 shrink-0 group-hover:bg-rose-100 group-hover:text-rose-600 transition-colors">3</div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-stone-800 mb-2">驗證連線</p>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        啟動後，前端將會嘗試連線至 <code>http://localhost:8000</code>。您可以開啟瀏覽器查看 
                        <a href="http://localhost:8000/docs" target="_blank" className="text-rose-600 underline ml-1">Swagger 文件</a>。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-rose-100">
                  <div className="flex items-center gap-2 text-stone-400 mb-4">
                    <Code size={16} />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">API 端點一覽</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                    <div className="bg-stone-50 p-2 rounded border border-stone-100 text-stone-500">POST /api/v1/login</div>
                    <div className="bg-stone-50 p-2 rounded border border-stone-100 text-stone-500">GET /api/v1/services</div>
                    <div className="bg-stone-50 p-2 rounded border border-stone-100 text-stone-500">POST /api/v1/resources</div>
                    <div className="bg-stone-50 p-2 rounded border border-stone-100 text-stone-500">GET /api/v1/docs</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Management;
