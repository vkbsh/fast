const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

module.exports = createJestConfig({
  testPathIgnorePatterns: ["<rootDir>/src/test/e2e/"],
});
