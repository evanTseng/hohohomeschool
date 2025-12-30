import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || '登入失敗，請檢查您的資訊。');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-rose-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full animate-[fadeIn_0.5s_ease-out]">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm mb-4">
            <ShieldCheck className="text-rose-600" size={24} />
          </div>
          <h2 className="text-3xl font-serif text-stone-800 mb-2">
            管理員登入
          </h2>
          <p className="text-stone-500 font-light">
            請輸入管理員帳號以維護網站內容
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-rose-100">
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 text-sm rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">管理員信箱</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                <input
                  required
                  type="email"
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-rose-100 bg-white focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">存取密碼</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-rose-100 bg-white focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-stone-800 text-white rounded-full font-bold tracking-widest hover:bg-stone-900 transition-all flex items-center justify-center gap-2 shadow-lg shadow-stone-900/10 disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <><ArrowRight size={18} /> 登入管理後台</>}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-stone-50 text-center">
            <p className="text-stone-400 text-xs leading-loose">
              此區域僅供厚厚私塾管理人員使用。<br />一般使用者請返回首頁瀏覽。
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-stone-500 text-sm hover:text-rose-800 transition-colors"
          >
            ← 返回首頁
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;