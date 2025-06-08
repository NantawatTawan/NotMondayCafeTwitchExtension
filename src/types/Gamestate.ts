export type GameState = {
  type: "game-state";
  streamerId: string;
  availableFoodID: string[];
  availableQueueDataForExtensions: {
    userName: string;
    characterName: string;
    menuName: string;
  }[];
  inCafeInfo: {
    userName: string;
    currentCharacterName: string;
  }[];
};
