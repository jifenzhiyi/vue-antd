import { mapState } from 'vuex';
import { queryRoleMenu } from '@/views/api';
import storage from '@/utils/storage';

export default {
  computed: mapState(['systemType']),
  data() {
    return {
      name: this.$storage.get('wms_user_name'), // 管理员账号
      warehouseIds: this.$storage.get('wms_warehouseIds') || [], // 仓库列表
    };
  },
  methods: {
    // 更新仓库id
    warehouseChange(val) {
      this.$store.commit('SET_WAREHOUSE_ID', val);
    },
    // 退出登录
    logout() {
      this.$notice_confirm({
        minfo: '是否确认退出？',
        func: () => {
          !this.$isPC() && this.$store.commit('CHANGE_ISFOLD');
          this.$store.commit('SET_TAB_LIST', [
            {
              h: '首页',
              title: '欢迎',
              key: '/welcome',
              closable: false,
            },
          ]);
          this.$storage.clear();
          this.$router.push('/login');
        },
      });
    },
    arrayToMap(arr, index) {
      const current = storage.get('wms_header_current');
      return arr.map((item, idx) => {
        const obj = {};
        obj.name = item.name;
        index === 0 ? (obj.icon = item.icon) : (obj.icon = 'menu');
        if (index === 0) {
          !current ? (obj.isSelect = idx === 0) : (obj.isSelect = current[0] === item.name);
        }
        if (item.childMenus && item.childMenus.length > 0) {
          obj.children = this.arrayToMap(item.childMenus, 1);
        } else {
          item.url === '/welcome' ? (obj.type = 'home') : (obj.type = 'list');
          obj.url = item.url || item.name;
        }
        return obj;
      });
    },
    async queryRoleMenu() {
      const res = await queryRoleMenu();
      const noHome = res.data.menuList.find((one) => one.name === '首页');
      if (!noHome) {
        res.data.menuList.unshift({
          name: '首页',
          icon: 'fa-home',
          childMenus: [
            {
              name: '欢迎',
              url: '/welcome',
            },
          ],
        });
      }
      const menuList = this.arrayToMap(res.data.menuList, 0);
      // TOTO 测试3级菜单
      // const current = storage.get('wms_header_current');
      // menuList.push({
      //   name: 'TEST',
      //   isSelect: current ? current[0] === 'TEST' : false,
      //   icon: 'fa-test',
      //   children: [
      //     {
      //       name: 'test1',
      //       icon: 'menu',
      //       children: [
      //         {
      //           name: 'test1-1',
      //           icon: 'pie-chart',
      //           type: 'list',
      //           url: '/test',
      //         },
      //       ],
      //     },
      //   ],
      // });

      this.$store.commit('SET_ROUTES', menuList);
      storage.set('wms_warehouseIds', res.data.warehouseIds);
      const warehouseId = storage.get('warehouse_id');
      !warehouseId && this.$store.commit('SET_WAREHOUSE_ID', res.data.warehouseIds[0]);
      this.initStorage();
    },
    initStorage() {
      const headerCurrent = storage.get('wms_header_current');
      !headerCurrent && this.$store.commit('SET_HEADER_CURRENT', ['首页']);
      const asideCurrent = storage.get('wms_aside_current');
      !asideCurrent && this.$store.commit('SET_ASIDE_CURRENT', ['欢迎']);
      const ajaxConfig = storage.get('wms_ajax_config');
      !ajaxConfig && this.$store.commit('SET_AJAX_CONFIG', `/${this.systemType}`);
      const tabList = storage.get('wms_tab_list');
      if (!tabList) {
        this.$store.commit('SET_TAB_LIST', [
          {
            h: '首页',
            title: '欢迎',
            key: `/${this.systemType}`,
            closable: false,
          },
        ]);
      }
    },
    queryAdminRoleMenu() {
      const menuList = [
        {
          name: '首页',
          isSelect: true,
          icon: 'fa-home',
          children: [
            {
              name: '欢迎',
              icon: 'menu',
              type: 'admin',
              url: '/admin',
            },
          ],
        },
        {
          name: '设置',
          isSelect: false,
          icon: 'fa-set',
          children: [
            {
              name: '设置导航',
              icon: 'menu',
              type: 'authorite',
              url: '/authorite',
            },
          ],
        },
      ];
      const current = storage.get('wms_header_current');
      if (current) {
        menuList.forEach((o) => {
          o.isSelect = current[0] === o.name;
        });
      }
      this.$store.commit('SET_ROUTES', menuList);
      this.initStorage();
    },
  },
};
