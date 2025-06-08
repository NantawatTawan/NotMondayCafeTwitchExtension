import React from "react";
import { useClickSound } from "../hooks/useClickSound";

interface QueueButtonProps {
  className?: string;
  onClick?: () => void;
  queueIndex?: number | null;
  inCafe?: boolean;
  selected?: boolean;
}

export const QueueButton: React.FC<QueueButtonProps> = ({
  className = "",
  onClick,
  queueIndex = null,
  inCafe = false,
  selected = false,
}) => {
  const playClickSound = useClickSound();

  const handleClick = () => {
    playClickSound();
    onClick?.(); // เรียก onClick ถ้ามี
  };

  const showBubble = inCafe || (queueIndex !== null && queueIndex >= 0);
  const bubbleText =
    !inCafe && queueIndex !== null && queueIndex >= 0
      ? queueIndex >= 10
        ? "10+"
        : `${queueIndex + 1}`
      : "";

  const iconUrl = selected
    ? "https://sunny.bixmy.party/cdn/images/sprite-extension/UI-General-Tab3-Selected.png"
    : "https://sunny.bixmy.party/cdn/images/sprite-extension/UI-General-Tab3.png";

  return (
    <div className={`relative inline-block ${className}`}>
      {/* ปุ่ม */}
      <div
        onClick={handleClick}
        style={{ backgroundImage: `url(${iconUrl})` }}
        className="bg-center bg-cover transition-transform duration-200 cursor-pointer hover:scale-105 hover:translate-y-0.5
                   w-[clamp(28px,9vw,54px)] min-w-[26px] max-w-[54px] aspect-square"
      />

      {/* Bubble */}
      {showBubble && (
        <div className="absolute top-2 -right-12 w-[clamp(24px,8vw,48px)] h-[clamp(16px,5vw,36px)] pointer-events-none">
          <img
            src={
              inCafe
                ? "https://sunny.bixmy.party/cdn/images/sprite-extension/UI-General-Icon5.png"
                : "https://sunny.bixmy.party/cdn/images/sprite-extension/UI-General-Icon4.png"
            }
            alt="bubble"
            className="w-full h-full object-contain"
          />
          {bubbleText && (
            <div className="absolute top-[3px] left-0 right-[-5px] text-center font-bold text-[clamp(10px,3vw,18px)] font-sans text-black">
              {bubbleText}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
