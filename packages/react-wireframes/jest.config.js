module.exports = {
  testEnvironment: "node",
  verbose: true,
  name: "react-wireframes",
  displayName: "react-wireframes",
  testMatch: [`${__dirname}/src/**/*.spec.{js,jsx,ts,tsx}`],
  rootDir: "../../",
  setupFiles: ["<rootDir>/test/setupTests.js"],
};
