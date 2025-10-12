import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testMatch: ['**.spec.ts', '**test.ts'],
  testEnvironment: 'node',
  moduleDirectories: ['src', 'node_modules', '.', 'src/requests'],
  moduleNameMapper: {
    '/^@/(.*)$/': '<rootDir>/src/$1',
    '^@requests/(.*)$': '<rootDir>/src/requests/$1',
  },
  modulePaths: ['<rootDir>'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
};

export default config;
