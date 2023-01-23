module.exports = {
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  transformIgnorePatterns: ['/node_modules/'],
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(js|jsx|ts|tsx)?',
    '!**/*.d.ts', // config types
    '!src/domain/**', // interfaces
    '!src/data-layer/transaction/use-cases/index.ts' // export files
  ],
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  maxWorkers: '50%',
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  testMatch: ['**/?(*.)+(spec|test).(js|jsx|ts|tsx)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileTransformer.js'
  }
}
