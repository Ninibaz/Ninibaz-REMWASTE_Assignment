module.exports = {
  // The test environment that will be used for testing
  testEnvironment: 'node',

  // Indicates whether each individual test should be reported during the run
  verbose: true,

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>'],

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['/node_modules/'],

  // A map from regular expressions to paths to transformers
  transform: {},

  // Setup files that will be run before each test
  setupFiles: ['<rootDir>/tests/setup.js'],

  // The maximum amount of workers used to run your tests
  maxWorkers: '50%',

  // Allows for a custom setup after environment is set up
  // setupFilesAfterEnv: ['<rootDir>/tests/setup-after-env.js'],

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['json', 'lcov', 'text', 'clover'],

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/'
  ],
};