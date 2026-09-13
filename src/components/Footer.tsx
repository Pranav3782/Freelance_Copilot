import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';
import { AppView } from '../types'; // I should define this type if it isn't, but I can just use string

interface FooterProps {
  onNavigate: (view: any) => void; // I'll use any or string
  onOpenAnalyzeModal: () => void;
  isAuthenticated: boolean;
}

const cubicEasing = [0.22, 1, 0.36, 1] as any;

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAnalyzeModal, isAuthenticated }) => {
  return (
    <footer className="bg-[#050505] text-[#F7F7F5] border-t-2 border-[#050505] pt-12 sm:pt-20 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#6F86F5]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-[#E747A8]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 pb-10 sm:pb-16 border-b border-[#F7F7F5]/20">
          
          {/* Brand Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: cubicEasing }}
            className="md:col-span-5 space-y-4 sm:space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FFF39A] border-2 border-[#F7F7F5] flex items-center justify-center shadow-[2px_2px_0px_#F7F7F5] shrink-0">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#050505]" />
              </div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#F7F7F5]">
                FreelanceOS
              </span>
            </div>
            
            <p className="text-[#F7F7F5]/80 font-bold text-base sm:text-lg max-w-sm leading-relaxed">
              Your AI copilot for smarter freelance opportunities.
            </p>

            <button 
              onClick={onOpenAnalyzeModal}
              className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-[#6F86F5] text-white border-2 border-[#F7F7F5] shadow-[4px_4px_0px_#F7F7F5] hover:translate-y-[-2px] hover:shadow-[4px_6px_0px_#F7F7F5] transition-all duration-200 font-black text-xs sm:text-sm"
            >
              LET'S FIND A GOOD ONE
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: cubicEasing }}
              className="space-y-4"
            >
              <h4 className="font-black text-[#F7F7F5] text-sm uppercase tracking-wider">Product</h4>
              <ul className="space-y-3">
                <li><button onClick={onOpenAnalyzeModal} className="text-[#F7F7F5]/70 hover:text-[#FFD51F] font-semibold text-sm transition-colors text-left">Analyze Project</button></li>
                <li><button onClick={() => onNavigate(isAuthenticated ? 'dashboard' : 'landing')} className="text-[#F7F7F5]/70 hover:text-[#FFD51F] font-semibold text-sm transition-colors text-left">Dashboard</button></li>
                <li><button onClick={() => onNavigate('landing')} className="text-[#F7F7F5]/70 hover:text-[#FFD51F] font-semibold text-sm transition-colors text-left">Features</button></li>
                <li><button onClick={() => onNavigate('how-it-works')} className="text-[#F7F7F5]/70 hover:text-[#FFD51F] font-semibold text-sm transition-colors text-left">How It Works</button></li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: cubicEasing }}
              className="space-y-4"
            >
              <h4 className="font-black text-[#F7F7F5] text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-3">
                <li><button onClick={() => onNavigate('about')} className="text-[#F7F7F5]/70 hover:text-[#F2A4DE] font-semibold text-sm transition-colors text-left">About</button></li>
                <li><button onClick={() => onNavigate('contact')} className="text-[#F7F7F5]/70 hover:text-[#F2A4DE] font-semibold text-sm transition-colors text-left">Contact</button></li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: cubicEasing }}
              className="space-y-4"
            >
              <h4 className="font-black text-[#F7F7F5] text-sm uppercase tracking-wider">Legal</h4>
              <ul className="space-y-3">
                <li><button onClick={() => onNavigate('privacy')} className="text-[#F7F7F5]/70 hover:text-[#4DBA76] font-semibold text-sm transition-colors text-left">Privacy Policy</button></li>
                <li><button onClick={() => onNavigate('terms')} className="text-[#F7F7F5]/70 hover:text-[#4DBA76] font-semibold text-sm transition-colors text-left">Terms & Conditions</button></li>
              </ul>
            </motion.div>
          </div>

        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-[#F7F7F5]/60 font-semibold text-sm text-center md:text-left">
            © 2026 FreelanceOS. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-full bg-[#111111] border border-[#F7F7F5]/20 flex items-center gap-2 font-black text-sm text-[#F7F7F5]">
              Designed & built by <span className="text-[#FFD51F]">Surya</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
