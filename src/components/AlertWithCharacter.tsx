import React from "react";

interface AlertWithCharacterProps {
  message: string;
  imageUrl: string;
}

export const AlertWithCharacter: React.FC<AlertWithCharacterProps> = ({
  message,
  imageUrl,
}) => {
  return (
    <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 bg-[#E5AB56]  border-[#9D761C] border-2 rounded-lg shadow-lg px-4 py-2 animate-fadeInOut max-w-[90vw]">
        <img
          src={imageUrl}
          alt="character"
          className="w-12 h-12 object-contain"
          style={{ imageRendering: "pixelated" }}
        />
        <span className="text-sm  text-gray-800 font-bold">{message}</span>
      </div>
    </div>
  );
};
