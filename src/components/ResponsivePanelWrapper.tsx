import React from "react";
import { useResponsiveScale } from "../hooks/useResponsiveScale";

interface Props {
  children: React.ReactNode;
}

export const ResponsivePanelWrapper: React.FC<Props> = ({ children }) => {
  const { scale, shouldScale, isLandscape } = useResponsiveScale();

  const style = shouldScale
    ? {
        minWidth: isLandscape ? "100vh" : "120vw",
        height: "min(660px,calc(160vh - 35vh))",
        transform: isLandscape
          ? `scale(${scale}) translateX(-12.5vw)`
          : `scale(${scale}) translateX(-40vw)`,
        transformOrigin: "top",
        marginTop: "6vh",
        marginRight: "50%",
      }
    : {
        maxWidth: "578px",
        width: window.innerWidth >= 800 ? "100%" : "82vw",
        height: "min(660px, calc(100vh - 12vh))",
        marginTop: window.innerHeight >= 850 ? "20vh" : "6vh",
      };

  return (
    <div className="flex items-start justify-start pl-[clamp(3rem,5vw,5rem)] transition-transform duration-300 ease-in-out overflow-auto no-scrollbar">
      <div
        className="relative flex flex-col p-4 border-2 border-[#f1c59b] bg-[rgba(247,227,205,0.4)] rounded-[12px] overflow-hidden"
        style={style}
      >
        {children}
      </div>
    </div>
  );
};
