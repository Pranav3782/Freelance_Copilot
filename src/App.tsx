import React, { useState, useEffect } from 'react';
import { initialProfile, sampleProjects } from './data/mockData';
import { AppView, AICredentialStatus, FreelancerProfile, ProjectAnalysis } from './types';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { DashboardView } from './components/DashboardView';
import { AnalysisResultsView } from './components/AnalysisResultsView';
import { ProposalStrategyWorkspace } from './components/ProposalStrategyWorkspace';
import { FreelancerProfileView } from './components/FreelancerProfileView';
import { ApplicationTrackerView } from './components/ApplicationTrackerView';
import { HistoryView } from './components/HistoryView';
import { FollowUpDashboardView } from './components/FollowUpDashboardView';
import { AnalyzeModal } from './components/AnalyzeModal';
import { AuthPage } from './components/AuthPage';
import { Footer } from './components/Footer';
import { PageTransition } from './components/PageTransition';
import { AboutPage } from './components/AboutPage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { PrivacyPage } from './components/PrivacyPage';
import { TermsPage } from './components/TermsPage';
import { ContactPage } from './components/ContactPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LogOut } from 'lucide-react';
import { auth, db } from './lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, get, set } from 'firebase/database';
import { Toaster, toast } from 'sonner';
import { fetchAICredentialStatus, fetchUserProjects, fetchProjectById } from './lib/api';
import { useSubscription } from './hooks/useSubscription';

type AppViewType = AppView;

function getRouteFromUrl(): { view: AppViewType; projectId?: string } {
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
  const params = new URLSearchParams(window.location.search);
  const idFromQuery = params.get('id') || params.get('projectId');

  if (path.startsWith('/analysis/') || path.startsWith('/results/')) {
    const segments = path.split('/');
    const projId = segments[2] || idFromQuery;
    return { view: 'results', projectId: projId ? decodeURIComponent(projId) : undefined };
  }
  if (path.startsWith('/proposal/')) {
    const segments = path.split('/');
    const projId = segments[2] || idFromQuery;
    return { view: 'proposal', projectId: projId ? decodeURIComponent(projId) : undefined };
  }

  switch (path) {
    case '/follow-ups':
    case '/followup':
    case '/followups':
      return { view: 'follow-ups' };
    case '/dashboard':
    case '/overview':
      return { view: 'dashboard' };
    case '/tracker':
    case '/pipeline':
      return { view: 'tracker' };
    case '/history':
      return { view: 'history' };
    case '/profile':
      return { view: 'profile' };
    case '/results':
    case '/analysis':
      return { view: 'results', projectId: idFromQuery ? decodeURIComponent(idFromQuery) : undefined };
    case '/proposal':
      return { view: 'proposal', projectId: idFromQuery ? decodeURIComponent(idFromQuery) : undefined };
    case '/auth':
      return { view: 'auth' };
    case '/about':
      return { view: 'about' };
    case '/how-it-works':
      return { view: 'how-it-works' };
    case '/privacy':
      return { view: 'privacy' };
    case '/terms':
      return { view: 'terms' };
    case '/contact':
      return { view: 'contact' };
    case '':
    case '/':
    case '/landing':
    default:
      return { view: 'landing' };
  }
}

function getUrlPathForRoute(view: AppViewType, projectId?: string): string {
  switch (view) {
    case 'dashboard':
      return '/dashboard';
    case 'follow-ups':
      return '/follow-ups';
    case 'tracker':
      return '/tracker';
    case 'history':
      return '/history';
    case 'profile':
      return '/profile';
    case 'results':
      return projectId ? `/analysis/${encodeURIComponent(projectId)}` : '/results';
    case 'proposal':
      return projectId ? `/proposal/${encodeURIComponent(projectId)}` : '/proposal';
    case 'auth':
      return '/auth';
    case 'about':
      return '/about';
    case 'how-it-works':
      return '/how-it-works';
    case 'privacy':
      return '/privacy';
    case 'terms':
      return '/terms';
    case 'contact':
      return '/contact';
    case 'landing':
    default:
      return '/';
  }
}

