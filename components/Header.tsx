import React, { useState, useEffect } from 'react';
import { Menu, X, Settings, LogOut, User as UserIcon, LogIn, Shield } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '關於我們', path: '/about' },
    { name: '講師介紹', path: '/founders' },
    { name: '課程與分享', path: '/services' },
    { name: '資源分享', path: '/resources' },
    { name: '厚厚小幫手', path: '/ai-companion' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const LogoText = () => (
    <span className="font-serif font-bold tracking-widest">
      <span className="text-rose-950">厚</span>
      <span className="text-stone-500">厚</span>
      <span className="text-rose-800">私</span>
      <span className="text-stone-700">塾</span>
    </span>
  );

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl md:text-3xl hover:opacity-80 transition-opacity">
          <LogoText />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-4 py-2 rounded-full text-xs xl:text-sm tracking-[0.1em] xl:tracking-[0.15em] font-serif transition-all duration-300 flex items-center ${
                isActive(link.path) 
                  ? 'text-rose-900 bg-rose-100/60 font-medium' 
                  : 'text-stone-500 hover:text-rose-800 hover:bg-rose-50/50' 
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Auth Section */}
          <div className="ml-4 pl-4 border-l border-stone-200 flex items-center gap-2">
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 rounded-full border-2 border-rose-100 overflow-hidden hover:border-rose-300 transition-colors shadow-sm flex items-center justify-center bg-stone-100"
                >
                  <img src={user?.avatar} alt={user?.name} className="w-full h-full object-cover" />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-54 bg-white rounded-2xl shadow-xl border border-rose-50 py-2 animate-[fadeIn_0.2s_ease-out]">
                    <div className="px-4 py-2 border-b border-stone-50 mb-1 flex items-center gap-3">
                      <Shield className="text-rose-600 shrink-0" size={16} />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-stone-800 truncate">{user?.name}</p>
                        <p className="text-[10px] text-stone-400 truncate">{user?.email}</p>
                      </div>
                    </div>
                    <Link 
                      to="/manage" 
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full text-left px-4 py-2 text-sm text-stone-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                    >
                      <Settings size={14} /> 內容管理
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                    >
                      <LogOut size={14} /> 登出系統
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="px-5 py-2 rounded-full bg-stone-800 text-white text-xs xl:text-sm font-bold tracking-widest hover:bg-stone-700 transition-all flex items-center gap-2"
              >
                <Shield size={14} /> 管理員登入
              </Link>
            )}
          </div>
        </nav>

        <button 
          className="lg:hidden text-rose-900/80 hover:text-rose-900 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div 
        className={`lg:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-sm transition-transform duration-500 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '0', height: '100vh' }}
      >
          <div className="flex flex-col h-full justify-center items-center space-y-6 p-8 relative">
            <button 
                className="absolute top-8 right-6 text-rose-900"
                onClick={() => setIsMobileMenuOpen(false)}
            >
                <X size={32} />
            </button>

            <Link to="/" className="text-3xl mb-8" onClick={() => setIsMobileMenuOpen(false)}>
              <LogoText />
            </Link>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xl font-serif tracking-widest transition-colors ${
                  isActive(link.path) 
                    ? 'text-rose-800 font-medium border-b border-rose-300 pb-1' 
                    : 'text-stone-500 hover:text-rose-800'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="flex flex-col items-center gap-4 pt-6 border-t border-stone-100 w-full max-w-[200px]">
                <Link 
                  to="/manage" 
                  className="text-stone-600 text-lg font-serif" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  內容管理
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-rose-600 text-lg font-serif"
                >
                  登出系統
                </button>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="mt-6 px-10 py-3 bg-stone-800 text-white rounded-full font-bold tracking-widest flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Shield size={18} /> 管理員登入
              </Link>
            )}
          </div>
      </div>
    </header>
  );
};

export default Header;