module.exports = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  modulePaths: ["<rootDir>/src"],
  testRegex: "\\.test\\.ts$",
  transform: { "^.+\\.ts$": "ts-jest" },
  transformIgnorePatterns: ["!node_modules/"],
};
