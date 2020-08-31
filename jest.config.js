module.exports = {
  testEnvironment: "node",
  verbose: true,
  projects: [
    "<rootDir>/packages/*/jest.config.js",
  ],
  coverageDirectory: "<rootDir>/coverage/",
  collectCoverageFrom: [
    "<rootDir>/packages/*/src/**/*.{ts,tsx,js,jsx}",
    "!<rootDir>/packages/*/src/**/*.spec.{ts,tsx,js,jsx}",
    "!<rootDir>/packages/*/src/**/*.stories.*",
  ],
  reporters: [
    "default",
    ["jest-junit", {
      outputDirectory: "./reports",
      suiteNameTemplate: "{filepath}",
      classNameTemplate: "{classname}",
      titleTemplate: "{title}"
    }],
  ],
  testURL: "http://localhost/",
  // moduleNameMapper: {
  //   '.json$': 'identity-obj-proxy',
  // },
  moduleDirectories: [
    "node_modules",
  ],
  snapshotSerializers: [
    "enzyme-to-json/serializer",
    "jest-emotion"
  ],
};
