import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from './MotionWrappers';
import { ArrowLeft, ArrowRight, FileSearch, Search, ScanLine, Scale, ShieldAlert, BadgeCheck, Calculator, PenTool, LayoutDashboard } from 'lucide-react';

interface HowItWorksPageProps {
  onBack?: () => void;
  onOpenAnalyzeModal: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onBack, onOpenAnalyzeModal }) => {
  const steps = [
    {
      num: "01",
      title: "Add a Project",
      desc: "Paste the project description or upload a screenshot. The AI reads the available information and turns it into structured project data.",
      color: "bg-[#FFF39A]",
      icon: FileSearch
    },
    {
      num: "02",
      title: "AI Understands the Project",
      desc: "The platform identifies the skills, technologies, budget, timeline, deliverables, experience requirements and other important details.",
      color: "bg-[#6F86F5]",
      textColor: "text-white",
      icon: ScanLine
    },
    {
      num: "03",
      title: "Understand the Client",
      desc: "When legitimate public information is available, the platform can organize relevant public business information and show where the information came from. We don't guess or present private information as public information.",
      color: "bg-[#F7F7F5]",
      icon: Search
    },
    {
      num: "04",
      title: "Compare It With You",
      desc: "The AI compares the opportunity against your freelancer profile — skills, experience, portfolio, preferred projects and budget.",
      color: "bg-[#F2A4DE]",
      icon: Scale
    },
    {
      num: "05",
      title: "Find Risks & Hidden Work",
      desc: "The AI looks for potential problems such as unclear requirements, unrealistic deadlines, scope/budget mismatch and suspicious requests. It can also identify work that may not have been explicitly mentioned (AI-inferred requirements).",
      color: "bg-[#FF941D]",
      textColor: "text-white",
      icon: ShieldAlert
    },
    {
      num: "06",
      title: "Get Your Recommendation",
      desc: "You'll receive a simple recommendation — APPLY, MAYBE or DON'T APPLY — together with the reasoning behind it.",
      color: "bg-[#4DBA76]",
      textColor: "text-white",
      icon: BadgeCheck
    },
    {
      num: "07",
      title: "Understand Pricing",
      desc: "Pricing Intelligence estimates a reasonable bidding range based on the available project scope, stated budget and your own preferences. (AI estimate — not a guaranteed price.)",
      color: "bg-[#CDB3F4]",
      icon: Calculator
    },
    {
      num: "08",
      title: "Know What To Say",
      desc: "Generate a personalized proposal, introduction, follow-up message, discovery-call questions, negotiation response and professional email when appropriate.",
      color: "bg-[#FFD51F]",
      icon: PenTool
    },
    {
      num: "09",
      title: "Track What Happens",
      desc: "Once you apply, move the project through your application pipeline and track replies, interviews and outcomes.",
      color: "bg-[#050505]",
      textColor: "text-white",
      icon: LayoutDashboard
    }
  ];

  return (
    <div className="pt-12 pb-20 overflow-hidden">
      {/* Back to Home Header Action */}
      {onBack && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-[#050505] bg-white hover:bg-[#FFF39A] text-xs font-black text-[#050505] shadow-retro-sm btn-tactile cursor-pointer transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-[#050505]" />
            <span>← Back to Home</span>
          </button>
        </div>
      )}

      {/* HERO */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 text-center">
        <FadeIn direction="up" distance={30}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#050505] mb-6">
            How does it actually work?
          </h1>
          <p className="text-xl font-bold text-[#050505]/70 leading-relaxed max-w-2xl mx-auto">
            From a project description to a confident decision — in a few simple steps.
          </p>
        </FadeIn>
      </section>

      {/* STEPS JOURNEY */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Connecting Line behind steps */}
        <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-[#050505] -translate-x-1/2 rounded-full hidden md:block opacity-10" />

        <div className="space-y-12 md:space-y-24">
          {steps.map((step, idx) => (
            <FadeIn key={idx} direction={idx % 2 === 0 ? "right" : "left"} distance={40}>
              <div className={`relative ${idx % 2 === 0 ? "md:pr-12 md:text-right md:ml-auto md:w-1/2" : "md:pl-12 md:mr-auto md:w-1/2"}`}>
                
                {/* Visual Connector Dot on Desktop */}
                <div className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-[#050505] bg-white hidden md:block z-10 shadow-[2px_2px_0px_#050505] ${idx % 2 === 0 ? "-right-3" : "-left-3"}`} />

                <HoverCard className={`p-8 md:p-10 rounded-[32px] border-4 border-[#050505] ${step.color} ${step.textColor || "text-[#050505]"} shadow-[6px_6px_0px_#050505] hover:shadow-[10px_10px_0px_#050505] transition-shadow text-left`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-5xl font-black opacity-20 leading-none">
                      {step.num}
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white/20 border-2 border-current flex items-center justify-center shrink-0 shadow-[2px_2px_0px_currentColor]">
                      <step.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black mb-3">{step.title}</h3>
                  <p className="font-semibold text-current opacity-90 leading-relaxed text-sm sm:text-base">
                    {step.desc}
                  </p>
                </HoverCard>

              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <FadeIn direction="up">
          <div className="bg-[#E747A8] rounded-[40px] border-4 border-[#050505] shadow-[12px_12px_0px_#050505] p-12 md:p-20 relative overflow-hidden text-white">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8">
              Found a project? Let's figure out if it's worth your time.
            </h2>
            <button 
              onClick={onOpenAnalyzeModal}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-[#050505] font-black text-lg border-4 border-[#050505] shadow-[6px_6px_0px_#050505] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#050505] transition-all btn-tactile"
            >
              Analyze a Project
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </FadeIn>
      </section>
    </div>
  );
};
