/* eslint-disable @typescript-eslint/no-var-requires */
const tsPreset = require('ts-jest/jest-preset')
const mongodbPreset = require('@shelf/jest-mongodb/jest-preset')

module.exports = {
  ...tsPreset,
  ...mongodbPreset,
  // preset: 'ts-jest',
  testEnvironment: 'node',
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: undefined,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
};