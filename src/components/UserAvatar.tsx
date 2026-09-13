import React from 'react';

interface UserAvatarProps {
  seed?: string;
  size?: number;
  className?: string;
  avatarId?: string;
}

// Color Palettes derived from reference style
const BG_COLORS = [
  '#4DBA76', // Emerald Teal (Reference Image)
  '#6F86F5', // Periwinkle Blue
  '#FF941D', // Warm Orange
  '#CDB3F4', // Soft Lavender
  '#F2A4DE', // Pastel Pink
  '#36B37E', // Fresh Mint
  '#FFC400', // Bright Amber
  '#4C9AFF', // Sky Blue
];

const SKIN_TONES = [
  { skin: '#C67B48', ear: '#B36A38', shadow: '#9E5B2D' }, // Warm Caramel (Reference)
  { skin: '#D58D5D', ear: '#C37C4D', shadow: '#AC693C' }, // Golden Bronze
  { skin: '#A35D38', ear: '#904E2B', shadow: '#7C4020' }, // Deep Chestnut
  { skin: '#E8B68F', ear: '#D7A37C', shadow: '#C08D67' }, // Fair Peach
  { skin: '#BD764A', ear: '#A9643B', shadow: '#93532C' }, // Warm Ochre
];

const SHIRT_COLORS = [
  '#3584E4', // Bright Royal Blue (Reference)
  '#E05D5E', // Coral Red
  '#9141AC', // Deep Purple
  '#E5A50A', // Golden Yellow
  '#2EC27E', // Vivid Green
  '#1C71D8', // Cobalt Blue
];

const HAIR_COLORS = [
  '#2C2C2C', // Dark Charcoal (Reference)
  '#1A1A1A', // Jet Black
  '#3D261A', // Espresso Brown
  '#4A3B32', // Deep Chestnut
];

