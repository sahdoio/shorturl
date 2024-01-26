import type { Config } from 'jest'

const config: Config = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/app/**/*.ts'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    'node_modules',
    'main',
    'entities',
    'database',
    'helpers',
    'env',
    'server.ts',
    'errors/index.ts'
  ],
  testPathIgnorePatterns: [
    "<rootDir>/src/app/main/"
  ],
  testEnvironment: 'node',
  preset: "ts-jest",
  setupFilesAfterEnv: ['./jest.setup.ts'],
  globalSetup: './jest.global.setup.ts',
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  }
}

export default config;