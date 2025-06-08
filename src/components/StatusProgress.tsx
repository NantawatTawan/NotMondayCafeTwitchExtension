import React from "react";

interface StatusProgressProps {
  activeStepIndex: number; // 0, 1, 2
  title?: string;
  className?: string;
}

const stepIcons = [
  {
    active: "https://cdn.bixmy.party/sprite-extension/UI-Customer-Icon2.png",
    inactive: "https://cdn.bixmy.party/sprite-extension/UI-Customer-Icon1.png",
    alt: "Choose Character",
  },
  {
    active: "https://cdn.bixmy.party/sprite-extension/UI-Customer-Icon4.png",
    inactive: "https://cdn.bixmy.party/sprite-extension/UI-Customer-Icon3.png",
    alt: "Choose Food",
  },
  {
    active: "https://cdn.bixmy.party/sprite-extension/UI-Customer-Icon6.png",
    inactive: "https://cdn.bixmy.party/sprite-extension/UI-Customer-Icon5.png",
    alt: "Confirm Order",
  },
];

export const StatusProgress: React.FC<StatusProgressProps> = ({
  activeStepIndex,
  title = "",
  className = "",
}) => {
  const positions = ["left-0", "left-1/2 -translate-x-1/2", "right-0"];

  return (
    <div
      className={`flex flex-col items-center gap-1 w-[clamp(260px,60%,370px)] ${className}`}
    >
      {/* เส้นพื้นหลัง */}
      <div className="relative w-[268px] h-[64px] bg-[url('https://cdn.bixmy.party/sprite-extension/statusui-3.png')] bg-center bg-contain bg-no-repeat">
        {stepIcons.map((step, i) => {
          const isActive = i === activeStepIndex;
          const src = isActive ? step.active : step.inactive;
          return (
            <img
              key={i}
              src={src}
              alt={step.alt}
              className={`w-[56px] h-[56px] object-contain absolute top-1 ${
                positions[i]
              }
              ${i === 1 ? "translate-x-[-50%]" : ""}
              ${isActive ? "brightness-100" : "brightness-75"}`}
            />
          );
        })}
      </div>

      {/* หัวข้อ */}
      {title && (
        <div className="text-center text-black text-[clamp(0.5rem,2.5vw,24px)] font-bold whitespace-nowrap">
          {title}
        </div>
      )}
    </div>
  );
};
