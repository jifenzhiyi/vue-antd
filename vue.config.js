const path = require('path');
const htmlConfig = require('./package.json');

const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  lintOnSave: true,
  devServer: {
    hot: true,
    open: true,
    port: 7070,
    host: '0.0.0.0',
  },
  css: {
    extract: false,
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#e20028', // 全局主色
          'link-color': '#e20028', // 链接色
        },
        javascriptEnabled: true,
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        comps: path.join(__dirname, 'src/components'),
      },
    },
  },
  chainWebpack(config) {
    config.plugin('html').tap((args) => {
      args[0].title = `仓储管理系统v${htmlConfig.version}`;
      return args;
    });
    // 1.项目中默认svg加载规则排除掉icons/svg
    config.module.rule('svg').exclude.add(resolve('src/icons'));
    // 2.svg-loader配置
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' });
  },
};
