/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  rootDir: "./",
  preset: "ts-jest",
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.ts"],
  roots: ["./src/", "./test/"],
};