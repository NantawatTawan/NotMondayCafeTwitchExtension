import React from "react";
import { useClickSound } from "../hooks/useClickSound";
interface CloseButtonProps {
  onClick?: () => void;
  className?: string;
}

export const CloseButton: React.FC<CloseButtonProps> = ({
  onClick,
  className = "",
}) => {
  const playClickSound = useClickSound();
  const handleClick = () => {
    playClickSound();
    onClick?.();
  };
  return (
    <button
      onClick={handleClick}
      className={`
        bg-[url('https://cdn.bixmy.party/sprite-extension/UI-General-Icon3.png')]
        bg-no-repeat bg-center bg-contain
        w-[clamp(24px,6vw,40px)] h-[clamp(24px,6vw,40px)]
        hover:scale-105 active:scale-95 transition-transform duration-150
        ${className}
      `}
      aria-label="Close"
    />
  );
};
