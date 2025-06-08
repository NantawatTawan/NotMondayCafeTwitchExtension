import { QueueItem } from "../components/QueueItem";
import type { GameState } from "../types/Gamestate";
import { CloseButton } from "../components/CloseButton";
import { JoinButton } from "../components/JoinButton";

import { ResponsivePanelWrapper } from "../components/ResponsivePanelWrapper";
interface QueueFrameProps {
  onClose: () => void;
  onJoinClick: () => void;
  gameState: GameState | null;
  inCafe: boolean;
  isInQueue: boolean;
}

export const QueueFrame = ({
  onClose,
  onJoinClick,
  gameState,
  inCafe,
  isInQueue,
}: QueueFrameProps) => {
  const disableJoin = inCafe || isInQueue;
  const queueData = gameState?.availableQueueDataForExtensions || [];
  const inCafeData = gameState?.inCafeInfo || [];

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-transparent">
      <ResponsivePanelWrapper>
        {/* ปุ่มปิด */}
        <CloseButton
          onClick={onClose}
          className="absolute top-2 right-2 z-10 sm:top-3 sm:right-3"
        />

        {/* หัวข้อ */}
        <div className="text-center text-black font-bold text-xl mb-2">
          Queue
        </div>

        {/* Grid แสดง Queue */}
        <div className="flex-grow overflow-y-auto bg-[rgba(247,242,236,0.5)] border border-gray-200 rounded-md p-2">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 auto-rows-[85px]">
            {inCafeData.map((item, idx) => (
              <QueueItem
                key={`cafe-${idx}`}
                userName={item.userName}
                characterName={item.currentCharacterName}
                menuName="In Cafe"
                index={-1}
                isInCafe={true}
              />
            ))}
            {queueData.map((item, index) => (
              <QueueItem
                key={`queue-${index}`}
                index={index}
                userName={item.userName}
                characterName={item.characterName}
                menuName={item.menuName}
                isInCafe={false}
              />
            ))}
          </div>
        </div>

        {/* ปุ่ม Join */}
        <div className="flex justify-end mt-3">
          <JoinButton onClick={onJoinClick} disabled={disableJoin} />
        </div>
      </ResponsivePanelWrapper>
    </div>
  );
};
