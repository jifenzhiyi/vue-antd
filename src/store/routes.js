const list = [
  {
    name: '首页',
    icon: 'home',
    isSelect: true,
    children: [
      {
        name: '数据概览', icon: 'menu', type: 'home', url: '/home',
      },
      {
        name: '测试列表', icon: 'menu', type: 'list', url: '/test1',
      },
      {
        name: '测试模块',
        icon: 'menu',
        children: [
          {
            name: 'aaa', icon: 'branches', type: 'list', url: '/test2',
          },
        ],
      },
    ],
  },
];

export default list;
