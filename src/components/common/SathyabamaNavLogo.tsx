import React from 'react';

interface SathyabamaNavLogoProps {
  className?: string;
  variant?: 'banner' | 'compact' | 'full';
  onClick?: () => void;
}

export const SathyabamaNavLogo: React.FC<SathyabamaNavLogoProps> = ({
  className = '',
  variant = 'banner',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center cursor-pointer select-none transition-transform hover:scale-[1.01] active:scale-[0.99] ${className}`}
      title="Sathyabama Institute of Science and Technology - Category 1 University by UGC"
    >
      {/* Official Sathyabama Maroon Brand Banner matching the uploaded screenshot */}
      <div className="flex items-center bg-[#70092B] text-white px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg shadow-sm border border-[#580520] gap-2.5 sm:gap-3.5">
        {/* Left: Official SIST Monochrome White Crest */}
        <div className="shrink-0 flex items-center justify-center">
          <svg
            viewBox="0 0 160 170"
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 overflow-visible"
            fill="none"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Academic Mortarboard Cap on Top */}
            <path d="M 45 28 L 115 28 L 105 40 L 55 40 Z" fill="white" stroke="white" strokeWidth="1" />
            <polygon points="80,10 142,24 80,38 18,24" fill="white" stroke="white" strokeWidth="1.5" />
            <path d="M 80 24 Q 106 18, 116 28 Q 120 36, 118 46" fill="none" stroke="white" strokeWidth="2.5" />
            <rect x="114" y="44" width="7" height="12" rx="1" fill="white" />

            {/* Laurel Wreath - Left Branch */}
            <path
              d="M 48 118 C 30 98, 22 62, 52 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            />
            <path d="M 28 38 C 16 34, 20 48, 36 44 Z" fill="white" stroke="white" strokeWidth="0.5" />
            <path d="M 22 60 C 8 58, 12 70, 28 66 Z" fill="white" stroke="white" strokeWidth="0.5" />
            <path d="M 18 84 C 6 82, 10 94, 26 89 Z" fill="white" stroke="white" strokeWidth="0.5" />
            <path d="M 22 106 C 10 110, 18 120, 32 112 Z" fill="white" stroke="white" strokeWidth="0.5" />
            <path d="M 34 124 C 24 130, 32 140, 44 130 Z" fill="white" stroke="white" strokeWidth="0.5" />

            {/* Laurel Wreath - Right Branch */}
            <path
              d="M 112 118 C 130 98, 138 62, 108 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            />
            <path d="M 132 38 C 144 34, 140 48, 124 44 Z" fill="white" stroke="white" strokeWidth="0.5" />
            <path d="M 138 60 C 152 58, 148 70, 132 66 Z" fill="white" stroke="white" strokeWidth="0.5" />
            <path d="M 142 84 C 154 82, 150 94, 134 89 Z" fill="white" stroke="white" strokeWidth="0.5" />
            <path d="M 138 106 C 150 110, 142 120, 128 112 Z" fill="white" stroke="white" strokeWidth="0.5" />
            <path d="M 126 124 C 136 130, 128 140, 116 130 Z" fill="white" stroke="white" strokeWidth="0.5" />

            {/* Central Shield Outline */}
            <path
              d="M 52 46 L 108 46 C 108 46, 114 96, 108 108 C 102 124, 80 136, 80 136 C 80 136, 58 124, 52 108 C 46 96, 52 46, 52 46 Z"
              fill="none"
              stroke="white"
              strokeWidth="3.5"
            />
            <path
              d="M 56 50 L 104 50 C 104 50, 110 94, 105 105 C 100 120, 80 131, 80 131 C 80 131, 60 120, 55 105 C 50 94, 56 50, 56 50 Z"
              fill="none"
              stroke="white"
              strokeWidth="1.2"
            />

            {/* Top Text Inside Shield: SIST */}
            <text
              x="80"
              y="59"
              textAnchor="middle"
              fill="white"
              stroke="none"
              fontSize="9"
              fontWeight="900"
              fontFamily="sans-serif"
              letterSpacing="1"
            >
              SIST
            </text>
            <line x1="56" y1="62" x2="104" y2="62" stroke="white" strokeWidth="1.2" />

            {/* Shield Partition Lines */}
            <line x1="80" y1="62" x2="80" y2="98" stroke="white" strokeWidth="1.5" />
            <line x1="56" y1="98" x2="104" y2="98" stroke="white" strokeWidth="1.5" />

            {/* Top Left: Computer Monitor */}
            <g transform="translate(60, 66)">
              <rect x="0" y="0" width="14" height="12" rx="1" fill="none" stroke="white" strokeWidth="1.2" />
              <rect x="2" y="2" width="10" height="8" fill="none" stroke="white" strokeWidth="0.8" />
              <line x1="7" y1="12" x2="7" y2="15" stroke="white" strokeWidth="1.2" />
              <line x1="3" y1="15" x2="11" y2="15" stroke="white" strokeWidth="1.2" />
              <polygon points="1,17 13,17 12,21 2,21" fill="none" stroke="white" strokeWidth="0.8" />
            </g>

            {/* Top Right: Satellite Dish Antenna */}
            <g transform="translate(86, 67)">
              <ellipse cx="9" cy="8" rx="7" ry="5" transform="rotate(-30 9 8)" fill="none" stroke="white" strokeWidth="1.2" />
              <line x1="9" y1="8" x2="13" y2="5" stroke="white" strokeWidth="1.2" />
              <circle cx="13" cy="5" r="1" fill="white" />
              <line x1="9" y1="13" x2="9" y2="18" stroke="white" strokeWidth="1.2" />
              <line x1="5" y1="18" x2="13" y2="18" stroke="white" strokeWidth="1.2" />
            </g>

            {/* Bottom: Cogwheel Gear */}
            <g transform="translate(80, 114)">
              <circle cx="0" cy="0" r="5" fill="none" stroke="white" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="2.5" fill="white" stroke="none" />
              {/* Teeth */}
              <line x1="0" y1="-8" x2="0" y2="8" stroke="white" strokeWidth="2.2" />
              <line x1="-8" y1="0" x2="8" y2="0" stroke="white" strokeWidth="2.2" />
              <line x1="-5.5" y1="-5.5" x2="5.5" y2="5.5" stroke="white" strokeWidth="2.2" />
              <line x1="-5.5" y1="5.5" x2="5.5" y2="-5.5" stroke="white" strokeWidth="2.2" />
            </g>

            {/* Ribbon Banner at Bottom */}
            <path
              d="M 32 135 L 128 135 L 120 147 L 40 147 Z"
              fill="white"
              stroke="white"
              strokeWidth="1"
            />
            <text
              x="80"
              y="144"
              textAnchor="middle"
              fill="#70092B"
              stroke="none"
              fontSize="6"
              fontWeight="900"
              fontFamily="sans-serif"
              letterSpacing="0.4"
            >
              JUSTICE PEACE REVOLUTION
            </text>

            {/* Curved Text Underneath */}
            <text
              x="80"
              y="157"
              textAnchor="middle"
              fill="white"
              stroke="none"
              fontSize="4.2"
              fontWeight="700"
              fontFamily="sans-serif"
            >
              SATHYABAMA INSTITUTE OF SCIENCE AND TECHNOLOGY
            </text>
            <text
              x="80"
              y="163"
              textAnchor="middle"
              fill="white"
              stroke="none"
              fontSize="3.8"
              fontWeight="600"
              fontFamily="sans-serif"
            >
              DEEMED UNIVERSITY
            </text>
          </svg>
        </div>

        {/* Right: Institutional Typography matching the screenshot banner */}
        <div className="flex flex-col justify-center text-left">
          {/* Main Title: SATHYABAMA */}
          <div className="flex items-center">
            <span className="font-black text-base sm:text-xl lg:text-2xl tracking-[0.14em] sm:tracking-[0.18em] text-white leading-none font-sans drop-shadow-xs">
              SATHYABAMA
            </span>
          </div>

          {/* White Horizontal Dividing Line */}
          <div className="w-full h-[1.5px] bg-white my-0.5 sm:my-1 opacity-95" />

          {/* Subtitle 1: INSTITUTE OF SCIENCE AND TECHNOLOGY */}
          <span className="font-extrabold text-[8px] sm:text-[10px] lg:text-[11px] tracking-[0.12em] sm:tracking-[0.15em] text-white leading-tight uppercase font-sans">
            INSTITUTE OF SCIENCE AND TECHNOLOGY
          </span>

          {/* Subtitle 2: (DEEMED TO BE UNIVERSITY) */}
          <span className="font-bold text-[7px] sm:text-[8.5px] lg:text-[9.5px] tracking-[0.1em] text-white/95 leading-tight uppercase font-sans mt-0.5">
            (DEEMED TO BE UNIVERSITY)
          </span>

          {/* Subtitle 3: CATEGORY - 1 UNIVERSITY BY UGC */}
          <span className="font-extrabold text-[7.5px] sm:text-[9px] lg:text-[10px] tracking-[0.12em] sm:tracking-[0.14em] text-white leading-tight uppercase font-sans mt-0.5">
            CATEGORY - 1 UNIVERSITY BY UGC
          </span>
        </div>
      </div>
    </div>
  );
};
