import type { Config } from "jest"

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
}

export default config
