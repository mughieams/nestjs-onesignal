module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.test.json',
      },
    ],
  },
  testRegex: '.test.ts$',
  collectCoverageFrom: ['lib/**/*.*.ts'],
  setupFiles: ['./jest.setup.js'],
  testEnvironment: 'node',
};
