import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Founders from './components/Founders';
import Services from './components/Services';
import Resources from './components/Resources';
import AICompanion from './components/AICompanion';
import Management from './components/Management';
import Auth from './components/Auth';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { ContentProvider } from './context/ContentContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Fix: Changed JSX.Element to React.ReactNode to resolve "Cannot find namespace 'JSX'"
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-rose-200 mb-4"></div>
          <p className="text-stone-400 font-serif italic">載入中...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Fix: Use fragment to ensure children are returned correctly in all JSX environments
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <ContentProvider>
          <ScrollToTop />
          <div className="font-sans text-stone-700 bg-rose-50 selection:bg-rose-200 min-h-screen flex flex-col">
            <Header />
            
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/founders" element={<div className="pt-10"><Founders /></div>} />
                <Route path="/founders/:id" element={<div className="pt-10"><Founders /></div>} />
                <Route path="/services" element={<div className="pt-10"><Services /></div>} />
                <Route path="/services/:id" element={<div className="pt-10"><Services /></div>} />
                <Route path="/resources" element={<div className="pt-10"><Resources /></div>} />
                <Route path="/resources/:id" element={<div className="pt-10"><Resources /></div>} />
                <Route path="/ai-companion" element={<div className="pt-10"><AICompanion /></div>} />
                
                {/* Protected Management Route */}
                <Route path="/manage" element={
                  <RequireAuth>
                    <div className="pt-10"><Management /></div>
                  </RequireAuth>
                } />
              </Routes>
            </main>

            <Footer />
          </div>
        </ContentProvider>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;