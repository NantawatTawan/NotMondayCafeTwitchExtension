import React from "react";

interface StarFrameProps {
  isActive: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const StarFrame: React.FC<StarFrameProps> = ({
  isActive,
  onClick,
  className = "",
  style,
}) => {
  const imageUrl = isActive
    ? "https://cdn.bixmy.party/sprite-extension/UI-Review-Icon2.png"
    : "https://cdn.bixmy.party/sprite-extension/UI-Review-Icon1.png";

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer ${className}`}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...style,
      }}
    />
  );
};
