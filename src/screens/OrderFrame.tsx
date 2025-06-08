import React, { useState } from "react";
import type { Skin } from "../Data";
import type { Food } from "../Data.generated";
import { StatusProgress } from "../components/StatusProgress";
import { CloseButton } from "../components/CloseButton";
import { NextButton } from "../components/NextButton";
import { BackButton } from "../components/BackButton";
import type { GameState } from "../types/Gamestate";
import { ResponsivePanelWrapper } from "../components/ResponsivePanelWrapper";
import { AlertWithCharacter } from "../components/AlertWithCharacter";
interface Props {
  onClose: () => void;
  onBack: () => void;
  onNext: () => void;
  selectedSkin: Skin | null;
  selectedFood: Food | null;
  setSelectedFood: (food: Food) => void;
  gameState: GameState | null;
  username: string;
  availableFoods: Food[];
}

export const OrderFrame: React.FC<Props> = ({
  onClose,
  onBack,
  onNext,
  selectedSkin,
  selectedFood,
  setSelectedFood,
  gameState,
  username,
  availableFoods,
}) => {
  const filteredFoods = availableFoods.filter((food) =>
    gameState?.availableFoodID?.includes(food.id)
  );

  const [showAlert, setShowAlert] = useState(false);
  const handleNext = () => {
    if (!selectedFood) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
      return;
    }
    onNext();
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-transparent">
      {showAlert && (
        <AlertWithCharacter
          message="Please select your food before go to next page!"
          imageUrl="https://cdn.bixmy.party/sprite-extension/UI-Staff-Icon6.png"
        />
      )}
      <ResponsivePanelWrapper>
        <CloseButton
          onClick={onClose}
          className="absolute top-2 right-2 z-10 sm:top-3 sm:right-3"
        />

        <StatusProgress
          className="self-center"
          title="Order Your Dish"
          activeStepIndex={1}
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

            <div className="mt-2 w-full bg-[#f2ede6] rounded-md shadow border flex flex-col items-center overflow-hidden ">
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
                    className="object-contain w-[80%] opacity-0"
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
                    <span className="line-clamp-2">{"Put Your Order"}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ขวา */}
          <div className="flex-grow bg-[rgba(247,242,236,0.5)] border border-gray-200 rounded-md p-2 overflow-y-auto custom-scrollbar z-20">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(110px,1fr))] gap-2 ">
              {filteredFoods.map((food) => {
                const selected = selectedFood?.id === food.id;
                return (
                  <button
                    key={food.id}
                    onClick={() => setSelectedFood(food)}
                    className={`border text-xs rounded-md px-1 py-1 flex flex-col items-center gap-1 transition ${
                      selected
                        ? "text-black"
                        : "bg-white border-gray-300 text-black"
                    }`}
                    style={
                      selected
                        ? {
                            backgroundColor: "rgb(229, 171, 86)",
                            borderColor: "#9D761C",
                          }
                        : {}
                    }
                  >
                    <img
                      src={food.imageUrl}
                      alt={food.name}
                      className="w-[48px] h-[48px] object-contain"
                      style={{ imageRendering: "pixelated" }}
                    />
                    <div
                      className="w-full text-center px-2 py-1 text-[10px] leading-tight overflow-auto no-scrollbar"
                      style={{
                        maxHeight: "3em",
                      }}
                    >
                      <span className="line-clamp-2">{food.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-3">
          <BackButton onClick={onBack} />
          <NextButton onClick={handleNext} />
        </div>
      </ResponsivePanelWrapper>
    </div>
  );
};
