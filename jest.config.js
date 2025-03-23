/** @type {import('jest').Config} */
const config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['ts-jest', { isolatedModules: true }],
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@app': '<rootDir>/src/app',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@middleware/(.*)$': '<rootDir>/src/middleware/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },
};

export default config;
