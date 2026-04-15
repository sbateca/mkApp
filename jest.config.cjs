module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx|mjs)$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!@faker-js/faker)/"],
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "jest-transform-stub",
  },
  setupFilesAfterEnv: [
    "@testing-library/jest-dom",
    "<rootDir>/src/setupTests.ts",
  ],
};
