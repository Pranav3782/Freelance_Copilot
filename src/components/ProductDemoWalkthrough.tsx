import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  DollarSign,
  FileText,
  Clock,
  ChevronRight,
  MousePointer,
  Layers,
  Award,
  HelpCircle,
  BarChart3,
  TrendingUp,
  Check,
  Copy,
} from 'lucide-react';
import { ScoreRing } from './ScoreRing';

// Fictional, isolated demo dataset
const DEMO_STORY = {
  clientName: 'Acme Technologies Inc.',
  projectTitle: 'Senior React/Next.js Engineer — Modern SaaS Dashboard',
  statedBudget: '$1,500 – $2,500',
  technologies: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Node.js'],
  matchScore: 86,
  recommendation: 'APPLY',
  suggestedMin: 2000,
  suggestedMax: 2400,
};

const SCENES = [
  {
    id: 'input',
    title: '1. Opportunity Input',
    caption: 'Paste or import any freelance job description or client message.',
    duration: 3500,
  },
  {
    id: 'scanning',
    title: '2. Deep AI Analysis',
    caption: 'AI evaluates your profile fit, skill match, and difficulty in seconds.',
    duration: 3200,
  },
  {
    id: 'verdict',
    title: '3. Decision Matrix',
    caption: 'Get a clear verdict on whether the project is worth your time.',
    duration: 3000,
  },
  {
    id: 'risk',
    title: '4. Client & Risk Scanner',
    caption: 'Scan client payment history, scope traps, and off-platform red flags.',
    duration: 3200,
  },
  {
    id: 'hidden',
    title: '5. Hidden Requirements',
    caption: 'Uncover implicit dependencies and key clarification questions.',
    duration: 3200,
  },
  {
    id: 'pricing',
    title: '6. Pricing Intelligence',
    caption: 'Receive data-backed fair quote ranges and milestone bidding strategies.',
    duration: 3200,
  },
  {
    id: 'advantage',
    title: '7. Competitive Edge',
    caption: 'Highlight your unfair advantages and custom positioning.',
    duration: 3000,
  },
  {
    id: 'proposal',
    title: '8. Truth-Checked Proposal',
    caption: 'Generate a high-converting, grounded proposal tailored to your experience.',
    duration: 3500,
  },
  {
    id: 'outreach',
    title: '9. Client Follow-up',
    caption: 'Track contact history and generate contextual follow-up messages.',
    duration: 3500,
  },
  {
    id: 'kanban',
    title: '10. Opportunity Pipeline',
    caption: 'Track opportunities from initial outreach to won contracts.',
    duration: 3200,
  },
  {
    id: 'metrics',
    title: '11. Outcome History',
    caption: 'Keep your entire freelance journey inside one organized platform.',
    duration: 3200,
  },
  {
    id: 'final',
    title: '12. Win More Client Work',
    caption: 'From opportunity to outcome — Analyze. Decide. Approach. Follow up. Win.',
    duration: 4000,
  },
];

