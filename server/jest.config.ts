import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!(@apollo|graphql-tag)/)"],
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
};

export default config;
