module.exports = {
  roots: [
    '<rootDir>/test'
  ],
  testMatch: [
    '<rootDir>/test/**/*.spec.ts'
  ],
  transform: {
    '^.+\\.ts$': 'babel-jest'
  },
  globals: {
    tsConfig: {
      skipLibCheck: true,
      skipDefaultLibCheck: true
    }
  }
}
