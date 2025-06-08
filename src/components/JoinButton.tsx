import React from "react";
import { useClickSound } from "../hooks/useClickSound";

interface JoinButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const JoinButton: React.FC<JoinButtonProps> = ({
  onClick,
  disabled = false,
  className = "",
  children = "Join",
}) => {
  const playClickSound = useClickSound();

  const handleClick = () => {
    if (disabled) return;
    playClickSound();
    onClick?.();
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
      {children}
    </button>
  );
};
