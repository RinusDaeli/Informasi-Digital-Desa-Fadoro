import React from 'react';

interface VillageEmblemProps {
  className?: string;
  size?: number;
}

export const VillageEmblem: React.FC<VillageEmblemProps> = ({ className = '', size = 44 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      {/* Outer shield border */}
      <path
        d="M50 4C78 4 92 18 92 46C92 72 68 91 50 96C32 91 8 72 8 46C8 18 22 4 50 4Z"
        fill="#047857"
        stroke="#F59E0B"
        strokeWidth="3.5"
      />
      {/* Inner shield background */}
      <path
        d="M50 8C74 8 86 20 86 46C86 68 64 86 50 91C36 86 14 68 14 46C14 20 26 8 50 8Z"
        fill="#065F46"
      />
      
      {/* Golden Rice and Cotton wreath */}
      <path
        d="M26 62C22 52 24 36 34 26C35 25 38 29 36 32C28 40 28 50 31 58C32 60 28 62 26 62Z"
        fill="#FBBF24"
      />
      <path
        d="M74 62C78 52 76 36 66 26C65 25 62 29 64 32C72 40 72 50 69 58C68 60 72 62 74 62Z"
        fill="#FBBF24"
      />
      
      {/* Traditional Nias house (Omo Hada) roof silhouette */}
      <path
        d="M50 22L72 42H28L50 22Z"
        fill="#F59E0B"
        stroke="#FEF3C7"
        strokeWidth="1.5"
      />
      <path
        d="M34 42V56H66V42"
        stroke="#FEF3C7"
        strokeWidth="2"
        fill="#064E3B"
      />
      
      {/* Red & White Indonesian Flag ribbon */}
      <path d="M30 64H70V69H30V64Z" fill="#DC2626" />
      <path d="M30 69H70V74H30V69Z" fill="#FFFFFF" />

      {/* Sea waves for Sirombu coastal region */}
      <path
        d="M30 79C36 76 44 82 50 79C56 76 64 82 70 79"
        stroke="#67E8F9"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      {/* Star of unity at top */}
      <polygon
        points="50,11 52.5,17 59,17.5 54,21.5 56,28 50,24 44,28 46,21.5 41,17.5 47.5,17"
        fill="#FDE047"
      />
    </svg>
  );
};
