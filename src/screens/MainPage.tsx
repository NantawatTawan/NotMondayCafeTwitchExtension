import React, { useState, useEffect, useRef } from "react";
import { CustomerButton } from "../components/CustomerButton";
import { QueueButton } from "../components/QueueButton";
import { QueueFrame } from "./QueueFrame";
import { JoinFrame } from "./JoinFrame";
import { OrderFrame } from "./OrderFrame";
import { ReviewFrame } from "./ReviewFrame";
import type { Skin } from "../Data";
import type { Food } from "../Data.generated";
import { availableFoods } from "../Data.generated";
import mockGameState from "../mock_game_state.json";
import type { GameState } from "../types/Gamestate";

const isLocalDev =
  window.location.hostname.includes("localhost") ||
  window.location.hostname.includes("127.0.0.1") ||
  window.location.hostname.includes("codesandbox.io");

const MainPage: React.FC = () => {
  const [activeFrame, setActiveFrame] = useState<
    "queue" | "join" | "order" | "review" | null
  >();
  const [selectedSkin, setSelectedSkin] = useState<Skin | null>(null);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const goToReview = () => {
    console.log("🔥 Going to Review", { selectedSkin, selectedFood });
    setActiveFrame("review");
  };
  const [isHovering, setIsHovering] = useState(false);
  const [isIdentityLinked, setIsIdentityLinked] = useState(isLocalDev);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState("Unknown");
  const [isSubscriber, setIsSubscriber] = useState(false);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [streamerId, setStreamerId] = useState<string | null>(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const wsRef = useRef<WebSocket | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const isMobile = window.location.pathname.includes("mobile.html");
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isLocalDev) {
      setGameState(mockGameState as GameState);
      setToken("mock-token");
      setStreamerId("mock-streamer");
      setUserId("mock-user");
      setUsername("LocalUser");
      setIsIdentityLinked(true);

      return;
    }

    const waitForTwitch = setInterval(() => {
      if (window.Twitch && window.Twitch.ext) {
        window.Twitch.ext.onAuthorized((auth) => {
          console.log("✅ Twitch auth:", auth);
          setToken(auth.token);
          setStreamerId(auth.channelId);
          if (
            window.Twitch?.ext?.actions?.requestIdShare &&
            !isIdentityLinked
          ) {
            window.Twitch.ext.actions.requestIdShare();
          }
          fetch("https://sunny.bixmy.party/extension/login", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${auth.token}`,
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.userId && !data.userId.startsWith("U")) {
                setIsIdentityLinked(true);
                setUserId(data.userId);
                setUsername(data.username || "Unknown");
                setIsSubscriber(data.isSubscriber || false);

                if (!wsRef.current) {
                  const ws = new WebSocket("wss://sunny.bixmy.party/ws");
                  wsRef.current = ws;

                  ws.onopen = () => {
                    ws.send(
                      JSON.stringify({
                        type: "viewer-join",
                        streamerId: auth.channelId,
                      })
                    );

                    fetch(
                      `https://sunny.bixmy.party/game-state/${auth.channelId}`
                    )
                      .then((res) => res.json())
                      .then((data) => {
                        if (data?.type === "game-state") {
                          setGameState(data as GameState);
                        }
                      });
                  };

                  ws.onmessage = (event) => {
                    const msg = JSON.parse(event.data);
                    if (msg.type === "game-state") {
                      setGameState(msg as GameState);
                    }
                  };

                  ws.onerror = (err) => console.error("WS Error", err);
                  ws.onclose = () => (wsRef.current = null);
                }
              }
            });
        });

        clearInterval(waitForTwitch);
      }
    }, 100);

    return () => clearInterval(waitForTwitch);
  }, [isIdentityLinked]);

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const handleConnect = () => {
    if (window.Twitch?.ext?.actions?.requestIdShare) {
      window.Twitch.ext.actions.requestIdShare();

      setTimeout(() => {
        if (!token) return;
        fetch("https://sunny.bixmy.party/extension/login", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.userId && !data.userId.startsWith("U")) {
              setIsIdentityLinked(true);
              setUserId(data.userId);
              setUsername(data.username || "Unknown");
              setIsSubscriber(data.isSubscriber || false);
            }
          });
      }, 3000);
    }
  };

  const checkAndNavigate = (target: typeof activeFrame) => {
    if (!gameState || !isIdentityLinked) return;
    setActiveFrame(target);
  };

  const viewer = username.toLowerCase();
  const queue = gameState?.availableQueueDataForExtensions || [];
  const inCafeList = gameState?.inCafeInfo || [];
  const queueIndex = queue.findIndex(
    (q) => q.userName?.toLowerCase() === viewer
  );
  const inCafe = inCafeList.some((u) => u?.userName?.toLowerCase() === viewer);
  const isInQueue = queueIndex !== -1;
  const disableJoin = inCafe || isInQueue;

  if (!isIdentityLinked) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[9999]">
        <button
          className="px-6 py-3 text-lg bg-[#9146ff] text-white rounded-md shadow hover:scale-105 transition"
          onClick={handleConnect}
        >
          Connect with Twitch
        </button>
      </div>
    );
  }

  return (
    <div
      className="w-screen h-screen relative"
      style={{
        background: isMobile
          ? "url('https://cdn.bixmy.party/sprite-extension/mobile-bg.png') center / cover no-repeat"
          : "transparent",
      }}
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setTimeout(() => {
          const inside =
            containerRef.current?.matches?.(":hover") ||
            buttonRef.current?.matches?.(":hover");
          if (!inside) setIsHovering(false);
        }, 100);
      }}
    >
      <div
        className={`fixed top-1/2 transform -translate-y-1/2 z-[1000] transition-all duration-300 ${
          isHovering ? "left-[20px]" : "left-[-10px]"
        }`}
        ref={buttonRef}
      >
        <div className="flex flex-col gap-4 items-center">
          <QueueButton
            onClick={() => checkAndNavigate("queue")}
            queueIndex={queueIndex}
            inCafe={inCafe}
            selected={activeFrame === "queue"}
          />
          <CustomerButton
            onClick={() => {
              if (!disableJoin) checkAndNavigate("join");
            }}
            disabled={disableJoin}
            selected={activeFrame === "join"}
          />
        </div>
      </div>

      {activeFrame === "queue" && gameState && (
        <div className="fixed inset-0 flex items-center justify-center z-[999]">
          <QueueFrame
            onClose={() => setActiveFrame(null)}
            onJoinClick={() => setActiveFrame("join")}
            gameState={gameState}
            inCafe={inCafe}
            isInQueue={isInQueue}
          />
        </div>
      )}

      {activeFrame === "join" && (
        <div className="fixed inset-0 flex items-center justify-center z-[999]">
          <JoinFrame
            onClose={() => setActiveFrame(null)}
            onNext={(skin: Skin) => {
              setSelectedSkin(skin);
              setActiveFrame("order");
            }}
          />
        </div>
      )}

      {activeFrame === "order" && gameState && selectedSkin && (
        <div className="fixed inset-0 flex items-center justify-center z-[999]">
          <OrderFrame
            selectedSkin={selectedSkin}
            selectedFood={selectedFood}
            setSelectedFood={setSelectedFood}
            onClose={() => setActiveFrame(null)}
            onBack={() => setActiveFrame("join")}
            onNext={goToReview}
            gameState={gameState}
            username={username}
            availableFoods={availableFoods}
          />
        </div>
      )}

      {activeFrame === "review" && (
        <div className="fixed inset-0 flex items-center justify-center z-[999]">
          <ReviewFrame
            selectedSkin={selectedSkin}
            selectedFood={selectedFood}
            onClose={() => setActiveFrame(null)}
            onBack={() => setActiveFrame("order")}
            onNext={() => setActiveFrame("queue")}
            token={token!}
            userId={userId!}
            username={username}
            isSubscriber={isSubscriber}
            streamerId={streamerId!}
          />
        </div>
      )}

      {/* Debug window size */}
      <div
        className="fixed bottom-3 right-3 z-[9999] px-4 py-2 rounded-md bg-black/80 text-white text-lg font-mono font-extrabold tracking-wider shadow-lg pointer-events-none"
        style={{
          opacity: 0.9,
          transform: "rotate(-2deg)",
          border: "2px dashed #ffffff55",
          backdropFilter: "blur(2px)",
        }}
      >
        {windowSize.width} × {windowSize.height} - width x height
      </div>
    </div>
  );
};
export default MainPage;
