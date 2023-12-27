const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

module.exports = createJestConfig({
  testPathIgnorePatterns: ["<rootDir>/src/tests/e2e/"],
});
