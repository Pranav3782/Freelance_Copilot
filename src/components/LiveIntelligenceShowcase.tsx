import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  AlertTriangle,
  Check,
  Zap,
  Sparkles,
  RefreshCcw,
  Search,
} from 'lucide-react';

interface LiveIntelligenceShowcaseProps {
  onOpenDashboard: () => void;
}

// Easing for premium feel
const cubicEasing = [0.22, 1, 0.36, 1] as any;

export const LiveIntelligenceShowcase: React.FC<LiveIntelligenceShowcaseProps> = ({ onOpenDashboard }) => {
  const [stage, setStage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });

  useEffect(() => {
    if (!isInView) return;

    let isMounted = true;
    const timeline = [
      { delay: 600, stage: 1 },  // AI begins scanning
      { delay: 1800, stage: 2 }, // Requirements extracted
      { delay: 3000, stage: 3 }, // Client research & sources
      { delay: 4500, stage: 4 }, // Fit dimensions & skills
      { delay: 6000, stage: 5 }, // Risk scanner completes
      { delay: 7200, stage: 6 }, // Hidden requirements & Pitch
      { delay: 8200, stage: 7 }, // Score completes
      { delay: 9000, stage: 8 }, // APPLY recommendation
    ];

    const runNext = (index: number) => {
      if (index >= timeline.length || !isMounted) return;
      const { delay, stage: nextStage } = timeline[index];
      const prevDelay = index === 0 ? 0 : timeline[index - 1].delay;
      const waitTime = delay - prevDelay;

      setTimeout(() => {
        if (!isMounted) return;
        setStage(nextStage);
        runNext(index + 1);
      }, waitTime);
    };

    runNext(0);

    return () => {
      isMounted = false;
    };
  }, [isInView]);

  const resetAnalysis = () => {
    setStage(0);
    setTimeout(() => {
      setStage(1); // jumpstart slightly
      let s = 1;
      const interval = setInterval(() => {
        s++;
        setStage(s);
        if (s >= 8) clearInterval(interval);
      }, 800);
    }, 100);
  };

  return (
    <section id="bento-preview" className="py-24 md:py-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: cubicEasing }}
        className="relative p-8 sm:p-12 rounded-[36px] bg-[#FFFFFF] border-2 border-[#050505] shadow-retro-lg space-y-8"
      >
        {/* Subtle Scanning Line when stage < 8 */}
        <AnimatePresence>
          {stage > 0 && stage < 8 && (
            <motion.div
              initial={{ top: '0%' }}
              animate={{ top: '100%' }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#6F86F5]/10 to-transparent pointer-events-none z-10"
              style={{ borderBottom: '1px solid rgba(111, 134, 245, 0.3)' }}
            />
          )}
        </AnimatePresence>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b-2 border-[#050505] pb-6 relative z-20">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#6F86F5] flex items-center gap-1.5">
                {stage < 8 ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-[#6F86F5]"
                  />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-[#4DBA76]" />
                )}
                Live Intelligence Sample
              </span>
              
              {stage === 8 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.4 }}
                  onClick={resetAnalysis}
                  className="p-1 rounded-full hover:bg-[#F7F7F5] border border-transparent hover:border-[#050505] text-[#050505]/60 hover:text-[#050505] transition-all"
                  title="Run analysis again"
                >
                  <RefreshCcw className="w-3.5 h-3.5" />
                </motion.button>
              )}
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-black text-[#050505] mt-1 relative inline-block">
              Enterprise AI Analytics Suite — High-Ticket Opportunity or Hidden Scope Trap?
              {stage > 0 && stage < 8 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -right-6 top-1"
                >
                  <Sparkles className="w-4 h-4 text-[#FFD51F]" />
                </motion.span>
              )}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            {/* APPLY Badge Reveal */}
            <AnimatePresence>
              {stage >= 8 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                  className="px-3.5 py-1.5 rounded-full bg-[#4DBA76] text-white font-black text-sm flex items-center gap-1.5 border-2 border-[#050505] shadow-[2px_2px_0px_#050505]"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  APPLY (89% Match)
                </motion.span>
              )}
            </AnimatePresence>
            <button
              onClick={onOpenDashboard}
              className="px-4 py-2 rounded-xl bg-[#6F86F5] text-white font-black text-xs border-2 border-[#050505] shadow-[2px_2px_0px_#050505] hover:shadow-[4px_4px_0px_#050505] hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              View Full Strategy →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-20">
          
          {/* 1. AI Activity Timeline */}
          <div className="p-6 rounded-2xl bg-[#F7F7F5] border-2 border-[#050505] shadow-[2px_2px_0px_#050505] flex flex-col justify-between">
            <div>
              <h4 className="font-black text-sm text-[#050505] mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#FFD51F]" />
                Analysis Log
              </h4>
              <div className="space-y-4">
                <TimelineRow 
                  label="Reading project" 
                  isActive={stage === 1} 
                  isDone={stage > 1} 
                />
                <TimelineRow 
                  label="Extracting requirements" 
                  isActive={stage === 2} 
                  isDone={stage > 2} 
                />
                <TimelineRow 
                  label="Researching client" 
                  isActive={stage === 3} 
                  isDone={stage > 3} 
                />
                <TimelineRow 
                  label="Matching profile" 
                  isActive={stage === 4} 
                  isDone={stage > 4} 
                />
                <TimelineRow 
                  label="Scanning risks" 
                  isActive={stage === 5} 
                  isDone={stage > 5} 
                />
                <TimelineRow 
                  label="Calculating score" 
                  isActive={stage >= 6 && stage < 8} 
                  isDone={stage >= 8} 
                />
              </div>
            </div>
            
            <div className="mt-6">
              <div className="w-full bg-white border-2 border-[#050505] h-2 rounded-full overflow-hidden relative">
                <motion.div 
                  className="bg-[#6F86F5] h-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${Math.min(100, (stage / 8) * 100)}%` }}
                  transition={{ duration: 0.5, ease: 'linear' }}
                />
                {stage > 0 && stage < 8 && (
                  <motion.div
                    className="absolute top-0 bottom-0 w-8 bg-white/40 blur-sm"
                    initial={{ left: '-10%' }}
                    animate={{ left: '110%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* 2. Score & Fit Dimensions */}
          <div className="p-6 rounded-2xl bg-[#F7F7F5] border-2 border-[#050505] shadow-[2px_2px_0px_#050505] flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 hover:shadow-[4px_4px_0px_#050505] transition-all">
            <div>
              <h4 className="font-black text-sm text-[#050505] mb-4">Fit Dimensions</h4>
              <div className="space-y-3 text-xs">
                <DimensionBar label="Skill Match" target={95} color="#4DBA76" stage={stage} showAtStage={4} />
                <DimensionBar label="Experience Match" target={90} color="#4DBA76" stage={stage} showAtStage={4} />
                <DimensionBar label="Portfolio Relevance" target={92} color="#6F86F5" stage={stage} showAtStage={4} />
                <DimensionBar label="Budget Alignment" target={84} color="#FF941D" stage={stage} showAtStage={4} />
              </div>
            </div>
            
            <AnimatePresence>
              {stage >= 4 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-4 mt-4 border-t-2 border-[#050505]/15 text-xs font-bold text-[#050505]/70 flex items-center justify-between"
                >
                  <span>Difficulty: Medium</span>
                  <span>Timeline: 4 Weeks</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. Risk Scan */}
          <div className="p-6 rounded-2xl bg-[#F7F7F5] border-2 border-[#050505] shadow-[2px_2px_0px_#050505] flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[4px_4px_0px_#050505] transition-all">
            <div>
              <h4 className="font-black text-sm text-[#050505] mb-3 flex items-center justify-between">
                <span>Client Risk Scanner</span>
                {stage >= 5 ? (
                  <motion.span 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-xs px-2 py-0.5 rounded-full bg-[#4DBA76] text-white font-black border border-[#050505]"
                  >
                    Safe (18/100)
                  </motion.span>
                ) : (
                  <span className="text-[10px] text-[#050505]/50 font-black uppercase tracking-wider">
                    {stage >= 3 ? "Scanning..." : "Waiting"}
                  </span>
                )}
              </h4>
              <div className="space-y-2 text-xs">
                <RiskItem 
                  text="Figma Assets 90% Ready" 
                  sub="Low scope churn during UI phase."
                  icon={<CheckCircle2 className="w-4 h-4 text-[#4DBA76] shrink-0 mt-0.5" />}
                  show={stage >= 5}
                  delay={0.1}
                />
                <RiskItem 
                  text="Established Enterprise" 
                  sub="₹118k+ spent, zero disputes."
                  icon={<CheckCircle2 className="w-4 h-4 text-[#4DBA76] shrink-0 mt-0.5" />}
                  show={stage >= 5}
                  delay={0.3}
                />
                <RiskItem 
                  text="Stripe Webhook Idempotency" 
                  sub="Requires error-handling retry queue."
                  icon={<AlertTriangle className="w-4 h-4 text-[#FF941D] shrink-0 mt-0.5" />}
                  show={stage >= 5}
                  delay={0.5}
                />
              </div>
            </div>
            
            <AnimatePresence>
              {stage >= 5 && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-[11px] font-bold text-[#050505]/70 mt-2 block"
                >
                  5 verified risk checks evaluated
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* 4. Proposal Angle */}
          <div className="p-6 rounded-2xl bg-[#FFF39A] border-2 border-[#050505] shadow-[2px_2px_0px_#050505] flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[4px_4px_0px_#050505] transition-all overflow-hidden relative">
            <AnimatePresence>
              {stage >= 6 ? (
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: cubicEasing }}
                  className="flex flex-col h-full justify-between"
                >
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#050505] text-white text-[10px] font-black uppercase tracking-wider inline-block mb-3">
                      Winning Pitch Angle
                    </span>
                    <h4 className="font-black text-base text-[#050505] mb-2 leading-tight">Lead with Supabase RLS & Idempotency</h4>
                    <p className="text-xs text-[#050505]/85 font-semibold leading-relaxed">
                      "Most applicants will talk about React styling. Stand out by assuring the client you will architect
                      cryptographically isolated tenant schemas..."
                    </p>
                  </div>
                  
                  <div className="mt-4 p-3 rounded-xl bg-white border-2 border-[#050505] shadow-retro-sm flex items-center justify-between text-xs font-bold">
                    <span className="text-[#050505]/70">Truth Checker:</span>
                    <span className="text-[#4DBA76] flex items-center gap-1 font-black">
                      <Check className="w-3.5 h-3.5" />
                      100% Verified
                    </span>
                  </div>
                </motion.div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-[#050505]/30">
                    <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <span className="text-xs font-black uppercase tracking-widest">Awaiting Analysis</span>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

// --- Micro Components ---

const TimelineRow = ({ label, isActive, isDone }: { label: string, isActive: boolean, isDone: boolean }) => {
  return (
    <div className="flex items-center gap-3 text-xs font-bold">
      <div className="w-5 h-5 relative flex items-center justify-center shrink-0">
        <AnimatePresence mode="wait">
          {isDone ? (
            <motion.div
              key="done"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-4 h-4 rounded-full bg-[#4DBA76] flex items-center justify-center"
            >
              <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
            </motion.div>
          ) : isActive ? (
            <motion.div
              key="active"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative w-3 h-3 flex items-center justify-center"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-[#6F86F5]"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <div className="w-2 h-2 rounded-full bg-[#6F86F5] relative z-10" />
            </motion.div>
          ) : (
            <motion.div
              key="pending"
              className="w-2 h-2 rounded-full bg-[#050505]/20"
            />
          )}
        </AnimatePresence>
      </div>
      <span className={`${isDone ? 'text-[#050505]' : isActive ? 'text-[#6F86F5]' : 'text-[#050505]/40'} transition-colors duration-300`}>
        {label}
        {isActive && (
          <span className="inline-flex ml-1">
            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}>.</motion.span>
            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}>.</motion.span>
            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}>.</motion.span>
          </span>
        )}
      </span>
    </div>
  );
};

const DimensionBar = ({ label, target, color, stage, showAtStage }: { label: string, target: number, color: string, stage: number, showAtStage: number }) => {
  const isVisible = stage >= showAtStage;
  
  return (
    <div>
      <div className="flex justify-between font-bold mb-1">
        <span className="text-[#050505]/70">{label}</span>
        <span style={{ color: isVisible ? color : '#050505' }} className="font-black opacity-90 transition-colors">
          {isVisible ? <AnimatedNumber value={target} /> : 0}%
        </span>
      </div>
      <div className="w-full bg-white border border-[#050505] h-2.5 rounded-full overflow-hidden">
        <motion.div 
          className="h-full rounded-full" 
          style={{ backgroundColor: color }}
          initial={{ width: '0%' }}
          animate={{ width: isVisible ? `${target}%` : '0%' }}
          transition={{ duration: 1, delay: 0.2, ease: cubicEasing }}
        />
      </div>
    </div>
  );
};

const RiskItem = ({ text, sub, icon, show, delay }: { text: string, sub: string, icon: React.ReactNode, show: boolean, delay: number }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay, duration: 0.4 }}
          className="p-2.5 rounded-xl bg-white border-2 border-[#050505] shadow-retro-sm flex items-start gap-2"
        >
          {icon}
          <div>
            <p className="font-black text-[#050505] leading-tight">{text}</p>
            <p className="text-[#050505]/70 text-[10px] font-medium mt-0.5">{sub}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AnimatedNumber = ({ value }: { value: number }) => {
  const [current, setCurrent] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const duration = 1000; 
    const startTime = performance.now();
    let frameId: number;
    
    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(ease * value));
      
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCurrent(value);
      }
    };
    
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [value]);
  
  return <>{current}</>;
};
