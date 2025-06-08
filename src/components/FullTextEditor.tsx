import React from "react";
import { NextButton } from "./NextButton";

interface FullTextEditorProps {
  reviewText: string;
  setReviewText: (text: string) => void;
  onNext: () => void;
  onClose: () => void;
}

export const FullTextEditor: React.FC<FullTextEditorProps> = ({
  reviewText,
  setReviewText,
  onNext,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 max-w-[90vw] w-full mx-4">
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here..."
          maxLength={100}
          className="w-full h-32 p-2 border-[#f1c59b] border-2 rounded resize-none text-sm shadow-sm bg-amber-100/50"
        />

        <div className="flex justify-between mt-4">
          {/* ปุ่ม Close แบบใหม่ */}
          <button
            onClick={onClose}
            className="bg-[url('https://cdn.bixmy.party/sprite-extension/UI-General-Tab2.png')] 
              bg-center bg-contain bg-no-repeat 
              w-[min(94px,24vw)] aspect-[94/34] 
              flex items-center justify-center 
              text-black text-base font-normal text-center 
              hover:scale-105 transition cursor-pointer"
          >
            Close
          </button>

          {/* ปุ่ม Next แบบเดิม */}
          <NextButton onClick={onNext} />
        </div>
      </div>
    </div>
  );
};
