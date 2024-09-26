import type { Config } from "jest"

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  // testEnvironment: "cjs-jest-test-runtime",
  clearMocks: true,
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  moduleDirectories: ["node_modules", "./src"],
}

export default config
