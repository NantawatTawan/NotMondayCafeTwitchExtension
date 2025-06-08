import React from "react";

interface StaffButtonProps {
  onClick?: () => void;
  className?: string;
}

export const StaffButton: React.FC<StaffButtonProps> = ({
  onClick,
  className = "",
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <button
      onClick={onClick}
      className={`w-[58px] h-[58px] relative ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundImage: `url(${
          hovered
            ? "https://cdn.bixmy.party/sprite-extension/UI-Staff-Icon7.png"
            : "https://cdn.bixmy.party/sprite-extension/UI-Staff-Icon6.png"
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "transform 0.2s ease",
        transform: hovered ? "scale(1.05)" : "scale(1)",
      }}
    />
  );
};
