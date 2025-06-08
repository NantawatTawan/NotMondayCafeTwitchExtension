import React, { useState } from "react";
import { StarFrame } from "../components/StarFrame";
import { StatusProgress } from "../components/StatusProgress";
import { CloseButton } from "../components/CloseButton";
import { NextButton } from "../components/NextButton";
import { BackButton } from "../components/BackButton";
import type { Skin } from "../Data";
import type { Food } from "../Data.generated";
import { useResponsiveScale } from "../hooks/useResponsiveScale";
import { ResponsivePanelWrapper } from "../components/ResponsivePanelWrapper";
import { FullTextEditor } from "../components/FullTextEditor";
interface Props {
  onBack: () => void;
  onNext: () => void;
  onClose: () => void;
  selectedSkin: Skin | null;
  selectedFood: Food | null;

  username: string;
  token: string;
  userId: string;
  isSubscriber: boolean;
  streamerId: string;
}

export const ReviewFrame: React.FC<Props> = ({
  onBack,
  onNext,
  onClose,
  selectedSkin,
  selectedFood,
  username,
  token,
  userId,
  isSubscriber,
  streamerId,
}) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const fallbackImage = "https://cdn.bixmy.party/PNG-Big-Fallback.png";
  const bigImage = selectedFood?.bigImageUrl || fallbackImage;

  const { isLandscape } = useResponsiveScale({});

  const sendReviewCommand = () => {
    if (!selectedSkin || !selectedFood || !token || !userId) return;

    const command = `!join !char ${selectedSkin.id} !menu ${selectedFood.name} !review ${rating} ${reviewText}`;

    fetch("https://sunny.bixmy.party/extension/event", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "extension-click",
        command,
        message: command,
        viewerId: userId,
        username,
        isSubscriber,
        platform: "twitch_account",
        viewer: userId,
        selectedSkin: selectedSkin.id,
        streamerId,
      }),
    })
      .then(async (res) => {
        const text = await res.text();
        if (res.ok) onNext();
        else alert("Failed to send review:\n" + text);
      })
      .catch((err) => {
        console.error(err);
        alert("Network error while sending review");
      });
  };
  const [showBigTextBox, setShowBigTextBox] = useState(false);

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-transparent">
      <ResponsivePanelWrapper>
        <CloseButton
          onClick={onClose}
          className="absolute top-2 right-2 z-10 sm:top-3 sm:right-3"
        />

        <StatusProgress
          className="self-center"
          title="Write Your Review"
          activeStepIndex={2}
        />

        <div className="flex flex-grow gap-2 mt-4 overflow-auto no-scrollbar">
          {/* ซ้าย */}
          <div className="flex flex-col items-center w-1% flex-shrink-0">
            <div className="bg-[#f2ede6] rounded-md w-full aspect-[129/186] flex flex-col justify-between items-center shadow border overflow-auto no-scrollbar">
              <div className="flex-grow flex items-center justify-center w-full">
                <img
                  src={selectedSkin?.imageUrl}
                  alt={selectedSkin?.name}
                  className="object-contain  h-auto scale-110 -mt-[17%]"
                  style={
                    window.innerHeight >= 460
                      ? { imageRendering: "pixelated", width: "100%" }
                      : { width: "15vh" }
                  }
                />
              </div>
              <div className="text-xs bg-[#f7f4f0] text-center w-full py-1 z-10">
                {username}
              </div>
            </div>

            <div className="mt-4 text-[clamp(0.75rem,2vw,1.2rem)] font-semibold">
              Order
            </div>

            <div className="mt-2 w-full bg-[#f2ede6] rounded-md shadow border flex flex-col items-center overflow-hidden no-scrollbar">
              {selectedFood ? (
                <>
                  <img
                    src={selectedFood.imageUrl}
                    alt={selectedFood.name}
                    className="object-contain w-[80%] "
                    style={
                      window.innerHeight >= 460
                        ? {
                            imageRendering: "pixelated",
                            width: "100%",
                            marginTop: 1,
                          }
                        : { width: "15vh", marginTop: 1 }
                    }
                  />
                  <div
                    className=" text-center bg-[#f7f4f0] px-2 py-1 text-[10px] leading-tight overflow-hidden"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      maxHeight: "3em",
                      minHeight: "3em",
                      height: "3em",
                      width: "8em",
                    }}
                  >
                    <span className="line-clamp-2 text-ellipsis overflow-hidden">
                      {selectedFood.name}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={
                      "https://cdn.bixmy.party/PNG-Drinks-New/Boba-ButterflyPeaLemonIcedTea.png"
                    }
                    alt={"selectedFood.name"}
                    className="object-contain w-[80%] mt-1"
                    style={{ opacity: 0, imageRendering: "pixelated" }}
                  />
                  <div
                    className="w-full text-center bg-[#f7f4f0] px-2 py-1 text-[10px] leading-tight overflow-auto no-scrollbar"
                    style={{
                      maxWidth: "9em",
                      maxHeight: "3em",
                      minHeight: "3em",
                    }}
                  >
                    <span className="line-clamp-2">{"Put Your Order"}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ขวา */}
          <div className="flex-grow bg-[rgba(247,242,236,0.5)]  border-gray-200 rounded-md p-0 overflow-y-auto no-scrollbar grid grid-rows-[auto,auto,1fr] gap-3 place-items-center">
            {/* รูปอาหาร */}
            <div
              className=" aspect-[365/212] rounded bg-[#f2ede6] items-center justify-center overflow-hidden   my-auto"
              style={{
                width: isLandscape
                  ? window.innerHeight > 800
                    ? "78%"
                    : window.innerHeight < 475
                    ? window.innerHeight <= 333
                      ? window.innerHeight <= 292
                        ? "40vh"
                        : "50vh"
                      : "70vh"
                    : "40vh"
                  : "",
                height: isLandscape
                  ? ""
                  : window.innerWidth > 800
                  ? "90%"
                  : "22vw",
              }}
            >
              <img
                src={bigImage}
                alt="food"
                className="object-contain w-full rounded-md "
              />
            </div>

            {/* ดาวให้คะแนน */}
            <div className=" flex justify-center gap-x-1 my-auto ">
              {[...Array(5)].map((_, i) => (
                <StarFrame
                  key={i}
                  isActive={i < rating}
                  onClick={() => setRating(rating === i + 1 ? 0 : i + 1)}
                  className="cursor-pointer aspect-[38/38]"
                  style={{
                    marginTop: "1vh",
                    width: isLandscape
                      ? window.innerHeight > 800
                        ? "38px"
                        : "5vh"
                      : "",
                    height: isLandscape
                      ? ""
                      : window.innerWidth > 800
                      ? "38px"
                      : "5vw",
                  }}
                />
              ))}
            </div>

            {/* กล่องข้อความ */}
            <div
              className="flex flex-grow w-full h-full border-[#f1c59b] border-1 my-auto"
              style={{
                width: isLandscape
                  ? window.innerHeight > 800
                    ? "90%"
                    : "48vh"
                  : "",
                height: isLandscape
                  ? ""
                  : window.innerWidth > 800
                  ? "80%"
                  : "12vh",
              }}
            >
              <textarea
                onClick={() => {
                  if (window.innerWidth < 500 && window.innerHeight < 600) {
                    setShowBigTextBox(true);
                  }
                }}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review here..."
                maxLength={100}
                className=" w-full p-2  rounded resize-none text-sm shadow-sm bg-amber-100/50 no-scrollbar"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-3">
          <BackButton onClick={onBack} />
          <NextButton onClick={sendReviewCommand} />
        </div>
      </ResponsivePanelWrapper>
      {showBigTextBox && (
        <FullTextEditor
          reviewText={reviewText}
          setReviewText={setReviewText}
          onNext={sendReviewCommand}
          onClose={() => setShowBigTextBox(false)}
        />
      )}
    </div>
  );
};
