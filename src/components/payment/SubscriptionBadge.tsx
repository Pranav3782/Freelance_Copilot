import React from 'react';
import { Crown } from 'lucide-react';

interface SubscriptionBadgeProps {
  size?: 'sm' | 'md';
}

export const SubscriptionBadge: React.FC<SubscriptionBadgeProps> = ({ size = 'md' }) => {
  if (size === 'sm') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFD51F] text-[#050505] text-[9px] font-black uppercase tracking-wider border-2 border-[#050505] shadow-retro-sm whitespace-nowrap">
        <Crown className="w-2.5 h-2.5" />
        Pro
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD51F] text-[#050505] text-[10px] font-black uppercase tracking-wider border-2 border-[#050505] shadow-retro-sm whitespace-nowrap">
      <Crown className="w-3 h-3" />
      Pro Member
    </span>
  );
};
