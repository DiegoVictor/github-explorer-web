const jestConfig = require('./jest.config');

module.exports = {
  jest(config) {
    Object.assign(config, jestConfig);
    return config;
  },
};
