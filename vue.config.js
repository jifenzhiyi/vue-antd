const path = require('path');
const htmlConfig = require('./package.json');
const menuData = require('./mock/menuList.json');

const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  lintOnSave: true,
  devServer: {
    port: 7070,
    host: '0.0.0.0',
    open: true,
    before(app) {
      // mock 模拟真实数据
      app.post('/api/users/login', (req, res) => {
        res.json(menuData);
      });
      app.post('/api/users/queryWarehouseRoleMenu', (req, res) => {
        res.json(menuData);
      });
    },
  },
  css: {
    extract: true,
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
      args[0].title = `管理系统v${htmlConfig.version}`;
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
