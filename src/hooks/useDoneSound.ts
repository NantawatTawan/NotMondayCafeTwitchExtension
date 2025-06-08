export const useClickSound = () => {
  const playClickSound = () => {
    const audio = new Audio("/doneSound.wav");
    audio.volume = 0.5;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  return playClickSound;
};
