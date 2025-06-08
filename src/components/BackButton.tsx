import React from "react";
import { useClickSound } from "../hooks/useClickSound";
interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  className = "",
}) => {
  const playClickSound = useClickSound();
  const handleClick = () => {
    playClickSound();
    onClick();
  };
  return (
    <button
      onClick={handleClick}
      className={`bg-[url('https://cdn.bixmy.party/sprite-extension/UI-General-Tab2.png')] 
        bg-center bg-contain bg-no-repeat 
        w-[min(94px,24vw)] aspect-[94/34] 
        flex items-center justify-center 
        cursor-pointer hover:scale-105 transition
        text-black text-base font-normal text-center
        ${className}`}
      style={{ imageRendering: "pixelated" }}
    >
      Back
    </button>
  );
};
