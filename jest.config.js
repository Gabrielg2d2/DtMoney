module.exports = {
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['/node_modules/'],
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(js|jsx|ts|tsx)?',
    '!**/*.d.ts', // config types
    '!src/index.tsx',
    '!src/pages/Home/index.tsx',
    '!src/**/*-interface.ts',
    '!src/util/index.ts',
    '!src/components/index.ts',
    '!src/domain/transactions/types/**'
  ],
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      branches: 1,
      functions: 1,
      lines: 1,
      statements: 1
    }
  },
  maxWorkers: '50%',
  testMatch: ['**/?(*.)+(spec|test).(js|jsx|ts|tsx)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileTransformer.js'
  }
}
