import React, { useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem, AnimatedNumber, HoverCard, Parallax } from './MotionWrappers';
import { LiveIntelligenceShowcase } from './LiveIntelligenceShowcase';
import { ProSubscriptionButton } from './payment/ProSubscriptionButton';
import { ProductDemoWalkthrough } from './ProductDemoWalkthrough';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Target,
  IndianRupee,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Layers,
  Lock,
  Check,
  ChevronDown,
} from 'lucide-react';
import { ScoreRing } from './ScoreRing';

interface LandingPageProps {
  onAnalyzeClick: () => void;
  onOpenDashboard: () => void;
  onOpenAuth: () => void;
  isAuthenticated: boolean;
  isPro: boolean;
  onGoToDashboard: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenAuth,
  onOpenDashboard,
  onAnalyzeClick,
  isAuthenticated,
  isPro,
  onGoToDashboard,
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="w-full bg-[#F7F7F5] text-[#050505] overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-14 pb-16 sm:pt-20 sm:pb-24 md:pt-28 md:pb-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6 sm:space-y-10">
          {/* Hero Content */}
          <div className="space-y-6 sm:space-y-10 flex flex-col items-center w-full">
            <FadeIn delay={0.05} distance={15} immediate={true}>
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#FFD51F] border-2 border-[#050505] shadow-retro-sm">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#050505] animate-ping" />
                <span className="text-[10px] sm:text-xs font-black text-[#050505] uppercase tracking-wider">
                  Next-Gen Freelance Intelligence
                </span>
                <span className="hidden sm:inline text-xs text-[#050505]/80 font-bold">• Gemini 3.8 Copilot</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.15} distance={20} immediate={true}>
              <h1 className="text-hero font-black tracking-tight text-[#050505] break-safe">
                Stop guessing which freelance projects are{' '}
                <span className="relative inline-block bg-[#FFF39A] px-2 py-0.5 rounded-xl border-2 border-[#050505] shadow-retro-sm -rotate-1">
                  worth your time.
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3} distance={20} immediate={true}>
              <p className="text-base sm:text-lg md:text-xl text-[#050505]/80 font-medium leading-relaxed max-w-2xl">
                Paste or drop any freelance project. AI instantly evaluates your profile fit, client legitimacy,
                hidden technical traps, fair bidding price, and writes a winning, truth-checked proposal in seconds.
              </p>
            </FadeIn>

            <FadeIn delay={0.45} distance={20} immediate={true} className="w-full">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-4 sm:pt-6 w-full">
                <button
                  onClick={onOpenAuth}
                  className="group flex items-center justify-center gap-3 px-6 sm:px-10 py-4 sm:py-5 rounded-2xl bg-[#6F86F5] hover:bg-[#536CE8] text-white font-black text-base sm:text-lg border-2 border-[#050505] shadow-retro btn-tactile cursor-pointer w-full sm:w-auto"
                >
                  Analyze your first project
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </FadeIn>

            {/* Micro badges below CTA */}
            <StaggerContainer delayChildren={0.6} staggerChildren={0.1} className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-2 text-xs font-bold text-[#050505]">
              <StaggerItem distance={15}>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border-2 border-[#050505] shadow-retro-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#4DBA76] shrink-0" />
                  <span className="whitespace-nowrap">No platform scraping</span>
                </div>
              </StaggerItem>
              <StaggerItem distance={15}>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border-2 border-[#050505] shadow-retro-sm">
                  <ShieldCheck className="w-4 h-4 text-[#6F86F5] shrink-0" />
                  <span className="whitespace-nowrap">Truth-Checked Proposals</span>
                </div>
              </StaggerItem>
              <StaggerItem distance={15}>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border-2 border-[#050505] shadow-retro-sm">
                  <Lock className="w-4 h-4 text-[#FF941D] shrink-0" />
                  <span className="whitespace-nowrap">Client-Safe</span>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* 1.5 ANIMATED PRODUCT DEMO WALKTHROUGH */}
      <ProductDemoWalkthrough onGetStarted={onOpenAuth} />

      {/* 2. SOCIAL PROOF METRICS STRIP */}
      <section className="border-b-2 border-[#050505] bg-[#FFFFFF] py-10 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer delayChildren={0.2} staggerChildren={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
            <StaggerItem distance={25} className="p-3 sm:p-4 rounded-2xl bg-[#FFF39A] border-2 border-[#050505] shadow-retro-sm">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#050505] tracking-tight">
                <AnimatedNumber value={42800} suffix="+" />
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-[#050505]/80 mt-1">Projects Analyzed</div>
            </StaggerItem>
            <StaggerItem distance={25} className="p-3 sm:p-4 rounded-2xl bg-[#6F86F5] text-white border-2 border-[#050505] shadow-retro-sm">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                <AnimatedNumber value={14} suffix=".5 hrs" />
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-white/90 mt-1">Avg Time Saved / Wk</div>
            </StaggerItem>
            <StaggerItem distance={25} className="p-3 sm:p-4 rounded-2xl bg-[#CDB3F4] text-[#050505] border-2 border-[#050505] shadow-retro-sm">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#050505] tracking-tight">
                <AnimatedNumber value={94} suffix=".2%" />
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-[#050505]/80 mt-1">Match Accuracy Rating</div>
            </StaggerItem>
            <StaggerItem distance={25} className="p-3 sm:p-4 rounded-2xl bg-[#FF941D] text-white border-2 border-[#050505] shadow-retro-sm">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                <AnimatedNumber value={8} suffix="X" />
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-white/90 mt-1">Proposal Win Rate</div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section id="how-it-works" className="py-16 sm:py-24 md:py-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up" distance={30}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-20 space-y-3 sm:space-y-4">
            <span className="px-4 py-1 rounded-full bg-[#FFD51F] text-xs font-black uppercase tracking-wider text-[#050505] border-2 border-[#050505] shadow-retro-sm">
              Simple 4-Step Intelligence Loop
            </span>
            <h2 className="text-section-heading font-black tracking-tight text-[#050505]">
              How FreelanceOS turns chaotic project posts into guaranteed wins.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#050505]/75 font-medium">
              From raw client descriptions to structured proposal strategies in under 15 seconds.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer delayChildren={0.2} staggerChildren={0.15} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
          {/* Step 1 */}
          <StaggerItem distance={30} scale={true}>
          <HoverCard className="relative p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] bg-[#CDB3F4] text-[#050505] flex flex-col justify-between border-2 border-[#050505] shadow-retro overflow-hidden h-full">
            <div className="absolute top-0 right-6 w-5 h-8 bookmark-ribbon-pink" />
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#050505] text-white flex items-center justify-center font-black text-lg sm:text-xl mb-4 sm:mb-6 border-2 border-[#050505] shadow-retro-sm">
                1
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-2 sm:mb-3">Paste or upload a project</h3>
              <p className="text-sm font-medium text-[#050505]/85 leading-relaxed">
                Drop in raw text from Upwork, Contra, or upload client screenshots and scope documents.
              </p>
            </div>
            <div className="pt-6 sm:pt-8 border-t-2 border-[#050505]/20 mt-6 sm:mt-8 flex items-center justify-between text-xs font-black">
              <span>Text or Screenshot</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#050505] text-white flex items-center justify-center text-sm font-bold border-2 border-[#050505]">→</div>
            </div>
          </HoverCard>
          </StaggerItem>

          {/* Step 2 */}
          <StaggerItem distance={30} scale={true}>
          <HoverCard className="relative p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] bg-[#FFD51F] text-[#050505] flex flex-col justify-between border-2 border-[#050505] shadow-retro overflow-hidden h-full">
            <div className="absolute top-0 right-6 w-5 h-8 bookmark-ribbon-orange" />
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#050505] text-white flex items-center justify-center font-black text-lg sm:text-xl mb-4 sm:mb-6 border-2 border-[#050505] shadow-retro-sm">
                2
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-2 sm:mb-3">AI understands the opportunity</h3>
              <p className="text-sm font-medium text-[#050505]/85 leading-relaxed">
                Extracts unstated dependencies, validates client payment history, and cross-references your profile skills.
              </p>
            </div>
            <div className="pt-6 sm:pt-8 border-t-2 border-[#050505]/20 mt-6 sm:mt-8 flex items-center justify-between text-xs font-black">
              <span>Deep Requirement Extraction</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#050505] text-white flex items-center justify-center text-sm font-bold border-2 border-[#050505]">→</div>
            </div>
          </HoverCard>
          </StaggerItem>

          {/* Step 3 */}
          <StaggerItem distance={30} scale={true}>
          <HoverCard className="relative p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] bg-[#F2A4DE] text-[#050505] flex flex-col justify-between border-2 border-[#050505] shadow-retro overflow-hidden h-full">
            <div className="absolute top-0 right-6 w-5 h-8 bookmark-ribbon-yellow" />
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#050505] text-white flex items-center justify-center font-black text-lg sm:text-xl mb-4 sm:mb-6 border-2 border-[#050505] shadow-retro-sm">
                3
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-2 sm:mb-3">Fit, risk & pricing intelligence</h3>
              <p className="text-sm font-medium text-[#050505]/85 leading-relaxed">
                Get an objective APPLY, MAYBE, or DON'T APPLY recommendation with risk checklists and recommended bidding ranges.
              </p>
            </div>
            <div className="pt-6 sm:pt-8 border-t-2 border-[#050505]/20 mt-6 sm:mt-8 flex items-center justify-between text-xs font-black">
              <span>Clear Decision Matrix</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#050505] text-white flex items-center justify-center text-sm font-bold border-2 border-[#050505]">→</div>
            </div>
          </HoverCard>
          </StaggerItem>

          {/* Step 4 */}
          <StaggerItem distance={30} scale={true}>
          <HoverCard className="relative p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] bg-[#6F86F5] text-white flex flex-col justify-between border-2 border-[#050505] shadow-retro overflow-hidden h-full">
            <div className="absolute top-0 right-6 w-5 h-8 bookmark-ribbon-pink" />
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white text-[#050505] flex items-center justify-center font-black text-lg sm:text-xl mb-4 sm:mb-6 border-2 border-[#050505] shadow-retro-sm">
                4
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-2 sm:mb-3">Generate your approach & track</h3>
              <p className="text-sm font-medium text-white/95 leading-relaxed">
                Produce bespoke proposals, introductory pitches, and discovery call questions with a built-in Truth Checker.
              </p>
            </div>
            <div className="pt-6 sm:pt-8 border-t-2 border-white/20 mt-6 sm:mt-8 flex items-center justify-between text-xs font-black">
              <span>Zero Hallucinations</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#050505] flex items-center justify-center text-sm font-black border-2 border-[#050505]">→</div>
            </div>
          </HoverCard>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* 4. CORE FEATURES BENTO GRID */}
      <section id="features" className="py-16 sm:py-24 md:py-36 bg-[#FFFFFF] border-y-2 border-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={30}>
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-20 space-y-3 sm:space-y-4">
              <span className="px-4 py-1 rounded-full bg-[#FFD51F] text-xs font-black uppercase tracking-wider text-[#050505] border-2 border-[#050505] shadow-retro-sm">
                Full Spectrum Intelligence
              </span>
              <h2 className="text-section-heading font-black tracking-tight text-[#050505]">
                Everything you need to stop wasting time on doomed bids.
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#050505]/75 font-medium">
                Engineered specifically for independent developers, designers, and consultants.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer delayChildren={0.2} staggerChildren={0.15} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            <StaggerItem distance={30} direction="left">
            <HoverCard className="p-6 sm:p-8 rounded-[24px] sm:rounded-[28px] bg-[#F7F7F5] border-2 border-[#050505] shadow-retro h-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#6F86F5] text-white flex items-center justify-center mb-4 sm:mb-6 border-2 border-[#050505] shadow-retro-sm">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-[#050505] mb-2">Project Match Score</h3>
              <p className="text-sm font-medium text-[#050505]/80 leading-relaxed">
                Multi-dimensional rating analyzing skill overlap, past portfolio relevance, experience years, and budget viability.
              </p>
            </HoverCard>
            </StaggerItem>

            <StaggerItem distance={30} direction="up">
            <HoverCard className="p-6 sm:p-8 rounded-[24px] sm:rounded-[28px] bg-[#F7F7F5] border-2 border-[#050505] shadow-retro h-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#4DBA76] text-white flex items-center justify-center mb-4 sm:mb-6 border-2 border-[#050505] shadow-retro-sm">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-[#050505] mb-2">Client Intelligence</h3>
              <p className="text-sm font-medium text-[#050505]/80 leading-relaxed">
                Synthesizes publicly verifiable employer track record, hire rates, average hourly wages, and past freelancer reviews.
              </p>
            </HoverCard>
            </StaggerItem>

            <StaggerItem distance={30} direction="right">
            <HoverCard className="p-6 sm:p-8 rounded-[24px] sm:rounded-[28px] bg-[#F7F7F5] border-2 border-[#050505] shadow-retro h-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#FF941D] text-white flex items-center justify-center mb-4 sm:mb-6 border-2 border-[#050505] shadow-retro-sm">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-[#050505] mb-2">Client Risk Scanner</h3>
              <p className="text-sm font-medium text-[#050505]/80 leading-relaxed">
                Flags red flags before you apply: indefinite revision clauses, off-platform payment attempts, and impossible deadlines.
              </p>
            </HoverCard>
            </StaggerItem>

            <StaggerItem distance={30} direction="left">
            <HoverCard className="p-6 sm:p-8 rounded-[24px] sm:rounded-[28px] bg-[#F7F7F5] border-2 border-[#050505] shadow-retro h-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#F2A4DE] text-[#050505] flex items-center justify-center mb-4 sm:mb-6 border-2 border-[#050505] shadow-retro-sm">
                <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-[#050505] mb-2">Hidden Requirements Detector</h3>
              <p className="text-sm font-medium text-[#050505]/80 leading-relaxed">
                Reveals architectural dependencies the client forgot to mention, like database RLS, webhooks, caching, and hosting costs.
              </p>
            </HoverCard>
            </StaggerItem>

            <StaggerItem distance={30} direction="up">
            <HoverCard className="p-6 sm:p-8 rounded-[24px] sm:rounded-[28px] bg-[#F7F7F5] border-2 border-[#050505] shadow-retro h-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#FFD51F] text-[#050505] flex items-center justify-center mb-4 sm:mb-6 border-2 border-[#050505] shadow-retro-sm">
                <IndianRupee className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-[#050505] mb-2">Pricing Intelligence</h3>
              <p className="text-sm font-medium text-[#050505]/80 leading-relaxed">
                Real-time effort modeling and bidding ranges based on your hourly floor and client budget history.
              </p>
            </HoverCard>
            </StaggerItem>

            <StaggerItem distance={30} direction="right">
            <HoverCard className="p-6 sm:p-8 rounded-[24px] sm:rounded-[28px] bg-[#F7F7F5] border-2 border-[#050505] shadow-retro h-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#CDB3F4] text-[#050505] flex items-center justify-center mb-4 sm:mb-6 border-2 border-[#050505] shadow-retro-sm">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-[#050505] mb-2">Proposal Truth Checker</h3>
              <p className="text-sm font-medium text-[#050505]/80 leading-relaxed">
                Guarantees AI-generated proposals never invent fake experience, unverifiable certifications, or exaggerated skill claims.
              </p>
            </HoverCard>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* 5. INTERACTIVE INTELLIGENCE SHOWCASE */}
      <LiveIntelligenceShowcase onOpenDashboard={onOpenDashboard} />

      {/* 6. PRICING SECTION */}
      <section id="pricing" className="py-16 sm:py-24 md:py-36 bg-[#FFFFFF] border-y-2 border-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={30}>
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-20 space-y-3 sm:space-y-4">
              <span className="px-4 py-1 rounded-full bg-[#F2A4DE] text-xs font-black uppercase tracking-wider text-[#050505] border-2 border-[#050505] shadow-retro-sm">
                Transparent Pricing
              </span>
              <h2 className="text-section-heading font-black tracking-tight text-[#050505]">
                One winning project pays for your entire year.
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#050505]/75 font-medium">
                Start free, upgrade as your freelance pipeline scales.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer delayChildren={0.2} staggerChildren={0.15} className="grid grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto gap-6 sm:gap-8">
            {/* Free Starter */}
            <StaggerItem distance={30} direction="left" className="h-full">
            <HoverCard whileHover={{ y: -6, rotate: -1 }} className="h-full p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] bg-[#F7F7F5] border-2 border-[#050505] shadow-retro flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#050505]/70">Free 14-Day Trial</span>
                <div className="text-3xl sm:text-4xl font-black text-[#050505] mt-2 mb-3 sm:mb-4">₹0</div>
                <p className="text-sm font-medium text-[#050505]/80 mb-4 sm:mb-6">Perfect for testing the waters and scanning your first leads.</p>
                <div className="space-y-2 sm:space-y-3 text-xs font-bold text-[#050505]">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#4DBA76] shrink-0" />
                    <span>5 Project Analyses / month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#4DBA76] shrink-0" />
                    <span>Core Match Score & Recommendation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#4DBA76] shrink-0" />
                    <span>Standard Proposal Generator</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onOpenAuth}
                className="mt-6 sm:mt-8 w-full py-3 sm:py-3.5 rounded-xl border-2 border-[#050505] font-black text-sm text-[#050505] bg-white hover:bg-[#FFD51F] hover:translate-y-[-2px] shadow-retro-sm hover:shadow-[4px_6px_0px_#050505] transition-all duration-200 cursor-pointer"
              >
                Start Free Trial
              </button>
            </HoverCard>
            </StaggerItem>

            {/* Pro Plan */}
            <StaggerItem distance={30} direction="right" className="h-full">
            <HoverCard whileHover={{ y: -6, rotate: 1 }} className="h-full relative p-6 sm:p-8 rounded-[28px] sm:rounded-[32px] bg-[#6F86F5] text-white flex flex-col justify-between border-2 border-[#050505] shadow-retro-lg sm:transform sm:-translate-y-3">
              <div className="absolute top-0 right-6 sm:right-8 -translate-y-1/2 px-3 sm:px-3.5 py-1 rounded-full bg-[#FFD51F] text-[#050505] text-xs font-black border-2 border-[#050505] shadow-retro-sm">
                Most Popular
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-white/90">Pro Member</span>
                <div className="text-3xl sm:text-4xl font-black text-white mt-2 mb-3 sm:mb-4">
                  ₹299 <span className="text-sm font-medium text-white/80">/ month</span>
                </div>
                <p className="text-sm text-white/95 font-medium mb-4 sm:mb-6">For full-time freelancers who want to win higher-rate clients.</p>
                <div className="space-y-2 sm:space-y-3 text-xs font-bold text-white">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FFD51F] shrink-0" />
                    <span>Unlimited Project Analyses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FFD51F] shrink-0" />
                    <span>Full Client Risk Scanner & Trap Alerts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FFD51F] shrink-0" />
                    <span>Hidden Requirements Detector</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FFD51F] shrink-0" />
                    <span>Truth-Checked Winning Proposals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FFD51F] shrink-0" />
                    <span>Kanban Pipeline & Discovery Scripts</span>
                  </div>
                </div>
              </div>
              <ProSubscriptionButton
                isAuthenticated={isAuthenticated}
                isPro={isPro}
                onOpenAuth={onOpenAuth}
                onGoToDashboard={onGoToDashboard}
              />
            </HoverCard>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* 6. FAQ SECTION (Immediately after Pricing) */}
      <section id="faq" className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 border-t-2 border-[#050505]/10">
        <FadeIn delay={0.1}>
          <div className="text-center space-y-4 mb-12 sm:mb-16">
            <span className="px-3.5 py-1 rounded-full bg-[#FFF39A] text-[#050505] border-2 border-[#050505] text-xs font-black uppercase tracking-wider inline-block shadow-retro-sm">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#050505]">
              Everything you need to know
            </h2>
            <p className="text-sm sm:text-base text-[#050505]/75 font-medium max-w-xl mx-auto">
              Got questions before using FreelanceOS? Here are clear, straightforward answers for freelancers.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-4">
          {[
            {
              q: 'What does this platform do?',
              a: 'It helps you understand freelance projects, check if they are a good fit for your profile, estimate pricing, detect hidden scope traps, and decide whether you should apply.',
            },
            {
              q: 'Can I analyze a project from Freelancer.com?',
              a: 'Yes. You can provide project details or upload screenshots from Freelancer.com, Upwork, or direct client briefs, and the platform will analyze the opportunity for you.',
            },
            {
              q: 'Do I need my own AI API key?',
              a: 'Yes. The platform uses your own Gemini API key for AI analysis. Your key is encrypted using AES-256-GCM and used securely for your account.',
            },
            {
              q: 'Can it tell me whether I should apply?',
              a: 'Yes. It gives you an Opportunity Fit result (APPLY, MAYBE, or DON\'T APPLY) and explains why the project may or may not be a good match.',
            },
            {
              q: 'Can I track clients and follow-ups?',
              a: 'Yes. You can track contact attempts, log interactions, schedule follow-ups, and monitor the current status of each opportunity.',
            },
          ].map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-[24px] bg-white border-2 border-[#050505] shadow-retro overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-black text-base sm:text-lg text-[#050505] cursor-pointer hover:bg-[#FFF39A]/40 transition-colors"
                  aria-expanded={isOpen}
                  id={`faq-btn-${idx}`}
                >
                  <span className="leading-snug">{item.q}</span>
                  <div className={`w-8 h-8 rounded-full border-2 border-[#050505] flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'bg-[#FFD51F] rotate-180' : 'bg-[#F7F7F5]'}`}>
                    <ChevronDown className="w-4 h-4 text-[#050505]" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm font-semibold text-[#050505]/80 leading-relaxed border-t border-[#050505]/10 animate-in fade-in duration-200">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. LARGE PERIWINKLE CTA BANNER */}
      <section className="py-16 sm:py-24 md:py-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0.2}>
        <div className="relative p-8 sm:p-12 md:p-16 rounded-[28px] sm:rounded-[40px] bg-[#6F86F5] text-white text-center overflow-hidden border-2 border-[#050505] shadow-retro-lg hover:shadow-[12px_12px_0px_#050505] transition-shadow duration-300">
          <div className="relative max-w-2xl mx-auto space-y-4 sm:space-y-6">
            <span className="px-3.5 py-1 rounded-full bg-white text-[#050505] border-2 border-[#050505] text-xs font-black uppercase tracking-wider inline-block shadow-retro-sm">
              Zero Commitment
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Find the projects you should actually apply to.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/95 font-medium">
              Stop wasting hours applying to ghost jobs, scope traps, and underpriced posts. Let AI filter the signal from the noise.
            </p>
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={onAnalyzeClick}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-[#FFD51F] text-[#050505] font-black text-sm sm:text-base border-2 border-[#050505] shadow-retro hover:bg-white btn-tactile cursor-pointer"
              >
                Analyze a Project Now →
              </button>
              <button
                onClick={onOpenDashboard}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-[#050505] text-white font-black text-sm sm:text-base border-2 border-[#050505] shadow-retro hover:bg-[#536CE8] btn-tactile cursor-pointer"
              >
                Open Dashboard Demo
              </button>
            </div>
          </div>
        </div>
        </FadeIn>
      </section>

    </div>
  );
};
