import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  LayoutDashboard,
  FileSearch,
  User,
  Kanban,
  History,
  Clock,
  Menu,
  X,
  PlusCircle,
  Zap,
  LogOut,
} from 'lucide-react';
import { FreelancerProfile, AICredentialStatus, AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  profile: FreelancerProfile;
  onOpenAuth: () => void;
  onOpenAnalyzeModal: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
  credentialStatus?: AICredentialStatus;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  profile,
  onOpenAuth,
  onOpenAnalyzeModal,
  isAuthenticated,
  onLogout,
  credentialStatus = { connected: false } as AICredentialStatus,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const APP_VIEWS = ['dashboard', 'analyze', 'results', 'proposal', 'profile', 'tracker', 'history', 'follow-ups'];
  const isAppView = APP_VIEWS.includes(currentView);

  // Apply scroll styles only on landing page; app view always solid
  const headerStyles = (!isAppView && !scrolled)
    ? 'bg-transparent border-transparent'
    : 'bg-white/95 backdrop-blur-md border-[#050505] shadow-retro-sm';

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1 }}
      className={`sticky top-0 z-40 w-full border-b-2 transition-all duration-300 left-0 right-0 ${headerStyles}`}
    >
      <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-4 lg:gap-6 transition-all duration-300 ${(!isAppView && !scrolled) ? 'h-24' : 'h-20'}`}>
        {/* Logo */}
        <div
          onClick={() => onNavigate(isAuthenticated ? 'dashboard' : 'landing')}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#6F86F5] text-white flex items-center justify-center border-2 border-[#050505] shadow-retro-sm group-hover:scale-105 group-hover:-rotate-2 transition-transform duration-200 shrink-0">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#050505]">FreelanceOS</span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-[#FFD51F] text-[#050505] rounded-full border-2 border-[#050505] shadow-retro-sm">
                Copilot AI
              </span>
            </div>
            <span className="text-[11px] font-bold text-[#050505]/70 -mt-1 hidden xl:block">
              Opportunity Intelligence Platform
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links with Balanced Spacing */}
        {!isAppView ? (
          <nav className="hidden lg:flex items-center gap-2 xl:gap-6 text-sm font-bold text-[#050505]">
            <button
              onClick={() => {
                const el = document.getElementById('how-it-works');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-2 rounded-xl hover:bg-[#FFF39A] transition-colors cursor-pointer whitespace-nowrap"
            >
              How It Works
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('features');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-2 rounded-xl hover:bg-[#FFF39A] transition-colors cursor-pointer whitespace-nowrap"
            >
              Features
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('bento-preview');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-2 rounded-xl hover:bg-[#FFF39A] transition-colors cursor-pointer whitespace-nowrap"
            >
              Intelligence Preview
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('pricing');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-2 rounded-xl hover:bg-[#FFF39A] transition-colors cursor-pointer whitespace-nowrap"
            >
              Pricing
            </button>
          </nav>
        ) : (
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-sm">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                currentView === 'dashboard'
                  ? 'bg-[#FFD51F] text-[#050505] border-2 border-[#050505] shadow-retro-sm'
                  : 'text-[#050505] hover:bg-[#FFF39A]/60 font-bold'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Overview
            </button>

            <button
              onClick={() => onNavigate('follow-ups')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                currentView === 'follow-ups'
                  ? 'bg-[#4DCA85] text-[#050505] border-2 border-[#050505] shadow-retro-sm'
                  : 'text-[#050505] hover:bg-[#FFF39A]/60 font-bold'
              }`}
            >
              <Clock className="w-4 h-4" />
              Follow-ups
            </button>

            <button
              onClick={() => onNavigate('tracker')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                currentView === 'tracker'
                  ? 'bg-[#F2A4DE] text-[#050505] border-2 border-[#050505] shadow-retro-sm'
                  : 'text-[#050505] hover:bg-[#FFF39A]/60 font-bold'
              }`}
            >
              <Kanban className="w-4 h-4" />
              Pipeline
            </button>
            <button
              onClick={() => onNavigate('history')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                currentView === 'history'
                  ? 'bg-[#CDB3F4] text-[#050505] border-2 border-[#050505] shadow-retro-sm'
                  : 'text-[#050505] hover:bg-[#FFF39A]/60 font-bold'
              }`}
            >
              <History className="w-4 h-4" />
              History
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                currentView === 'profile'
                  ? 'bg-[#FFF39A] text-[#050505] border-2 border-[#050505] shadow-retro-sm'
                  : 'text-[#050505] hover:bg-[#FFF39A]/60 font-bold'
              }`}
            >
              <User className="w-4 h-4" />
              Profile
              <span className="w-2 h-2 rounded-full bg-[#4DBA76] border border-[#050505]" />
            </button>
          </nav>
        )}

        {/* Right CTA Actions with Balanced Spacing */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          {isAppView ? (
            <>
              <button
                onClick={onOpenAnalyzeModal}
                className="hidden sm:flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#6F86F5] hover:bg-[#536CE8] text-white font-extrabold text-xs border-2 border-[#050505] shadow-retro-sm btn-tactile cursor-pointer whitespace-nowrap"
              >
                <PlusCircle className="w-4 h-4 text-white" />
                Analyze Project
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-[#F05D5E] hover:text-white text-xs font-black text-[#050505] border-2 border-[#050505] shadow-retro-sm btn-tactile transition-all cursor-pointer whitespace-nowrap shrink-0"
                title="Log out and return to home page"
              >
                <LogOut className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            </>
          ) : (
            <>
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#FFD51F] text-[#050505] font-black text-xs border-2 border-[#050505] shadow-retro-sm hover:bg-[#FFE352] transition-all btn-tactile cursor-pointer whitespace-nowrap"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </button>
                  <button
                    onClick={onLogout}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-[#F05D5E] hover:text-white text-xs font-black text-[#050505] border-2 border-[#050505] shadow-retro-sm btn-tactile transition-all cursor-pointer whitespace-nowrap shrink-0"
                    title="Log out and return to home page"
                  >
                    <LogOut className="w-3.5 h-3.5 shrink-0" />
                    <span className="hidden sm:inline">Log Out</span>
                  </button>
                </>
              ) : (
                <>

                  <button
                    onClick={() => {
                      onOpenAuth();
                    }}
                    className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#050505] text-white font-black text-xs border-2 border-[#050505] shadow-retro-sm hover:bg-[#6F86F5] hover:text-[#050505] transition-all btn-tactile cursor-pointer whitespace-nowrap"
                  >
                    <Zap className="w-4 h-4 fill-current text-[#FFD51F]" />
                    Open Copilot
                  </button>
                </>
              )}
            </>
          )}

          {/* Mobile Menu Toggle - visible below lg */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#FFFFFF] border-2 border-[#050505] shadow-retro-sm text-[#050505] cursor-pointer shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer - visible below lg */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFFFF] border-b-2 border-[#050505] px-4 pt-3 pb-6 space-y-2.5 shadow-retro-lg animate-in slide-in-from-top duration-200">
          {isAppView ? (
            <>
              <button
                onClick={() => {
                  onNavigate('dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-black text-sm border-2 ${
                  currentView === 'dashboard'
                    ? 'bg-[#FFD51F] text-[#050505] border-[#050505] shadow-retro-sm'
                    : 'text-[#050505] border-transparent hover:bg-[#FFF39A]'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard Overview
              </button>
              <button
                onClick={() => {
                  onNavigate('follow-ups');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-black text-sm border-2 ${
                  currentView === 'follow-ups'
                    ? 'bg-[#4DCA85] text-[#050505] border-[#050505] shadow-retro-sm'
                    : 'text-[#050505] border-transparent hover:bg-[#FFF39A]'
                }`}
              >
                <Clock className="w-4 h-4" />
                Client Follow-ups
              </button>
              <button
                onClick={() => {
                  onOpenAnalyzeModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-black text-sm border-2 text-[#050505] border-transparent hover:bg-[#FFF39A]"
              >
                <FileSearch className="w-4 h-4 text-[#6F86F5]" />
                Analyze Project
              </button>
              <button
                onClick={() => {
                  onNavigate('tracker');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-black text-sm border-2 ${
                  currentView === 'tracker'
                    ? 'bg-[#F2A4DE] text-[#050505] border-[#050505] shadow-retro-sm'
                    : 'text-[#050505] border-transparent hover:bg-[#FFF39A]'
                }`}
              >
                <Kanban className="w-4 h-4" />
                Application Pipeline
              </button>
              <button
                onClick={() => {
                  onNavigate('history');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-black text-sm border-2 ${
                  currentView === 'history'
                    ? 'bg-[#CDB3F4] text-[#050505] border-[#050505] shadow-retro-sm'
                    : 'text-[#050505] border-transparent hover:bg-[#FFF39A]'
                }`}
              >
                <History className="w-4 h-4" />
                History & Insights
              </button>
              <button
                onClick={() => {
                  onNavigate('profile');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-black text-sm border-2 ${
                  currentView === 'profile'
                    ? 'bg-[#FFF39A] text-[#050505] border-[#050505] shadow-retro-sm'
                    : 'text-[#050505] border-transparent hover:bg-[#FFF39A]'
                }`}
              >
                <User className="w-4 h-4" />
                Freelancer Profile
              </button>
              <div className="pt-3 border-t-2 border-[#050505] space-y-2">
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white hover:bg-[#F05D5E] hover:text-white text-xs font-black text-[#050505] border-2 border-[#050505] shadow-retro-sm btn-tactile transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out (Redirect to Home)</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  const el = document.getElementById('how-it-works');
                  el?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 font-black text-sm text-[#050505]"
              >
                How It Works
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('features');
                  el?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 font-black text-sm text-[#050505]"
              >
                Features
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('pricing');
                  el?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 font-black text-sm text-[#050505]"
              >
                Pricing
              </button>
              <div className="pt-3 flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => {
                        onNavigate('dashboard');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-2.5 rounded-xl bg-[#FFD51F] text-[#050505] font-black text-sm border-2 border-[#050505] shadow-retro-sm flex items-center justify-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-2.5 rounded-xl bg-white hover:bg-[#F05D5E] hover:text-white text-[#050505] font-black text-sm border-2 border-[#050505] shadow-retro-sm flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </>
                ) : (
                  <>

                    <button
                      onClick={() => {
                        onOpenAuth();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-2.5 rounded-xl bg-[#050505] text-white font-black text-sm border-2 border-[#050505] shadow-retro-sm"
                    >
                      Launch App
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </motion.header>
  );
};
