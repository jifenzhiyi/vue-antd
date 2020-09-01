const path = require('path');

const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  lintOnSave: true,
  devServer: {
    port: 7070,
    host: '0.0.0.0',
    open: true,
  },
  configureWebpack: {
    resolve: {
      alias: {
        comps: path.join(__dirname, 'src/components'),
      },
    },
  },
  chainWebpack(config) {
    // 1.项目中默认svg加载规则排除掉icons/svg
    config.module.rule('svg').exclude.add(resolve('src/icons'));
    // 2.svg-loader配置
    config.module.rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons')).end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' });
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#1DA57A', // 全局主色
            'link-color': '#1DA57A', // 链接色
            'success-color': '#52c41a', // 成功色
            'warning-color': '#faad14', // 警告色
            'error-color': '#f5222d', // 错误色
            'font-size-base': '14px', // 主字号
            'heading-color': 'rgba(0, 0, 0, 0.85)', // 标题色
            'text-color': 'rgba(0, 0, 0, 0.65)', // 主文本色
            'text-color-secondary': 'rgba(0, 0, 0, 0.45)', // 次文本色
            'disabled-color': 'rgba(0, 0, 0, 0.25)', // 失效色
            'border-radius-base': '2px', // 组件/浮层圆角
            'border-color-base': '#d9d9d9', // 边框色
            'box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)', // 浮层阴影
          },
          javascriptEnabled: true,
        },
      },
    },
  },
};
