import React from "react";

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const getCharacterImageUrl = (name: string): string => {
  const baseName = capitalize((name || "Anonymous").trim());
 const hasNumber = /\d/.test(baseName);
  const suffix = hasNumber ? "" : "1";

  return `https://cdn.bixmy.party/Customer-Icon/Character_Customer_${baseName}${suffix}_Idle.png`;
 
};

export const QueueItem = ({
  userName = "Unknown",
  characterName = "default",
  menuName = "Unknown",
  index = 0,
  isInCafe = false,
}: {
  userName: string;
  characterName: string;
  menuName: string;
  index: number;
  isInCafe: boolean;
}) => {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "clamp(6px, 2vw, 10px)",
    width: "100%",
    height: "clamp(60px, 13vw, 85px)",
    padding: "clamp(6px, 1.5vw, 12px) clamp(4px, 1vw, 8px)",

    backgroundImage: `url(${
      isInCafe
        ? "https://cdn.bixmy.party/sprite-extension/UI-Queue-Tab2.png"
        : "https://cdn.bixmy.party/sprite-extension/UI-Queue-Tab1.png"
    })`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "6px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
    position: "relative",
  };

  return (
    <div style={containerStyle}>
      {/* หมายเลขคิว */}
      <div
        style={{
          fontSize: "clamp(10px, 2vw, 16px)",
          fontWeight: 700,
          minWidth: "20px",
          visibility: isInCafe ? "hidden" : "visible",
          color: "#000",
          textAlign: "center",
          fontFamily: '"Noto Sans", Helvetica, sans-serif',
        }}
      >
        {index + 1}
      </div>

      {/* รูป character */}
      <img
        src={getCharacterImageUrl(characterName)}
        alt={characterName}
        style={{
          width: "auto",
          height: "110%",
          objectFit: "cover",
          imageRendering: "pixelated",
        }}
      />

      {/* รายละเอียด */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            color: "#000",
            fontSize: "12px",
            fontWeight: 700,
            marginBottom: "4px",
            fontFamily: '"Noto Sans", Helvetica, sans-serif',
            maxWidth: "clamp(70px, 24vw, 120px)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={userName}
        >
          {userName}
        </div>

        <p
          style={{
            color: "#000",
            fontSize: "10px",
            fontWeight: 300,
            maxWidth: "140px",
            wordWrap: "break-word",
            fontFamily: '"Noto Sans", Helvetica, sans-serif',
          }}
        >
          {menuName}
        </p>
      </div>
    </div>
  );
};
