import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Check } from 'lucide-react';
import { Parallax } from './MotionWrappers'; // keep the outer parallax for the container

// Easing for premium feel
const cubicEasing = [0.22, 1, 0.36, 1] as any;

// Variants
const containerVariants: any = {
  hidden: { opacity: 0.96, scale: 0.985 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: cubicEasing,
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: cubicEasing,
      staggerChildren: 0.1,
    }
  }
};

// Internal items like headings, tags, descriptions
const itemVariants: any = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: cubicEasing,
    }
  }
};

// Checkmarks and icons
const popVariants: any = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  }
};

export const AnimatedHeroCardsSection: React.FC = () => {
  return (
    <Parallax offset={30} className="relative pb-28 md:pb-40 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
      >
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 p-6 sm:p-8 bg-[#050505] rounded-[36px] border-2 border-[#050505] shadow-retro-lg">
          
          {/* Card 1: Periwinkle Blue Hero Card (#6F86F5) */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, rotate: -1, scale: 1.02, boxShadow: '8px 12px 0px #050505' }}
            className="h-full relative p-6 rounded-[28px] bg-[#6F86F5] text-white flex flex-col justify-between border-2 border-[#050505] shadow-[4px_4px_0px_#050505] overflow-hidden group transition-all duration-300"
          >
            <motion.div 
              variants={itemVariants} 
              className="absolute top-0 right-6 w-5 h-8 bookmark-ribbon-yellow shadow-sm group-hover:-translate-y-1 transition-transform duration-300" 
            />
            
            <div className="space-y-1">
              <motion.span variants={itemVariants} className="px-3 py-0.5 rounded-full bg-white text-[#050505] border-2 border-[#050505] text-[10px] font-black uppercase tracking-wider inline-block">
                Top 2% Fit
              </motion.span>
              <motion.h3 variants={itemVariants} className="text-2xl font-black tracking-tight mt-2 text-white">
                89% MATCH
              </motion.h3>
              <motion.p variants={itemVariants} className="text-white/90 text-xs font-semibold leading-relaxed">
                Strong alignment with past FinPulse & Next.js projects.
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="my-4 flex items-center justify-center">
              <motion.div 
                className="p-3 bg-white rounded-2xl border-2 border-[#050505] shadow-[2px_2px_0px_#050505] inline-block group-hover:-translate-y-1 transition-transform duration-300"
              >
                <AnimatedScoreRing score={89} />
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center justify-between pt-2 border-t-2 border-[#050505]/20">
              <motion.span variants={popVariants} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#4DBA76] text-white text-xs font-black border-2 border-[#050505] shadow-[2px_2px_0px_#050505]">
                <CheckCircle2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                APPLY
              </motion.span>
              <div className="w-8 h-8 rounded-full bg-[#050505] text-white flex items-center justify-center font-black text-sm border-2 border-[#050505] shadow-[2px_2px_0px_#050505] group-hover:translate-x-1 transition-transform">
                →
              </div>
            </motion.div>
          </motion.div>

          {/* Card 2: Buttercup Yellow Card (#FFD51F) */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, rotate: 1, scale: 1.02, boxShadow: '8px 12px 0px #050505' }}
            className="h-full relative p-6 rounded-[28px] bg-[#FFD51F] text-[#050505] flex flex-col justify-between border-2 border-[#050505] shadow-[4px_4px_0px_#050505] overflow-hidden group transition-all duration-300"
          >
            <motion.div variants={itemVariants} className="absolute top-0 right-6 w-5 h-8 bookmark-ribbon-pink shadow-sm group-hover:-translate-y-1 transition-transform duration-300" />
            
            <div>
              <motion.div variants={itemVariants} className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#050505] text-white text-[10px] font-black uppercase tracking-wider">
                  5 Tips
                </span>
                <span className="text-[11px] font-black text-[#050505]/80">Pricing Radar</span>
              </motion.div>
              <motion.h3 variants={itemVariants} className="text-xl font-black tracking-tight mt-2 text-[#050505]">
                Budget Fit: Strong
              </motion.h3>
              <motion.p variants={itemVariants} className="text-[#050505]/90 text-xs font-bold mt-1">
                Stated: ₹4,500 • Range: ₹4.2k–₹4.8k
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="my-3 p-3.5 rounded-2xl bg-white border-2 border-[#050505] shadow-[2px_2px_0px_#050505] space-y-2 group-hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-[#050505]/70">Estimated Effort:</span>
                <span className="font-black text-[#050505]">42–48 hrs</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-[#050505]/70">Your Standard Floor:</span>
                <span className="font-black text-[#4DBA76]">₹3,800</span>
              </div>
              <div className="w-full bg-[#F7F7F5] border border-[#050505] h-2.5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '84%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5, ease: cubicEasing }}
                  className="bg-[#050505] h-full rounded-full" 
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center justify-between text-xs font-black">
              <span>3 Milestones</span>
              <div className="w-8 h-8 rounded-full bg-[#050505] text-white flex items-center justify-center text-sm font-bold border-2 border-[#050505] shadow-[2px_2px_0px_#050505] group-hover:translate-x-1 transition-transform">
                →
              </div>
            </motion.div>
          </motion.div>

          {/* Card 3: Soft Pink Card (#F2A4DE) */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, rotate: -2, scale: 1.02, boxShadow: '8px 12px 0px #050505' }}
            className="h-full relative p-6 rounded-[28px] bg-[#F2A4DE] text-[#050505] flex flex-col justify-between border-2 border-[#050505] shadow-[4px_4px_0px_#050505] overflow-hidden group transition-all duration-300"
          >
            <motion.div variants={itemVariants} className="absolute top-0 right-6 w-5 h-8 bookmark-ribbon-yellow shadow-sm group-hover:-translate-y-1 transition-transform duration-300" />
            
            <div>
              <motion.div variants={itemVariants} className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#050505] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                  Daily Radar
                </span>
                <span className="text-[11px] font-black text-[#050505]/80">April 4</span>
              </motion.div>
              <motion.h3 variants={itemVariants} className="text-xl font-black tracking-tight mt-2 text-[#050505]">
                Verified Client
              </motion.h3>
              <motion.p variants={itemVariants} className="text-[#050505]/85 text-xs font-bold mt-1">
                Lumina Data Inc. • ₹118k+ spent
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="my-3 p-3 rounded-2xl bg-white text-[#050505] border-2 border-[#050505] shadow-[2px_2px_0px_#050505] space-y-1.5 group-hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center justify-between border-b border-[#050505]/15 pb-1 text-[11px] font-bold text-[#050505]/60 uppercase tracking-wider">
                <span>Calendar Schedule</span>
                <span className="text-[#4DBA76] font-extrabold">Fast Payout</span>
              </div>
              <div className="flex items-center gap-2 pt-0.5">
                <motion.div variants={popVariants} className="w-10 h-10 rounded-xl bg-[#FFF39A] border-2 border-[#050505] text-[#050505] flex flex-col items-center justify-center font-black leading-none shadow-[2px_2px_0px_#050505]">
                  <span className="text-[9px] uppercase">Apr</span>
                  <span className="text-sm font-black">04</span>
                </motion.div>
                <div className="text-xs">
                  <p className="font-black text-[#050505]">Kickoff Milestone</p>
                  <p className="text-[11px] font-semibold text-[#050505]/70">Zero Escrow Disputes</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-white border-2 border-[#050505] text-xs font-black text-[#4DBA76] shadow-[2px_2px_0px_#050505]">
                Client Risk: Low (18/100)
              </span>
              <div className="w-8 h-8 rounded-full bg-[#050505] text-white flex items-center justify-center text-sm font-bold border-2 border-[#050505] shadow-[2px_2px_0px_#050505] group-hover:translate-x-1 transition-transform">
                →
              </div>
            </motion.div>
          </motion.div>

          {/* Card 4: Sunset Orange Card (#FF941D) */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, rotate: 2, scale: 1.02, boxShadow: '8px 12px 0px #050505' }}
            className="h-full relative p-6 rounded-[28px] bg-[#FF941D] text-white flex flex-col justify-between border-2 border-[#050505] shadow-[4px_4px_0px_#050505] overflow-hidden group transition-all duration-300"
          >
            <div>
              <motion.span variants={itemVariants} className="px-2.5 py-0.5 rounded-full bg-[#050505] text-white text-[10px] font-black uppercase tracking-wider inline-block">
                Unspoken Scope
              </motion.span>
              <motion.h3 variants={itemVariants} className="text-xl font-black tracking-tight mt-2">
                4 Hidden Needs
              </motion.h3>
              <motion.p variants={itemVariants} className="text-white/95 text-xs font-semibold mt-1">
                Inferred from architectural dependencies
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="my-3 space-y-2 text-xs">
              {[
                { text: 'Stripe Idempotency', infer: true },
                { text: 'Supabase Tenant RLS', infer: true }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="p-2.5 rounded-xl bg-white text-[#050505] border-2 border-[#050505] shadow-[2px_2px_0px_#050505] flex items-center justify-between font-bold group-hover:-translate-y-1 transition-transform"
                  style={{ transitionDelay: `${idx * 0.1}s` }}
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4DBA76]" />
                    {item.text}
                  </span>
                  {item.infer && <span className="text-[10px] bg-[#FFD51F] px-2 py-0.5 rounded-full font-black border border-[#050505]">Inferred</span>}
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center justify-between pt-2 border-t-2 border-[#050505]/20">
              <span className="text-xs font-black">Zero Scope Creep</span>
              <div className="w-8 h-8 rounded-full bg-[#050505] text-white flex items-center justify-center text-sm font-black border-2 border-[#050505] shadow-[2px_2px_0px_#050505] group-hover:translate-x-1 transition-transform">
                →
              </div>
            </motion.div>
          </motion.div>

          {/* Card 5: Soft Lavender Card (#CDB3F4) */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.01, boxShadow: '8px 12px 0px #050505' }}
            className="h-full relative p-6 rounded-[28px] bg-[#CDB3F4] text-[#050505] flex flex-col justify-between border-2 border-[#050505] shadow-[4px_4px_0px_#050505] overflow-hidden group transition-all duration-300 sm:col-span-2"
          >
            <motion.div variants={itemVariants} className="absolute top-0 right-8 w-5 h-8 bookmark-ribbon-pink shadow-sm group-hover:-translate-y-1 transition-transform duration-300" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="max-w-sm">
                <motion.div variants={itemVariants} className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#050505] text-white text-[10px] font-black uppercase tracking-wider">
                    4 Tips
                  </span>
                  <span className="text-[11px] font-black text-[#050505]/80">Turn-Around Speed</span>
                </motion.div>
                <motion.h3 variants={itemVariants} className="text-xl font-black tracking-tight mt-1 text-[#050505]">
                  Truth-Checked Winning Proposals
                </motion.h3>
                <motion.p variants={itemVariants} className="text-[#050505]/80 text-xs font-semibold mt-0.5">
                  Never hallucinate experience or overpromise. Stand out with technical precision.
                </motion.p>
              </div>

              <motion.div variants={itemVariants} className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white border-2 border-[#050505] shadow-[2px_2px_0px_#050505] text-[#050505] font-black text-xs group-hover:-translate-y-1 transition-transform duration-300">
                  <motion.span variants={popVariants} className="w-6 h-6 rounded-full bg-[#6F86F5] text-white flex items-center justify-center font-black text-[11px] shadow-[2px_2px_0px_#050505]">
                    24h
                  </motion.span>
                  <span>Fast Client Response</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#050505] text-white flex items-center justify-center text-sm font-black border-2 border-[#050505] shadow-[2px_2px_0px_#050505] shrink-0 group-hover:translate-x-1 transition-transform duration-300">
                  →
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </Parallax>
  );
};

// --- Custom Internal Components ---

const AnimatedScoreRing = ({ score }: { score: number }) => {
  const size = 105;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200; 
    const startTime = performance.now();
    let frameId: number;
    
    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.floor(ease * score));
      
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setAnimatedScore(score);
      }
    };
    
    // Slight delay so the card reveals first
    const timer = setTimeout(() => {
      frameId = requestAnimationFrame(animate);
    }, 400);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameId);
    };
  }, [score]);

  return (
    <div className="relative inline-flex flex-col items-center justify-center shrink-0">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F7F7F5"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#36B37E"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: circumference - (score / 100) * circumference }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4, ease: cubicEasing }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
        <span className="font-black text-3xl text-[#050505] tracking-tight leading-none">{animatedScore}%</span>
        <span className="text-[10px] font-bold text-[#050505]/60 uppercase tracking-wider mt-1 leading-none">Match</span>
      </div>
    </div>
  );
};
