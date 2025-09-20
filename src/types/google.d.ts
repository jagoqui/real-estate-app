declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: unknown) => void;
          prompt: () => void;
          disableAutoSelect: () => void;
          renderButton: (parent: Element, options: unknown) => void;
        };
      };
    };
  }
}
