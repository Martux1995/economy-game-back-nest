import type { Config } from '@jest/types';

export default {
  testMatch: ['**/?(*.)+(spec|test).+(ts)'],
  transform: {
    '^.+.(js|ts)$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  maxWorkers: 5,
  transformIgnorePatterns: ['node_modules'],
  testPathIgnorePatterns: ['node_modules'],
  coveragePathIgnorePatterns: ['node_modules'],
  watchPathIgnorePatterns: ['node_modules', 'postgres'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**',
    '!**/index.ts',
    '!**/main.ts',
    '!**/*.mock.ts',
    '!**/*.module.ts',
    '!**/*.constants.ts',
    '!**/*.enum.ts',
    '!**/*.dto.ts',
    '!**/*.entity.ts',
    '!**/*.model.ts',
  ],
} as Config.InitialOptions;
