import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom", // Используем среду, имитирующую браузер
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"], // Подключаем setupTests.ts
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.app.json", // Указываем путь к tsconfig.json
        useESM: true, // Включаем поддержку ESM
      },
    ],
  },
  transformIgnorePatterns: [
    "node_modules/(?!(redux-persist)/)", // Исключаем redux-persist из игнорирования
  ],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy", // Игнорируем CSS/SCSS файлы
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"], // Обрабатываем .ts и .tsx как ESM
};

export default config;
