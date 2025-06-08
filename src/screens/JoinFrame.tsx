import { useState } from "react";
import { CustomerButtonWrapper } from "../components/CustomerButtonWrapper";
import { availableSkins } from "../Data";
import type { Skin } from "../Data";
import { CloseButton } from "../components/CloseButton";
import { NextButton } from "../components/NextButton";
import { StatusProgress } from "../components/StatusProgress";
import { ResponsivePanelWrapper } from "../components/ResponsivePanelWrapper";
export const JoinFrame = ({
  onClose,
  onNext,
}: {
  onClose: () => void;
  onNext: (skin: Skin) => void;
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleNext = () => {
    const indexToUse =
      selectedIndex ?? Math.floor(Math.random() * availableSkins.length);
    const selectedSkin = availableSkins[indexToUse];
    onNext(selectedSkin);
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-transparent ">
      <ResponsivePanelWrapper>
        {/* ปุ่มปิด */}
        <CloseButton
          onClick={onClose}
          className="absolute top-2 right-2 z-10 sm:top-3 sm:right-3"
        />
        {/* หัวข้อ + แถบสถานะ */}
        <StatusProgress
          className="self-center"
          title="Choose your character as Customer"
          activeStepIndex={0}
        />

        {/* Grid ตัวละคร */}
        <div className="flex-grow overflow-y-auto mt-4 bg-[rgba(247,242,236,0.5)] border border-gray-200 rounded-md p-2 flex justify-center items-center ">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-1 w-full h-full overflow-y-auto pr-1 custom-scrollbar">
            {availableSkins.map((skin, i) => (
              <CustomerButtonWrapper
                key={skin.id}
                imageUrl={skin.imageUrl}
                isSelected={selectedIndex === i}
                onClick={() => setSelectedIndex(i)}
              />
            ))}
          </div>
        </div>

        {/* ปุ่ม Next */}
        <div className="flex justify-end mt-3">
          <NextButton onClick={handleNext} />
        </div>
      </ResponsivePanelWrapper>
    </div>
  );
};
