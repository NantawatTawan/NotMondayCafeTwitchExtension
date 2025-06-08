import React from "react";
import { useClickSound } from "../hooks/useClickSound";

interface NextButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export const NextButton: React.FC<NextButtonProps> = ({
  onClick,
  label = "Next",
  className = "",
  disabled = false,
}) => {
  const playClickSound = useClickSound();

  const handleClick = () => {
    if (disabled) return;
    playClickSound();
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`bg-[url('https://cdn.bixmy.party/sprite-extension/UI-General-Tab1.png')] 
        bg-center bg-contain bg-no-repeat 
        w-[min(94px,24vw)] aspect-[94/34] 
        flex items-center justify-center 
        ${
          disabled
            ? "opacity-40 cursor-not-allowed"
            : "cursor-pointer hover:scale-105 transition"
        }
        text-black text-base font-normal text-center
        ${className}`}
    >
      {label}
    </button>
  );
};
