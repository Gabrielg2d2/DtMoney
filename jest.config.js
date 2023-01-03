module.exports = {
  roots: ["<rootDir>/src"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  coverageDirectory: "coverage",
  testMatch: ["**/?(*.)+(spec|test).+(ts|tsx|js)"],
  transform: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/fileTransformer.js",
    "\\.css$": "some-css-transformer",
    "\\.[jt]sx?$": "ts-jest",
  },
};