export default function App() {
  const initialRoute = getRouteFromUrl();
  const [currentView, setCurrentView] = useState<AppViewType>(initialRoute.view);
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(initialRoute.projectId);

  const [profile, setProfile] = useState<FreelancerProfile>(initialProfile);
  const [projects, setProjects] = useState<ProjectAnalysis[]>(sampleProjects);
  const [selectedProject, setSelectedProject] = useState<ProjectAnalysis>(sampleProjects[0]);
  const [credentialStatus, setCredentialStatus] = useState<AICredentialStatus>({ connected: false });

  const [isAnalyzeModalOpen, setIsAnalyzeModalOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [projectLoadError, setProjectLoadError] = useState<string | null>(null);
  const { isPro } = useSubscription();

  const navigate = (view: AppViewType, projectId?: string) => {
    setCurrentView(view);
    if (projectId !== undefined) {
      setSelectedProjectId(projectId);
    }
    const newPath = getUrlPathForRoute(view, projectId || selectedProjectId);
    if (window.location.pathname !== newPath) {
      window.history.pushState({ view, projectId: projectId || selectedProjectId }, '', newPath);
    }
  };

  const goToAuth = () => navigate('auth');

  // Listen to browser popstate (back/forward button)
  useEffect(() => {
    const handlePopState = () => {
      const route = getRouteFromUrl();
      setCurrentView(route.view);
      if (route.projectId) {
        setSelectedProjectId(route.projectId);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const loadCredentialAndProjects = async () => {
    try {
      const status = await fetchAICredentialStatus();
      setCredentialStatus(status);

      const userProjs = await fetchUserProjects();
      if (userProjs && userProjs.length > 0) {
        setProjects(userProjs);
      }
    } catch (err) {
      console.warn('[App] Credential/Project load notice:', err);
    }
  };

  // Synchronize selected project by selectedProjectId
  useEffect(() => {
    if (!selectedProjectId) {
      if (projects.length > 0) {
        setSelectedProject(projects[0]);
      }
      return;
    }

    const found = projects.find((p) => p.id === selectedProjectId);
    if (found) {
      setSelectedProject(found);
      setProjectLoadError(null);
    } else if (isAuthenticated) {
      // Try loading individual project from backend to check ownership
      fetchProjectById(selectedProjectId).then((res) => {
        if (res.project) {
          setSelectedProject(res.project);
          setProjects((prev) => (prev.some((p) => p.id === res.project!.id) ? prev : [res.project!, ...prev]));
          setProjectLoadError(null);
        } else if (res.status === 403) {
          setProjectLoadError('FORBIDDEN');
        } else {
          setProjectLoadError('NOT_FOUND');
        }
      });
    }
  }, [selectedProjectId, projects, isAuthenticated]);

  // Monitor auth state natively
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const route = getRouteFromUrl();
      const PROTECTED_VIEWS: AppViewType[] = ['dashboard', 'follow-ups', 'tracker', 'history', 'profile', 'results', 'proposal', 'analyze'];

      if (user) {
        setIsAuthenticated(true);
        setIsAuthLoading(false);

        // Fetch profile and projects asynchronously in the background
        get(ref(db, `users/${user.uid}/profile`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              setProfile(snapshot.val());
            }
          })
          .catch(() => {
            // Profile fallback
          });

        loadCredentialAndProjects();

        if (route.view === 'auth') {
          navigate('dashboard');
        } else if (PROTECTED_VIEWS.includes(route.view)) {
          setCurrentView(route.view);
          if (route.projectId) {
            setSelectedProjectId(route.projectId);
          }
        }
      } else {
        setIsAuthenticated(false);
        setIsAuthLoading(false);
        setProfile(initialProfile);
        setCredentialStatus({ connected: false });

        if (PROTECTED_VIEWS.includes(route.view)) {
          navigate('auth');
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Ensure clean light-mode root state and clear any dark mode storage
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    try {
      localStorage.removeItem('freelanceos_theme');
    } catch {
      // ignore
    }
  }, []);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentView]);

  // Lock background scroll when logout dialog is open
  useEffect(() => {
    if (isLogoutConfirmOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isLogoutConfirmOpen]);

  // Prevent broken top state if 'analyze' is ever selected
  useEffect(() => {
    if (currentView === 'analyze') {
      setIsAnalyzeModalOpen(true);
      setCurrentView('dashboard');
    }
  }, [currentView]);

  // Handle Payment Callback Redirects
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success' || params.get('razorpay_payment_link_status') === 'paid') {
      window.history.replaceState({}, document.title, window.location.pathname);
      toast.success("🎉 You're now on Pro.", {
        description: "Your account has been upgraded successfully.",
        duration: 5000,
      });
      navigate('dashboard');
    } else if (params.get('payment') === 'cancelled' || params.get('payment') === 'failed') {
      window.history.replaceState({}, document.title, window.location.pathname);
      toast.error("Payment wasn't completed.", {
        description: "Your payment was cancelled or failed. Please try again.",
        duration: 5000,
      });
    }
  }, []);

  // Handlers
  const handleAnalysisComplete = (newAnalysis: ProjectAnalysis) => {
    setProjects([newAnalysis, ...projects]);
    setSelectedProject(newAnalysis);
    setSelectedProjectId(newAnalysis.id);
    navigate('results', newAnalysis.id);
  };

  const handleSelectProject = (target: ProjectAnalysis | string) => {
    const targetId = typeof target === 'string' ? target : target.id;
    setSelectedProjectId(targetId);
    const found = projects.find((p) => p.id === targetId) || (typeof target === 'object' ? target : null);
    if (found) {
      setSelectedProject(found);
    }
    navigate('results', targetId);
  };

  const handleUpdateStage = (projectId: string, newStage: ProjectAnalysis['applicationStage']) => {
    setProjects(
      projects.map((p) => {
        if (p.id === projectId) {
          return { ...p, applicationStage: newStage };
        }
        return p;
      })
    );
    if (selectedProject?.id === projectId) {
      setSelectedProject({ ...selectedProject, applicationStage: newStage });
    }
  };

  const handleUpdateProfile = async (updated: FreelancerProfile) => {
    setProfile(updated);
    
    const user = auth.currentUser;
    if (user) {
      try {
        await set(ref(db, `users/${user.uid}/profile`), updated);
      } catch (err) {
        console.error("Failed to save profile:", err);
      }
    }
  };

  const handleLogout = () => {
    setIsLogoutConfirmOpen(true);
  };

  const confirmLogout = async () => {
    try {
      await signOut(auth);
      navigate('landing');
      setIsLogoutConfirmOpen(false);
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const activeProject = selectedProject || projects[0];

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden relative bg-[#F7F7F5] text-[#050505] flex flex-col font-sans selection:bg-[#FFD51F] selection:text-[#050505]">
      {/* Universal Toaster */}
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#050505',
            color: '#F7F7F5',
            border: '2px solid #050505',
            boxShadow: '4px 4px 0px #050505',
            borderRadius: '16px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold',
          },
          success: {
            style: {
              background: '#4DBA76',
              color: '#ffffff',
              border: '2px solid #050505',
              boxShadow: '4px 4px 0px #050505',
            },
          },
          error: {
            style: {
              background: '#F05D5E',
              color: '#ffffff',
              border: '2px solid #050505',
              boxShadow: '4px 4px 0px #050505',
            },
          },
        } as any} 
      />

      {/* Universal Top Navigation — hidden on auth, about, how-it-works, privacy, terms & contact pages */}
      {/* Universal Top Navigation — hidden on auth, about, how-it-works, privacy, terms & contact pages */}
      {!['auth', 'about', 'how-it-works', 'privacy', 'terms', 'contact'].includes(currentView) && (
        <Navbar
          currentView={currentView}
          onNavigate={(v) => navigate(v as AppViewType)}
          profile={profile}
          onOpenAuth={goToAuth}
          onOpenAnalyzeModal={() => setIsAnalyzeModalOpen(true)}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          credentialStatus={credentialStatus}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1 relative">
        {isAuthLoading && !['landing', 'about', 'how-it-works', 'privacy', 'terms', 'contact', 'auth'].includes(currentView) ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
            <div className="w-10 h-10 border-4 border-[#050505] border-t-[#6F86F5] rounded-full animate-spin" />
            <p className="text-sm font-black text-[#050505]/70">Loading workspace session...</p>
          </div>
        ) : (
          <>
            {currentView === 'auth' && (
              <AuthPage
                onSuccess={() => {
                  setIsAuthenticated(true);
                  navigate('dashboard');
                }}
                onBack={() => navigate('landing')}
              />
            )}

            {currentView === 'landing' && (
              <PageTransition viewKey="landing">
                <LandingPage
                  onAnalyzeClick={() => setIsAnalyzeModalOpen(true)}
                  isAuthenticated={isAuthenticated}
                  isPro={isPro}
                  onGoToDashboard={() => navigate('dashboard')}
                  onOpenDashboard={() => {
                    if (isAuthenticated) {
                      navigate('dashboard');
                    } else {
                      goToAuth();
                    }
                  }}
                  onOpenAuth={goToAuth}
                />
              </PageTransition>
            )}

            {currentView === 'about' && (
              <PageTransition viewKey="about">
                <AboutPage onBack={() => navigate('landing')} />
              </PageTransition>
            )}

            {currentView === 'how-it-works' && (
              <PageTransition viewKey="how-it-works">
                <HowItWorksPage 
                  onBack={() => navigate('landing')}
                  onOpenAnalyzeModal={() => setIsAnalyzeModalOpen(true)} 
                />
              </PageTransition>
            )}

            {currentView === 'privacy' && (
              <PageTransition viewKey="privacy">
                <PrivacyPage onBack={() => navigate('landing')} />
              </PageTransition>
            )}

            {currentView === 'terms' && (
              <PageTransition viewKey="terms">
                <TermsPage onBack={() => navigate('landing')} />
              </PageTransition>
            )}

            {currentView === 'contact' && (
              <PageTransition viewKey="contact">
                <ContactPage onBack={() => navigate('landing')} />
              </PageTransition>
            )}

            {currentView === 'dashboard' && (
              <ErrorBoundary fallbackTitle="Overview Error">
                <DashboardView
                  profile={profile}
                  projects={projects}
                  isPro={isPro}
                  onOpenAnalyzeModal={() => setIsAnalyzeModalOpen(true)}
                  onSelectProject={handleSelectProject}
                  onNavigateToTracker={() => navigate('tracker')}
                  onNavigateToHistory={() => navigate('history')}
                />
              </ErrorBoundary>
            )}

            {currentView === 'results' && (
              projectLoadError === 'FORBIDDEN' ? (
                <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
                  <div className="p-8 rounded-[32px] bg-white border-2 border-[#050505] shadow-retro space-y-4">
                    <h2 className="text-xl font-black text-[#F05D5E]">Access Denied</h2>
                    <p className="text-xs font-semibold text-[#050505]/70">
                      You do not have permission to access this project analysis.
                    </p>
                    <button
                      onClick={() => navigate('dashboard')}
                      className="px-5 py-3 rounded-2xl bg-[#6F86F5] text-white font-black text-xs border-2 border-[#050505] shadow-retro btn-tactile cursor-pointer"
                    >
                      Return to Overview
                    </button>
                  </div>
                </div>
              ) : activeProject ? (
                <AnalysisResultsView
                  analysis={activeProject}
                  onBack={() => navigate('dashboard')}
                  onOpenProposal={() => navigate('proposal', activeProject.id)}
                  onUpdateStage={(stage) => handleUpdateStage(activeProject.id, stage)}
                />
              ) : (
                <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
                  <div className="p-8 rounded-[32px] bg-white border-2 border-[#050505] shadow-retro space-y-4">
                    <h2 className="text-xl font-black text-[#050505]">Analysis Not Found</h2>
                    <p className="text-xs font-semibold text-[#050505]/70">
                      Select a project from your Overview, Pipeline, or History to view its complete analysis report.
                    </p>
                    <button
                      onClick={() => navigate('dashboard')}
                      className="px-5 py-3 rounded-2xl bg-[#6F86F5] text-white font-black text-xs border-2 border-[#050505] shadow-retro btn-tactile cursor-pointer"
                    >
                      Return to Overview
                    </button>
                  </div>
                </div>
              )
            )}

            {currentView === 'proposal' && (
              activeProject ? (
                <ProposalStrategyWorkspace
                  analysis={activeProject}
                  onBack={() => navigate('results', activeProject.id)}
                  onSaveToPipeline={() => {
                    handleUpdateStage(activeProject.id, 'Reached');
                    navigate('tracker');
                  }}
                />
              ) : (
                <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
                  <div className="p-8 rounded-[32px] bg-white border-2 border-[#050505] shadow-retro space-y-4">
                    <h2 className="text-xl font-black text-[#050505]">No Proposal Strategy Available</h2>
                    <p className="text-xs font-semibold text-[#050505]/70">
                      Select an analyzed project to open its proposal workspace.
                    </p>
                    <button
                      onClick={() => navigate('dashboard')}
                      className="px-5 py-3 rounded-2xl bg-[#FFD51F] text-[#050505] font-black text-xs border-2 border-[#050505] shadow-retro btn-tactile cursor-pointer"
                    >
                      Return to Dashboard
                    </button>
                  </div>
                </div>
              )
            )}

            {currentView === 'profile' && (
              <FreelancerProfileView
                profile={profile}
                onUpdateProfile={handleUpdateProfile}
                onNavigateToAnalyze={() => setIsAnalyzeModalOpen(true)}
                onLogout={handleLogout}
                credentialStatus={credentialStatus}
                onRefreshCredentialStatus={loadCredentialAndProjects}
              />
            )}

            {currentView === 'tracker' && (
              <ApplicationTrackerView
                projects={projects}
                onSelectProject={handleSelectProject}
                onUpdateStage={handleUpdateStage}
                onAnalyzeNew={() => setIsAnalyzeModalOpen(true)}
              />
            )}

            {currentView === 'history' && (
              <ErrorBoundary fallbackTitle="History Error">
                <HistoryView
                  projects={projects}
                  onSelectProject={handleSelectProject}
                  onAnalyzeNew={() => setIsAnalyzeModalOpen(true)}
                />
              </ErrorBoundary>
            )}

            {currentView === 'follow-ups' && (
              <ErrorBoundary fallbackTitle="Follow-ups Error">
                <FollowUpDashboardView
                  onSelectProject={handleSelectProject}
                  onNavigateToProposal={(proj) => {
                    setSelectedProject(proj);
                    setSelectedProjectId(proj.id);
                    navigate('proposal', proj.id);
                  }}
                  onOpenAnalyzeModal={() => setIsAnalyzeModalOpen(true)}
                />
              </ErrorBoundary>
            )}
          </>
        )}
      </main>

      {/* Global Footer (Only on marketing & information pages) */}
      {['landing', 'about', 'how-it-works', 'privacy', 'terms', 'contact'].includes(currentView) && (
        <Footer 
          onNavigate={setCurrentView}
          onOpenAnalyzeModal={() => setIsAnalyzeModalOpen(true)}
          isAuthenticated={isAuthenticated}
        />
      )}

      {/* Global Modals */}
      <AnalyzeModal
        isOpen={isAnalyzeModalOpen}
        onClose={() => setIsAnalyzeModalOpen(false)}
        onAnalysisComplete={handleAnalysisComplete}
        profile={profile}
        credentialStatus={credentialStatus}
        onRefreshCredentialStatus={loadCredentialAndProjects}
      />


      {isLogoutConfirmOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsLogoutConfirmOpen(false)}
        >
          <div
            className="relative w-full max-w-sm bg-white rounded-[32px] border-2 border-[#050505] shadow-retro-lg p-6 sm:p-8 text-[#050505] text-center space-y-6 animate-in slide-in-from-top duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-3xl bg-[#FFF39A] border-2 border-[#050505] flex items-center justify-center mx-auto shadow-retro-sm">
              <LogOut className="w-8 h-8 text-[#050505]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#050505] tracking-tight">Ready to leave?</h3>
              <p className="text-sm text-[#050505]/75 font-semibold mt-2">Are you sure you want to log out of your Copilot workspace?</p>
            </div>
            <div className="flex items-center gap-3 w-full pt-2">
              <button
                onClick={() => setIsLogoutConfirmOpen(false)}
                className="flex-1 py-3.5 rounded-xl border-2 border-[#050505] bg-white hover:bg-[#F7F7F5] text-sm font-black text-[#050505] shadow-retro-sm btn-tactile cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 py-3.5 rounded-xl border-2 border-[#050505] bg-[#F05D5E] hover:bg-[#D94F50] text-white text-sm font-black shadow-retro-sm btn-tactile cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