export const ProductDemoWalkthrough: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [typedText, setTypedText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect accessibility prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) setIsPlaying(false);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
      if (e.matches) setIsPlaying(false);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // IntersectionObserver to auto-start when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Typing animation for Step 0
  useEffect(() => {
    if (activeStep === 0) {
      const fullText =
        'Looking for a Senior React/Next.js developer to build a multi-tenant SaaS analytics dashboard. Budget $1,500 - $2,500. Timeline 3-4 weeks...';
      let index = 0;
      setTypedText('');
      const interval = setInterval(() => {
        if (index < fullText.length) {
          setTypedText(fullText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 22);
      return () => clearInterval(interval);
    }
  }, [activeStep]);

  // Step advancement timer
  useEffect(() => {
    if (!isPlaying || !isInView || isReducedMotion) return;

    const currentDuration = SCENES[activeStep].duration;
    const timer = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % SCENES.length);
    }, currentDuration);

    return () => clearTimeout(timer);
  }, [activeStep, isPlaying, isInView, isReducedMotion]);

  const handleStepClick = (idx: number) => {
    setActiveStep(idx);
    setIsPlaying(false);
  };

  const currentScene = SCENES[activeStep];

  return (
    <section ref={containerRef} className="py-12 sm:py-20 bg-[#F7F7F5] border-b-2 border-[#050505] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Badge & Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6F86F5] text-white border-2 border-[#050505] shadow-retro-sm text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD51F]" />
            Interactive Product Walkthrough
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#050505] tracking-tight">
            See how FreelanceOS works in 35 seconds
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-[#050505]/75">
            Watch how a real opportunity is analyzed, verified, quoted, and tracked from initial post to win.
          </p>
        </div>

        {/* Browser Mockup Window Container */}
        <div className="relative rounded-[28px] sm:rounded-[36px] bg-white border-3 border-[#050505] shadow-retro-lg overflow-hidden transition-all duration-300">
          {/* Mac-style Window Bar */}
          <div className="bg-[#050505] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between border-b-2 border-[#050505]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#F05D5E] border border-black/40 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#FFD51F] border border-black/40 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#4DBA76] border border-black/40 inline-block" />
              <span className="ml-3 text-[11px] font-mono text-white/70 hidden sm:inline-block">
                freelanceos.app/workspace/opportunity-copilot
              </span>
            </div>

            {/* Step Progress & Controls */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-black text-[#FFD51F] uppercase tracking-wider">
                Step {activeStep + 1} of {SCENES.length}
              </span>
              <div className="flex items-center gap-1 bg-[#1A1A1A] p-1 rounded-xl border border-white/20">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title={isPlaying ? 'Pause Demo' : 'Play Demo'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    setActiveStep(0);
                    setIsPlaying(true);
                  }}
                  className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Replay Walkthrough"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Screen Viewport */}
          <div className="p-4 sm:p-8 min-h-[420px] sm:min-h-[460px] flex flex-col justify-between bg-[#F7F7F5] relative">
            {/* Step Content Switcher */}
            <div className="w-full flex-1 flex flex-col justify-center">
              {/* SCENE 0: Opportunity Input */}
              {activeStep === 0 && (
                <div className="max-w-2xl mx-auto w-full space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#050505]/70">Analyze Opportunity</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FFF39A] text-[#050505] border border-[#050505] font-black text-[10px]">
                      Job Post / Message Input
                    </span>
                  </div>
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#050505] shadow-retro-sm space-y-3 relative">
                    <div className="text-xs font-mono text-[#050505] min-h-[60px] leading-relaxed">
                      {typedText}
                      <span className="inline-block w-2 h-4 bg-[#6F86F5] ml-1 animate-pulse" />
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-[#050505]/10 text-[11px] font-bold text-[#050505]/60">
                      <span>Source: Client Brief</span>
                      <span>Target: Alex Chen Profile</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6F86F5] text-white font-black text-xs border-2 border-[#050505] shadow-retro-sm animate-bounce">
                      <MousePointer className="w-4 h-4" />
                      Analyze Opportunity
                    </button>
                  </div>
                </div>
              )}

              {/* SCENE 1: AI Scanning & Fit Score */}
              {activeStep === 1 && (
                <div className="max-w-3xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center animate-in fade-in duration-300">
                  <div className="md:col-span-5 bg-white p-6 rounded-3xl border-2 border-[#050505] shadow-retro-sm flex flex-col items-center text-center space-y-3">
                    <ScoreRing score={DEMO_STORY.matchScore} size={130} strokeWidth={12} label="Fit Score" />
                    <span className="px-3 py-1 rounded-full bg-[#4DBA76] text-white text-xs font-black uppercase border border-[#050505]">
                      {DEMO_STORY.recommendation}
                    </span>
                  </div>
                  <div className="md:col-span-7 space-y-3">
                    <div className="p-3.5 rounded-xl bg-white border-2 border-[#050505] shadow-retro-sm flex justify-between items-center text-xs font-bold">
                      <span>Skill Match</span>
                      <span className="font-black text-[#4DBA76]">94%</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white border-2 border-[#050505] shadow-retro-sm flex justify-between items-center text-xs font-bold">
                      <span>Experience Fit</span>
                      <span className="font-black text-[#4DBA76]">90%</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white border-2 border-[#050505] shadow-retro-sm flex justify-between items-center text-xs font-bold">
                      <span>Portfolio Match</span>
                      <span className="font-black text-[#6F86F5]">86%</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white border-2 border-[#050505] shadow-retro-sm flex justify-between items-center text-xs font-bold">
                      <span>Budget Fit</span>
                      <span className="font-black text-[#4DBA76]">85%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SCENE 2: Decision Matrix */}
              {activeStep === 2 && (
                <div className="max-w-2xl mx-auto w-full p-6 rounded-3xl bg-white border-2 border-[#050505] shadow-retro space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#4DBA76] text-white flex items-center justify-center font-black border-2 border-[#050505] shadow-retro-sm">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#050505]/70">Verdict Matrix</span>
                      <h3 className="text-lg font-black text-[#050505]">Strong Match — Worth Pursuing</h3>
                    </div>
                  </div>
                  <p className="text-xs text-[#050505]/80 font-semibold leading-relaxed">
                    High alignment with your technical stack and past client outcomes. High probability of winning.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs font-bold">
                    <div className="p-3 rounded-xl bg-[#FFF39A] border border-[#050505] flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#4DBA76]" /> Clean Scope Boundaries
                    </div>
                    <div className="p-3 rounded-xl bg-[#FFF39A] border border-[#050505] flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#4DBA76]" /> Budget Matches Floor
                    </div>
                  </div>
                </div>
              )}

              {/* SCENE 3: Client & Risk Scanner */}
              {activeStep === 3 && (
                <div className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
                  <div className="p-5 rounded-2xl bg-white border-2 border-[#050505] shadow-retro-sm space-y-3">
                    <span className="text-[10px] font-black uppercase text-[#050505]/70">Client Intelligence</span>
                    <h4 className="font-black text-base text-[#050505]">{DEMO_STORY.clientName}</h4>
                    <div className="space-y-1.5 text-xs font-semibold text-[#050505]/80">
                      <div className="flex justify-between"><span>Hire Rate:</span> <span className="font-black text-[#4DBA76]">84%</span></div>
                      <div className="flex justify-between"><span>Marketplace Spend:</span> <span className="font-black">$12,000+</span></div>
                      <div className="flex justify-between"><span>Payment Method:</span> <span className="font-black text-[#4DBA76]">Verified</span></div>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-white border-2 border-[#050505] shadow-retro-sm space-y-3">
                    <span className="text-[10px] font-black uppercase text-[#050505]/70">Risk Scanner</span>
                    <div className="p-3 rounded-xl bg-[#F7F7F5] border border-[#050505] flex items-center justify-between text-xs font-bold">
                      <span>Off-Platform Check</span>
                      <span className="text-[#4DBA76] font-black">PASS</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#F7F7F5] border border-[#050505] flex items-center justify-between text-xs font-bold">
                      <span>Uncapped Revision Check</span>
                      <span className="text-[#4DBA76] font-black">PASS</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SCENE 4: Hidden Requirements */}
              {activeStep === 4 && (
                <div className="max-w-2xl mx-auto w-full p-6 rounded-3xl bg-white border-2 border-[#050505] shadow-retro space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-[#6F86F5]">
                    <Layers className="w-4 h-4 text-[#FFD51F]" /> Hidden Requirements & Scope Detector
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#F7F7F5] border border-[#050505] space-y-1">
                      <span className="font-black text-[#050505] block">Inferred Tech Scope:</span>
                      <p className="text-[#050505]/75">Role-based JWT session refresh & API CSRF tokens required.</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#FFF39A] border border-[#050505] space-y-1">
                      <span className="font-black text-[#050505] block">Client Question:</span>
                      <p className="text-[#050505]/85 font-semibold">"Are Figma wireframes prepared, or is UI design in scope?"</p>
                    </div>
                  </div>
                </div>
              )}

              {/* SCENE 5: Pricing Intelligence */}
              {activeStep === 5 && (
                <div className="max-w-2xl mx-auto w-full p-6 rounded-3xl bg-[#FFD51F] border-2 border-[#050505] shadow-retro space-y-4 text-[#050505] animate-in fade-in duration-300">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase tracking-wider text-[#050505]/80">Pricing Intelligence</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#050505] font-black text-[10px]">AI Estimate</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border-2 border-[#050505] shadow-retro-sm flex justify-between items-center text-sm font-black">
                    <span>Suggested Quote Range:</span>
                    <span className="text-[#6F86F5] text-base">${DEMO_STORY.suggestedMin} – ${DEMO_STORY.suggestedMax}</span>
                  </div>
                  <p className="text-xs font-semibold leading-relaxed">
                    Based on 35-40 estimated effort hours, milestone strategy, and client's stated budget of {DEMO_STORY.statedBudget}.
                  </p>
                </div>
              )}

              {/* SCENE 6: Freelancer Advantage */}
              {activeStep === 6 && (
                <div className="max-w-2xl mx-auto w-full p-6 rounded-3xl bg-[#CDB3F4] border-2 border-[#050505] shadow-retro space-y-4 text-[#050505] animate-in fade-in duration-300">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#050505]" />
                    <h4 className="font-black text-base text-[#050505]">Your Competitive Position</h4>
                  </div>
                  <div className="space-y-2 text-xs font-bold">
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Verified past outcomes in Next.js 15 & SaaS dashboards</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Zero defect delivery record on milestone sprints</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#050505] text-xs font-black text-[#050505]">
                    Recommended Positioning: "Lead with your FinPulse dashboard outcome."
                  </div>
                </div>
              )}

              {/* SCENE 7: Truth-Checked Proposal */}
              {activeStep === 7 && (
                <div className="max-w-2xl mx-auto w-full p-6 rounded-3xl bg-white border-2 border-[#050505] shadow-retro space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#6F86F5] flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-[#FFD51F]" /> Grounded Proposal Suite
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#4DBA76] text-white font-black text-[10px] border border-[#050505]">
                      Fact-Checked
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F7F7F5] border-2 border-[#050505] text-xs font-mono space-y-2 leading-relaxed">
                    <p className="font-bold text-[#050505]">Hi Acme Technologies,</p>
                    <p className="text-[#050505]/80">
                      I reviewed your requirements for the SaaS analytics dashboard. Having engineered similar Next.js platforms, I can deliver a clean modular architecture in 3 milestone sprints...
                    </p>
                  </div>
                </div>
              )}

              {/* SCENE 8: Client Follow-Up Tracker */}
              {activeStep === 8 && (
                <div className="max-w-2xl mx-auto w-full p-6 rounded-3xl bg-white border-2 border-[#050505] shadow-retro space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-black uppercase text-[#050505]">
                      <Clock className="w-4 h-4 text-[#6F86F5]" /> Client Outreach & Follow-up Tracker
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F05D5E] text-white font-black text-[10px] border border-[#050505]">
                      DUE TODAY
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FFF39A] border-2 border-[#050505] space-y-2 text-xs">
                    <div className="flex justify-between font-black text-[#050505]">
                      <span>Acme Technologies</span>
                      <span>#2 Follow-up Due</span>
                    </div>
                    <p className="text-[#050505]/80 font-semibold">Last contacted 3 days ago via Email. No response recorded.</p>
                    <button className="px-4 py-2 rounded-xl bg-[#050505] text-white font-black text-[11px] shadow-retro-sm btn-tactile cursor-pointer">
                      Generate Grounded Follow-up Message
                    </button>
                  </div>
                </div>
              )}

              {/* SCENE 9: Opportunity Kanban Pipeline */}
              {activeStep === 9 && (
                <div className="max-w-3xl mx-auto w-full space-y-4 animate-in fade-in duration-300">
                  <span className="text-xs font-black uppercase text-[#050505]/70">Opportunity Kanban Pipeline</span>
                  <div className="grid grid-cols-4 gap-2 text-xs font-bold">
                    <div className="p-3 rounded-2xl bg-white border-2 border-[#050505] shadow-retro-sm text-center">
                      <span className="text-[10px] text-[#050505]/60 block uppercase">ANALYZED</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-white border-2 border-[#050505] shadow-retro-sm text-center">
                      <span className="text-[10px] text-[#050505]/60 block uppercase">CONTACTED</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-[#FFF39A] border-2 border-[#050505] shadow-retro-sm text-center">
                      <span className="text-[10px] text-[#050505] block uppercase font-black">PROPOSAL SENT</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-[#4DBA76] text-white border-2 border-[#050505] shadow-retro-sm text-center animate-bounce">
                      <span className="text-[10px] block uppercase font-black">WON 🎉</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border-2 border-[#050505] shadow-retro-sm text-xs font-black flex justify-between items-center">
                    <span>Acme Technologies — SaaS Dashboard</span>
                    <span className="px-3 py-1 rounded-full bg-[#4DBA76] text-white text-[10px]">Moved to Won ($2,400)</span>
                  </div>
                </div>
              )}

              {/* SCENE 10: History & Outcome Metrics */}
              {activeStep === 10 && (
                <div className="max-w-3xl mx-auto w-full space-y-4 animate-in fade-in duration-300">
                  <span className="text-xs font-black uppercase text-[#050505]/70">Account Intelligence History</span>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-4 rounded-2xl bg-white border-2 border-[#050505] shadow-retro-sm space-y-1">
                      <span className="text-2xl font-black text-[#050505]">18</span>
                      <span className="text-[10px] font-bold text-[#050505]/70 block">Projects Analyzed</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#FFF39A] border-2 border-[#050505] shadow-retro-sm space-y-1">
                      <span className="text-2xl font-black text-[#050505]">84%</span>
                      <span className="text-[10px] font-bold text-[#050505]/70 block">Response Rate</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#6F86F5] text-white border-2 border-[#050505] shadow-retro-sm space-y-1">
                      <span className="text-2xl font-black text-white">$14.2k</span>
                      <span className="text-[10px] font-bold text-white/90 block">Won Revenue</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SCENE 11: Final Call to Action */}
              {activeStep === 11 && (
                <div className="max-w-xl mx-auto text-center space-y-6 animate-in fade-in duration-300">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4DBA76] text-white border-2 border-[#050505] shadow-retro-sm text-xs font-black uppercase tracking-wider">
                    From Opportunity to Outcome
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#050505] tracking-tight">
                    Analyze. Decide. Approach. Follow up. Win.
                  </h3>
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={onGetStarted}
                      className="px-8 py-4 rounded-2xl bg-[#6F86F5] hover:bg-[#536CE8] text-white font-black text-sm border-2 border-[#050505] shadow-retro btn-tactile cursor-pointer flex items-center gap-2"
                    >
                      Try FreelanceOS Free <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setActiveStep(0);
                        setIsPlaying(true);
                      }}
                      className="px-6 py-4 rounded-2xl bg-white hover:bg-[#FFF39A] text-[#050505] font-black text-sm border-2 border-[#050505] shadow-retro-sm btn-tactile cursor-pointer flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" /> Replay Demo
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Caption & Step Tracker Strip */}
            <div className="pt-6 border-t-2 border-[#050505]/10 mt-6 space-y-3">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div>
                  <span className="text-xs font-black text-[#050505] block">{currentScene.title}</span>
                  <p className="text-xs text-[#050505]/75 font-semibold mt-0.5">{currentScene.caption}</p>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
                  {SCENES.map((sc, idx) => (
                    <button
                      key={sc.id}
                      onClick={() => handleStepClick(idx)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        activeStep === idx
                          ? 'w-8 bg-[#6F86F5] border border-[#050505]'
                          : 'w-2.5 bg-[#050505]/20 hover:bg-[#050505]/40'
                      }`}
                      title={sc.title}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
