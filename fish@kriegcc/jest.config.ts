import type { Config } from "jest"
// const UUID = __dirname.split("/").slice(-1)[0]

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  // fix in cjsEnvironment.js "const NodeEnvironment = require('jest-environment-node').TestEnvironment;""
  testEnvironment: "cjs-jest-test-runtime",
  clearMocks: true,
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  moduleDirectories: ["node_modules", "./src"],
  // moduleNameMapper: {
  //   "^lodash-es$": "lodash",
  // },
  // globals: {
  //   "ts-jest": {
  //     tsconfig: "./tsconfig.json",
  //   },
  //   __meta: {
  //     uuid: UUID,
  //   },
  // },
}

export default config
