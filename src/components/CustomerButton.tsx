import React from "react";
import { useClickSound } from "../hooks/useClickSound";

interface CustomerButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  selected?: boolean;
}

export const CustomerButton: React.FC<CustomerButtonProps> = ({
  className = "",
  onClick,
  disabled = false,
  selected = false,
}) => {
  const playClickSound = useClickSound();

  let bgImage = "";

  if (disabled) {
    bgImage =
      "https://sunny.bixmy.party/cdn/images/sprite-extension/UI-General-Tab9.png";
  } else if (selected) {
    bgImage =
      "https://sunny.bixmy.party/cdn/images/sprite-extension/UI-General-Tab5-Selected.png";
  } else {
    bgImage =
      "https://sunny.bixmy.party/cdn/images/sprite-extension/UI-General-Tab5.png";
  }
  const handleClick = () => {
    if (disabled) return;
    playClickSound();
    onClick?.(); // เรียกฟังก์ชันจริง ถ้ามี
  };
  return (
    <div
      onClick={handleClick}
      style={{ backgroundImage: `url(${bgImage})` }}
      className={`bg-center bg-cover transition-transform duration-200 
        ${
          disabled
            ? "cursor-default pointer-events-none opacity-90"
            : "cursor-pointer hover:scale-105 hover:translate-y-0.5"
        }
        w-[clamp(28px,9vw,54px)] min-w-[26px] max-w-[54px] aspect-square relative inline-block ${className}`}
    />
  );
};
