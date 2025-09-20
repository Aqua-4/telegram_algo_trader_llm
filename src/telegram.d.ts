interface TelegramWebApp {
  initData: string;
  initDataUnsafe: object;
  sendData(data: string): void;
  close(): void;
  expand(): void;
}

interface Window {
  Telegram: {
    WebApp: TelegramWebApp;
  };
}
