import React from 'react';

interface SathyabamaHospitalLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export const SathyabamaHospitalLogo: React.FC<SathyabamaHospitalLogoProps> = ({
  size = 'md',
  className = '',
  showText = false,
}) => {
  // Dimensions for the vector shield & laurel
  const sizeMap = {
    xs: { w: 32, h: 32 },
    sm: { w: 42, h: 42 },
    md: { w: 50, h: 50 },
    lg: { w: 72, h: 72 },
    xl: { w: 104, h: 104 },
  };

  const { w, h } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <div
        style={{ width: `${w}px`, height: `${h}px` }}
        className="relative shrink-0 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 400 420"
          className="w-full h-full overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Ribbon Gradient */}
            <linearGradient id="shRibbonGradExact" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E40AF" />
              <stop offset="50%" stopColor="#0C3E84" />
              <stop offset="100%" stopColor="#082A5E" />
            </linearGradient>

            {/* Inner Shield Fill */}
            <radialGradient id="shShieldBgExact" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F8FAFC" />
            </radialGradient>
          </defs>

          {/* 1. Laurel Wreath - Left Branch (Vibrant Green Foliage) */}
          <g fill="#16A34A" stroke="#15803D" strokeWidth="1.2">
            {/* Left curved laurel stem */}
            <path
              d="M102 292 C62 245, 48 152, 114 48"
              fill="none"
              stroke="#15803D"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Left Laurel leaf pairs */}
            <path d="M 68 76 C 36 66, 44 94, 76 86 Z" />
            <path d="M 86 64 C 64 40, 86 40, 98 64 Z" />
            <path d="M 52 112 C 20 106, 28 134, 62 122 Z" />
            <path d="M 70 102 C 48 80, 70 80, 84 105 Z" />
            <path d="M 44 156 C 12 152, 22 180, 56 166 Z" />
            <path d="M 62 142 C 38 126, 60 120, 76 145 Z" />
            <path d="M 46 205 C 16 206, 26 232, 58 216 Z" />
            <path d="M 62 188 C 44 176, 60 166, 78 190 Z" />
            <path d="M 60 252 C 32 260, 44 282, 74 262 Z" />
            <path d="M 74 234 C 56 228, 68 216, 86 238 Z" />
            <path d="M 86 288 C 64 302, 80 320, 104 298 Z" />
          </g>

          {/* 2. Laurel Wreath - Right Branch (Vibrant Green Foliage) */}
          <g fill="#16A34A" stroke="#15803D" strokeWidth="1.2">
            {/* Right curved laurel stem */}
            <path
              d="M298 292 C338 245, 352 152, 286 48"
              fill="none"
              stroke="#15803D"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Right Laurel leaf pairs */}
            <path d="M 332 76 C 364 66, 356 94, 324 86 Z" />
            <path d="M 314 64 C 336 40, 314 40, 302 64 Z" />
            <path d="M 348 112 C 380 106, 372 134, 338 122 Z" />
            <path d="M 330 102 C 352 80, 330 80, 316 105 Z" />
            <path d="M 356 156 C 388 152, 378 180, 344 166 Z" />
            <path d="M 338 142 C 362 126, 340 120, 324 145 Z" />
            <path d="M 354 205 C 384 206, 374 232, 342 216 Z" />
            <path d="M 338 188 C 356 176, 340 166, 322 190 Z" />
            <path d="M 340 252 C 368 260, 356 282, 326 262 Z" />
            <path d="M 326 234 C 344 228, 332 216, 314 238 Z" />
            <path d="M 314 288 C 336 302, 320 320, 296 298 Z" />
          </g>

          {/* 3. Central Shield Background & Frame */}
          <path
            d="M 118 68 L 282 68 C 282 68, 290 200, 282 232 C 272 272, 200 308, 200 308 C 200 308, 128 272, 118 232 C 110 200, 118 68, 118 68 Z"
            fill="url(#shShieldBgExact)"
            stroke="#0C3E84"
            strokeWidth="7"
            strokeLinejoin="round"
          />

          {/* Inner Shield Fine Contour */}
          <path
            d="M 125 75 L 275 75 C 275 75, 283 198, 276 228 C 267 264, 200 299, 200 299 C 200 299, 133 264, 124 228 C 117 198, 125 75, 125 75 Z"
            fill="none"
            stroke="#0C3E84"
            strokeWidth="2.2"
          />

          {/* 4. Top Header Box Inside Shield */}
          <line x1="120" y1="122" x2="280" y2="122" stroke="#0C3E84" strokeWidth="4.5" />
          <text
            x="200"
            y="94"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontWeight="900"
            fontSize="18"
            fill="#0C3E84"
            letterSpacing="1"
          >
            SATHYABAMA
          </text>
          <text
            x="200"
            y="115"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontWeight="900"
            fontSize="16"
            fill="#0C3E84"
            letterSpacing="1.2"
          >
            HOSPITAL
          </text>

          {/* Internal Shield Dividers */}
          <line x1="200" y1="122" x2="200" y2="208" stroke="#0C3E84" strokeWidth="4" />
          <line x1="122" y1="208" x2="278" y2="208" stroke="#0C3E84" strokeWidth="4" />

          {/* 5. Top-Left Emblem: Hospital Bed + Patient + Red Cross */}
          <g transform="translate(132, 132)">
            {/* Bold Red Medical Cross above bed */}
            <path
              d="M 29 2 H 39 V 12 H 49 V 22 H 39 V 32 H 29 V 22 H 19 V 12 H 29 Z"
              fill="#DC2626"
            />
            {/* Patient Head */}
            <circle cx="21" cy="46" r="6" fill="#0C3E84" />
            {/* Hospital Bed Frame and Patient Body */}
            <path
              d="M 6 36 V 60 M 6 49 H 59 V 60 M 59 42 V 60"
              stroke="#0C3E84"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M 28 47 H 55 C 57 47, 57 52, 55 52 H 28 Z"
              fill="#0C3E84"
            />
          </g>

          {/* 6. Top-Right Emblem: Stethoscope + Red Heart + Heartbeat Pulse */}
          <g transform="translate(206, 128)">
            {/* Stethoscope Tubing and Earpieces */}
            <path
              d="M 20 6 C 20 6, 11 18, 11 36 C 11 53, 28 63, 42 63 C 55 63, 59 55, 59 44"
              fill="none"
              stroke="#0C3E84"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M 20 6 L 15 2 M 29 6 L 25 2"
              stroke="#0C3E84"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Stethoscope Chest Piece */}
            <circle cx="59" cy="44" r="6" fill="#FFFFFF" stroke="#0C3E84" strokeWidth="4" />

            {/* Red Heart */}
            <path
              d="M 38 23 C 38 15, 25 13, 25 23 C 25 32, 38 42, 38 42 C 38 42, 51 32, 51 23 C 51 13, 38 15, 38 23 Z"
              fill="#DC2626"
            />
            {/* White ECG trace on Heart */}
            <path
              d="M 28 27 L 33 27 L 35 21 L 38 33 L 41 23 L 43 27 L 48 27"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* 7. Bottom Emblem: Classic Medical Caduceus */}
          <g transform="translate(162, 214)">
            {/* Caduceus Wings */}
            <path
              d="M 38 24 C 20 11, 3 19, 2 34 C 14 34, 28 29, 38 24 Z"
              fill="#0C3E84"
            />
            <path
              d="M 38 24 C 56 11, 73 19, 74 34 C 62 34, 48 29, 38 24 Z"
              fill="#0C3E84"
            />
            {/* Central Staff */}
            <circle cx="38" cy="18" r="5" fill="#0C3E84" />
            <line x1="38" y1="20" x2="38" y2="76" stroke="#0C3E84" strokeWidth="4" strokeLinecap="round" />
            {/* Entwined Serpents (Double helix) */}
            <path
              d="M 27 32 Q 38 38, 49 32 Q 38 46, 27 54 Q 38 60, 49 54 Q 38 68, 33 72"
              fill="none"
              stroke="#0C3E84"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M 49 32 Q 38 38, 27 32 Q 38 46, 49 54 Q 38 60, 27 54 Q 38 68, 43 72"
              fill="none"
              stroke="#0C3E84"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          </g>

          {/* 8. Academic Mortarboard Cap on Top */}
          <g transform="translate(130, 8)">
            {/* Skullcap body */}
            <path d="M 30 38 L 110 38 L 100 58 L 40 58 Z" fill="#0F172A" />
            {/* Diamond mortarboard top */}
            <polygon points="70,10 142,32 70,52 -2,32" fill="#0F172A" />
            {/* Tassel loop and hanging cord */}
            <circle cx="70" cy="32" r="3.5" fill="#0C3E84" />
            <path
              d="M 70 32 Q 102 24, 116 36 Q 120 44, 118 60"
              fill="none"
              stroke="#0C3E84"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Tassel fringe */}
            <path d="M 113 58 L 123 58 L 125 76 L 111 76 Z" fill="#0C3E84" />
          </g>

          {/* 9. Blue Ribbon Banner: "MEDICAL SYSTEM" */}
          <g transform="translate(28, 290)">
            {/* Ribbon tail left with swallowtail */}
            <polygon points="8,26 46,4 46,46 8,46 24,36" fill="#082A5E" />
            {/* Ribbon tail right with swallowtail */}
            <polygon points="336,26 298,4 298,46 336,46 320,36" fill="#082A5E" />

            {/* Main Center Ribbon Body */}
            <path
              d="M 36 10 L 308 10 L 292 52 L 52 52 Z"
              fill="url(#shRibbonGradExact)"
              stroke="#0C3E84"
              strokeWidth="2.5"
            />

            {/* Banner Text: MEDICAL SYSTEM */}
            <text
              x="172"
              y="39"
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              fontWeight="900"
              fontSize="21"
              letterSpacing="2.5"
              fill="#FFFFFF"
            >
              MEDICAL SYSTEM
            </text>
          </g>

          {/* 10. Subtitle Motto: "HEALTH • CARE • COMMUNITY" */}
          <g transform="translate(48, 366)">
            <line x1="0" y1="8" x2="38" y2="8" stroke="#0C3E84" strokeWidth="2.5" />
            <text
              x="152"
              y="14"
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              fontWeight="900"
              fontSize="13"
              letterSpacing="2.2"
              fill="#0C3E84"
            >
              HEALTH &nbsp;•&nbsp; CARE &nbsp;•&nbsp; COMMUNITY
            </text>
            <line x1="266" y1="8" x2="304" y2="8" stroke="#0C3E84" strokeWidth="2.5" />
          </g>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col truncate">
          <span className="text-xs sm:text-sm font-black tracking-tight text-slate-900 dark:text-slate-50 uppercase leading-tight">
            SATHYABAMA HOSPITAL
          </span>
          <span className="text-[10px] font-bold text-teal-700 dark:text-teal-400">
            Medical System · Central Pharmacy
          </span>
        </div>
      )}
    </div>
  );
};
