/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: [
    'default',
    ['jest-html-reporters', {
      publicPath: './test-reports',
      filename: 'api-test-report.html',
      expand: true
    }],
    ['jest-junit', {
      outputDirectory: './test-reports',
      outputName: 'api-test-report.xml'
    }]
  ]
};