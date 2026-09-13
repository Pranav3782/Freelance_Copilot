import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from './MotionWrappers';
import { Sparkles, FileText, User, Target, ArrowRight, ShieldCheck, Heart, ArrowLeft } from 'lucide-react';

interface AboutPageProps {
  onBack?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  return (
    <div className="pt-8 pb-20 overflow-hidden bg-[#F7F7F5] min-h-screen">
      {/* Top Back to Home Navigation */}
      {onBack && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border-2 border-[#050505] hover:bg-[#FFD51F] text-[#050505] font-black text-xs shadow-retro-sm btn-tactile cursor-pointer transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      )}
      
      {/* 1. HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="right" distance={40} className="max-w-xl">
            <span className="px-4 py-1.5 rounded-full bg-[#CDB3F4] text-xs font-black uppercase tracking-wider text-[#050505] border-2 border-[#050505] shadow-[2px_2px_0px_#050505] inline-block mb-6">
              About the Platform
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[64px] leading-[1.05] font-black tracking-tight text-[#050505] mb-6">
              Freelancing is hard enough. Deciding what to work on shouldn't be.
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-[#050505]/80 leading-relaxed">
              We’re building an AI-powered opportunity intelligence platform that helps freelancers understand projects, make smarter decisions, and approach the right clients with confidence.
            </p>
          </FadeIn>

          <FadeIn direction="left" distance={40}>
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-[#6F86F5] rounded-[48px] border-4 border-[#050505] shadow-[8px_8px_0px_#050505] transform rotate-3" />
              <div className="absolute inset-0 bg-[#CDB3F4] rounded-[48px] border-4 border-[#050505] shadow-[4px_4px_0px_#050505] transform -rotate-2" />
              
              {/* Graphic Composition */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  animate={{ y: [-10, 10, -10] }} 
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute top-12 left-8 w-16 h-16 bg-[#FFF39A] rounded-full border-2 border-[#050505] flex items-center justify-center shadow-[4px_4px_0px_#050505] z-10"
                >
                  <Sparkles className="w-8 h-8 text-[#050505]" />
                </motion.div>
                
                <motion.div 
                  animate={{ y: [10, -10, 10] }} 
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="absolute bottom-16 right-8 w-24 h-24 bg-[#E747A8] rounded-2xl border-2 border-[#050505] flex flex-col items-center justify-center shadow-[4px_4px_0px_#050505] z-10 text-white font-black"
                >
                  <span className="text-2xl">92%</span>
                  <span className="text-[10px] uppercase">Match</span>
                </motion.div>

                <div className="w-48 h-64 bg-[#F7F7F5] rounded-2xl border-4 border-[#050505] shadow-[6px_6px_0px_#050505] z-0 p-4 space-y-3 relative transform rotate-6">
                  <div className="w-1/2 h-4 bg-[#050505] rounded-full opacity-20" />
                  <div className="w-full h-2 bg-[#050505] rounded-full opacity-20" />
                  <div className="w-3/4 h-2 bg-[#050505] rounded-full opacity-20" />
                  <div className="w-full h-2 bg-[#050505] rounded-full opacity-20" />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. OUR MISSION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FadeIn direction="up">
          <div className="bg-[#FFD51F] rounded-[40px] border-4 border-[#050505] shadow-[8px_8px_0px_#050505] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 text-[180px] font-black text-[#050505]/10 leading-none select-none">
              01
            </div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#050505] mb-6">Our mission</h2>
              <div className="space-y-4 text-lg font-semibold text-[#050505]/90">
                <p>
                  Freelancers often spend hours reading project descriptions, researching clients, estimating budgets, figuring out hidden requirements and writing proposals — only to discover that the opportunity wasn't a good fit.
                </p>
                <p>
                  This platform brings those steps together in one place.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 3. THE PROBLEM */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <StaggerItem distance={30} direction="right">
            <div className="bg-[#F7F7F5] rounded-[32px] border-4 border-[#050505] shadow-[6px_6px_0px_#050505] p-8 relative overflow-hidden">
              <div className="inline-block px-3 py-1 bg-[#050505] text-white text-xs font-black uppercase tracking-wider rounded-full mb-8 shadow-[2px_2px_0px_#F2A4DE]">
                Before
              </div>
              <ul className="space-y-4">
                {['Read project', 'Research client', 'Guess the scope', 'Guess the price', 'Write proposal', 'Hope for a response'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#050505]/60 font-bold strike-through line-through opacity-70">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#050505]/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>

          <StaggerItem distance={30} direction="left">
            <div className="bg-[#4DBA76] text-white rounded-[32px] border-4 border-[#050505] shadow-[8px_8px_0px_#050505] p-8 md:p-10 transform md:-translate-y-6">
              <div className="inline-block px-3 py-1 bg-white text-[#050505] text-xs font-black uppercase tracking-wider rounded-full mb-8 border-2 border-[#050505] shadow-[2px_2px_0px_#050505]">
                After
              </div>
              <h3 className="text-2xl font-black mb-6">AI Opportunity Intelligence</h3>
              <ul className="space-y-4">
                {['Understand', 'Compare', 'Check', 'Estimate', 'Approach', 'Track'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white font-black text-lg">
                    <div className="w-6 h-6 rounded-full bg-white text-[#4DBA76] flex items-center justify-center border-2 border-[#050505]">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* 4. WHAT WE BELIEVE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#050505] mb-12 text-center">What We Believe</h2>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {[
            { title: "Clarity over guesswork", desc: "Know what you're getting into.", color: "bg-[#F2A4DE]", icon: Target },
            { title: "Honesty over impressive-sounding proposals", desc: "The AI should never invent your experience.", color: "bg-[#6F86F5]", icon: ShieldCheck },
            { title: "Useful intelligence over noise", desc: "Only show information that can actually help make a decision.", color: "bg-[#FF941D]", icon: FileText },
            { title: "Human decisions, AI assistance", desc: "The AI helps you decide. You remain in control.", color: "bg-[#CDB3F4]", icon: User },
          ].map((item, i) => (
            <StaggerItem key={i} distance={20}>
              <HoverCard className={`p-8 rounded-[32px] border-4 border-[#050505] ${item.color} text-[#050505] shadow-[6px_6px_0px_#050505] hover:shadow-[8px_8px_0px_#050505] transition-all duration-200 h-full`}>
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#050505] flex items-center justify-center mb-6 shadow-[2px_2px_0px_#050505]">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-black mb-2">{item.title}</h3>
                <p className="font-semibold text-[#050505]/80">{item.desc}</p>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 5. VISION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <FadeIn direction="up">
          <div className="bg-[#050505] text-[#F7F7F5] rounded-[40px] border-2 border-[#6F86F5] p-10 md:p-16 text-center shadow-[12px_12px_0px_#6F86F5] relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#CDB3F4] rounded-full mix-blend-overlay opacity-50 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#6F86F5] rounded-full mix-blend-overlay opacity-50 blur-3xl" />
            
            <div className="relative z-10">
              <Sparkles className="w-10 h-10 text-[#FFD51F] mx-auto mb-6" />
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8 leading-[1.1]">
                From finding a project to knowing exactly what to do next.
              </h2>
              <p className="text-lg md:text-xl font-semibold text-[#F7F7F5]/80 max-w-3xl mx-auto leading-relaxed">
                The platform can eventually become a general-purpose AI Freelance Copilot across authorized freelance marketplaces, job boards and direct client opportunities.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 6. CREATOR SECTION */}
      <section className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <FadeIn direction="up">
          <div className="bg-white rounded-[32px] border-4 border-[#050505] shadow-[8px_8px_0px_#050505] p-8 text-center flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-[#E747A8] border-4 border-[#050505] shadow-[4px_4px_0px_#050505] flex items-center justify-center mb-6">
              <span className="text-3xl font-black text-white">S</span>
            </div>
            <h3 className="text-2xl font-black text-[#050505] mb-2">Built by Surya</h3>
            <p className="font-semibold text-[#050505]/70 leading-relaxed">
              Designed and built with the goal of making freelance opportunities easier to understand, evaluate and act on.
            </p>
          </div>
        </FadeIn>
      </section>

    </div>
  );
};
