const custom = require('../src/webpack/webpack.config');
module.exports = {
  framework: '@storybook/react',
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
    'storybook-dark-mode',
  ],
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config) => {
    const oneOfRule = config.module.rules.find((rule) => rule.oneOf);
    const babelRule = oneOfRule.oneOf.find((rule) => rule.loader?.includes('babel-loader'));
    babelRule.options.presets.push('@emotion/babel-preset-css-prop');
    config.resolve.fallback = Object.assign(config.resolve.fallback, custom.resolve.fallback);
    return config;
  },
};
