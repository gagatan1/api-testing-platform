/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.spec.js'],
  testTimeout: 15000,
  verbose: true,
  transform: {},
  // Поддержка ESM-файлов через node --experimental-vm-modules
  // transform: {} отключает ts-jest/babel — не нужны для чистого JS
};
