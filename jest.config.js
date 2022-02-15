module.exports = {
  collectCoverage: true,
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(svg)$': 'jest-transform-stub',
  },
};
