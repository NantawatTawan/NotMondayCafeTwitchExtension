interface Props {
  imageUrl: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const CustomerButtonWrapper: React.FC<Props> = ({
  imageUrl,
  isSelected = false,
  onClick,
}) => {
  const bgUrl = isSelected
    ? "https://cdn.bixmy.party/sprite-extension/UI-Customer-Tab1-Selected.png"
    : "https://cdn.bixmy.party/sprite-extension/UI-Customer-Tab1.png";

  return (
    <div
      onClick={onClick}
      className="relative w-full max-w-[80px] aspect-[80/113] bg-cover bg-center hover:brightness-105"
      style={{ backgroundImage: `url(${bgUrl})`, cursor: "pointer" }}
    >
      <img
        src={imageUrl}
        alt="customer"
        className="absolute top-0 left-0 w-full h-full object-contain"
        style={{ top: "-6px", imageRendering: "pixelated" }}
      />
    </div>
  );
};
