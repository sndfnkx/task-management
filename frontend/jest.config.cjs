module.exports = {
  testEnvironment: 'jsdom',
  transform: { '^.+\\.[jt]sx?$': 'babel-jest' },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    // чтобы импорты .css/.scss не ломали тесты
    '\\.(css|scss|sass|less)$': 'identity-obj-proxy'
  }
};