function stringToHash(str: string): number {
  let hash = 0;
  if (!str || str.length === 0) return 42;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  seed = 'default-user',
  avatarId,
  size = 64,
  className = '',
}) => {
  const effectiveSeed = avatarId || seed || 'freelanceos-user';
  const hash = stringToHash(effectiveSeed);

  const bg = BG_COLORS[hash % BG_COLORS.length];
  const skinObj = SKIN_TONES[(hash >> 2) % SKIN_TONES.length];
  const shirt = SHIRT_COLORS[(hash >> 4) % SHIRT_COLORS.length];
  const hairColor = HAIR_COLORS[(hash >> 6) % HAIR_COLORS.length];

  // Eyewear variant (cream white frames like reference image)
  const glassesVariant = hash % 3; // 0: White thick rimmed, 1: Round specs, 2: Oval retro
  const glassesFrameColor = (hash >> 3) % 2 === 0 ? '#F7F7F5' : '#FFF39A';
  const lensColor = '#2D221E';

  // Hair style variant (0: Curly textured top like reference, 1: Wavy fade, 2: Rounded crop, 3: High volume top)
  const hairStyle = (hash >> 5) % 4;

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-2xl border-2 border-[#050505] shadow-retro-sm select-none shrink-0 ${className}`}
      style={{ width: size, height: size, backgroundColor: bg }}
    >
      <svg
        viewBox="0 0 120 120"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Fill */}
        <rect width="120" height="120" fill={bg} />

        {/* Ears */}
        <circle cx="33" cy="62" r="7" fill={skinObj.ear} />
        <circle cx="87" cy="62" r="7" fill={skinObj.ear} />

        {/* Head / Face Shape (Soft Rounded Square like reference) */}
        <rect
          x="37"
          y="42"
          width="46"
          height="46"
          rx="14"
          fill={skinObj.skin}
        />

        {/* Hair Styles */}
        {hairStyle === 0 && (
          // Textured Curly Top (Exact Reference Style)
          <path
            d="M36 45C36 36 43 28 60 28C77 28 84 36 84 45C84 46 83 48 83 48C80 44 76 43 71 44C67 42 63 42 60 43C57 42 53 42 49 44C44 43 40 44 37 48C37 48 36 46 36 45Z"
            fill={hairColor}
          />
        )}
        {hairStyle === 0 && (
          // Extra curly bumps for volume
          <g fill={hairColor}>
            <circle cx="43" cy="33" r="7" />
            <circle cx="53" cy="30" r="8" />
            <circle cx="65" cy="30" r="8" />
            <circle cx="76" cy="33" r="7" />
          </g>
        )}

        {hairStyle === 1 && (
          // Wavy Parted Hair
          <path
            d="M36 44C36 33 46 29 60 29C74 29 84 33 84 44C84 44 76 36 60 36C44 36 36 44 36 44Z"
            fill={hairColor}
          />
        )}
        {hairStyle === 1 && (
          <path
            d="M36 38C40 31 52 30 60 33C68 30 80 31 84 38C80 32 70 28 60 28C50 28 40 32 36 38Z"
            fill={hairColor}
          />
        )}

        {hairStyle === 2 && (
          // Rounded Afro Crop
          <path
            d="M35 48C33 40 40 28 60 28C80 28 87 40 85 48C85 43 78 35 60 35C42 35 35 43 35 48Z"
            fill={hairColor}
          />
        )}
        {hairStyle === 2 && (
          <circle cx="60" cy="32" r="14" fill={hairColor} />
        )}

        {hairStyle === 3 && (
          // Modern Side Crop
          <path
            d="M36 46C36 35 44 30 60 30C76 30 84 35 84 46C80 40 72 37 60 37C48 37 40 40 36 46Z"
            fill={hairColor}
          />
        )}
        {hairStyle === 3 && (
          <path
            d="M40 34C48 27 72 27 80 34C75 29 67 27 60 27C53 27 45 29 40 34Z"
            fill={hairColor}
          />
        )}

        {/* Glasses & Eyes */}
        {glassesVariant === 0 && (
          // Signature White/Cream Glasses (Reference Match)
          <g>
            {/* Left Lens Background */}
            <circle cx="48" cy="57" r="10" fill={glassesFrameColor} />
            <circle cx="48" cy="57" r="7" fill={lensColor} />
            <circle cx="50" cy="55" r="2.5" fill="#FFFFFF" opacity="0.9" />

            {/* Right Lens Background */}
            <circle cx="72" cy="57" r="10" fill={glassesFrameColor} />
            <circle cx="72" cy="57" r="7" fill={lensColor} />
            <circle cx="74" cy="55" r="2.5" fill="#FFFFFF" opacity="0.9" />

            {/* Bridge */}
            <rect x="56" y="55" width="8" height="4" rx="2" fill={glassesFrameColor} />
          </g>
        )}

        {glassesVariant === 1 && (
          // Round Chunky Specs
          <g>
            <rect x="39" y="50" width="18" height="15" rx="5" fill={glassesFrameColor} />
            <rect x="41" y="52" width="14" height="11" rx="4" fill={lensColor} />
            <circle cx="44" cy="55" r="2" fill="#FFFFFF" opacity="0.8" />

            <rect x="63" y="50" width="18" height="15" rx="5" fill={glassesFrameColor} />
            <rect x="65" y="52" width="14" height="11" rx="4" fill={lensColor} />
            <circle cx="68" cy="55" r="2" fill="#FFFFFF" opacity="0.8" />

            <rect x="56" y="55" width="8" height="3" fill={glassesFrameColor} />
          </g>
        )}

        {glassesVariant === 2 && (
          // Retro Oval Wayfarer
          <g>
            <path
              d="M38 52C38 49 43 49 48 49C53 49 58 49 58 52C58 60 54 64 48 64C42 64 38 60 38 52Z"
              fill={glassesFrameColor}
            />
            <path
              d="M40 53C40 51 44 51 48 51C52 51 56 51 56 53C56 59 53 62 48 62C43 62 40 59 40 53Z"
              fill={lensColor}
            />
            <circle cx="43" cy="55" r="2" fill="#FFFFFF" opacity="0.85" />

            <path
              d="M62 52C62 49 67 49 72 49C77 49 82 49 82 52C82 60 78 64 72 64C66 64 62 60 62 52Z"
              fill={glassesFrameColor}
            />
            <path
              d="M64 53C64 51 68 51 72 51C76 51 80 51 80 53C80 59 77 62 72 62C67 62 64 59 64 53Z"
              fill={lensColor}
            />
            <circle cx="67" cy="55" r="2" fill="#FFFFFF" opacity="0.85" />

            <rect x="57" y="54" width="6" height="3" rx="1.5" fill={glassesFrameColor} />
          </g>
        )}

        {/* Nose */}
        <path
          d="M58 67C58 65.5 60 64.5 61 66C61.5 67 62 67.5 60 68.5C59 69 58 68.5 58 67Z"
          fill="#7C3B24"
        />

        {/* Mouth (Friendly Smirk Line like reference) */}
        <path
          d="M52 74C56 78 64 78 68 73"
          stroke="#4D2214"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Shirt / Body Base (Trapezoid shoulders) */}
        <path
          d="M42 88L60 120L78 88H42Z"
          fill={shirt}
        />
        <path
          d="M26 120L42 88H78L94 120H26Z"
          fill={shirt}
        />
      </svg>
    </div>
  );
};
