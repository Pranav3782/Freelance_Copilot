import React from 'react';

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  showText?: boolean;
  className?: string;
  trackColor?: string;
  textColor?: string;
}

export const ScoreRing: React.FC<ScoreRingProps> = ({
  score,
  size = 120,
  strokeWidth = 10,
  label,
  showText = true,
  className = '',
  trackColor = '#262638',
  textColor = 'text-white',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let strokeColor = '#36B37E'; // Green for APPLY (>= 80)
  if (score < 50) {
    strokeColor = '#EF4444'; // Red for DON'T APPLY
  } else if (score < 80) {
    strokeColor = '#FF941F'; // Orange/Yellow for MAYBE
  }

  const fontSizeClass =
    size < 50
      ? 'text-[10px]'
      : size < 70
      ? 'text-xs'
      : size < 95
      ? 'text-sm sm:text-base'
      : size < 130
      ? 'text-2xl'
      : 'text-3xl';

  return (
    <div className={`relative inline-flex flex-col items-center justify-center shrink-0 ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {showText && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
          <span className={`font-black ${fontSizeClass} ${textColor} tracking-tight leading-none`}>{score}%</span>
          {label && <span className="text-[10px] font-bold text-[#050505]/60 uppercase tracking-wider mt-1 leading-none">{label}</span>}
        </div>
      )}
    </div>
  );
};
