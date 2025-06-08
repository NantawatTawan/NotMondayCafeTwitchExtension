import { useEffect, useState } from "react";

export function useResponsiveScale(config?: {
  baseWidth?: number;
  baseHeight?: number;
  triggerWidth?: number;
  triggerHeight?: number;
  minScale?: number;
  stickTopThreshold?: number;
}) {
  const [scale, setScale] = useState(1);
  const [shouldScale, setShouldScale] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const {
      baseWidth = 578,
      baseHeight = 660,
      triggerWidth = 285,
      triggerHeight = 475,
      minScale = 0.7,
    } = config || {};

    const updateScale = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setIsLandscape(width > height);

      if (width <= triggerWidth || height <= triggerHeight) {
        const widthScale = width / baseWidth;
        const heightScale = height / baseHeight;
        const calculatedScale = Math.min(widthScale, heightScale, 1);
        setScale(Math.max(calculatedScale, minScale));
        setShouldScale(true);
      } else {
        setScale(1);
        setShouldScale(false);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [config]);

  return { scale, shouldScale, isLandscape };
}
