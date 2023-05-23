import type { Config } from '@jest/types';

export default {
  testMatch: ['**/?(*.)+(spec|test).+(ts)'],
  transform: {
    '^.+.(js|ts)$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  transformIgnorePatterns: ['node_modules'],
  testPathIgnorePatterns: ['node_modules'],
  coveragePathIgnorePatterns: ['node_modules'],
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
    '!*/database/*.ts',
  ],
} as Config.InitialOptions;
