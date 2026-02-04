export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s?$': [
      'ts-jest', {
        useESM: true,
      }
    ],
  },
  transformIgnorePatterns: [
      '/node_modules/(?!rxjs)'
  ],
};
