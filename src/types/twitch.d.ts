declare global {
  interface Window {
    Twitch?: {
      ext: {
        onAuthorized: (
          cb: (auth: { token: string; channelId: string }) => void
        ) => void;
        actions?: {
          requestIdShare: () => void;
        };
      };
    };
  }
}

export {};
