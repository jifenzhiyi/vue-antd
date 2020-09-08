import { queryRoleMenu } from '@/views/api';
import storage from '@/utils/storage';

export default {
  methods: {
    arrayToMap(arr, index) {
      const current = storage.get('header_current');
      return arr.map((item, idx) => {
        const obj = {};
        obj.name = item.name;
        index === 0 ? obj.icon = item.icon : obj.icon = 'menu';
        index === 0 && (!current
          ? obj.isSelect = idx === 0
          : obj.isSelect = current[0] === item.name);
        if (item.childMenus && item.childMenus.length > 0) {
          obj.children = this.arrayToMap(item.childMenus, 1);
        } else {
          item.url === '/welcome' ? obj.type = 'home' : obj.type = 'list';
          obj.url = item.url || item.name;
        }
        return obj;
      });
    },
    async queryRoleMenu() {
      const res = await queryRoleMenu();
      const menuList = this.arrayToMap(res.data.menuList, 0);
      this.$store.commit('SET_ROUTES', menuList);
      storage.set('warehouseIds', res.data.warehouseIds);
      /* 是否存在 */
      const warehouseId = storage.get('warehouseId');
      !warehouseId && storage.set('warehouseId', res.data.warehouseIds[0]);
      const asideCurrent = storage.get('aside_current');
      !asideCurrent && storage.set('aside_current', ['/home']);
      const ajaxConfig = storage.get('ajax_config');
      !ajaxConfig && storage.set('ajax_config', '/home');
      const asideOpenKeys = storage.get('aside_openKeys');
      !asideOpenKeys && storage.set('aside_openKeys', []);
    },
  },
};
