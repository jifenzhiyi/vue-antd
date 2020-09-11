import storage from '@/utils/storage';

export default (store) => {
  // store初始化的时候，将存储在localStoreage中的数据还原
  if (localStorage) {
    const tabList = storage.get('tab_list');
    tabList && store.commit('SET_TAB_LIST', tabList);
    const systemType = storage.get('systemType');
    systemType && store.commit('SET_SYSTEM_TYPE', systemType);
  }

  // 如果用户相关状态发生变化，自动存入localStoreage
  store.subscribe((mutation, state) => {
    mutation.type.indexOf('TAB') > -1 && storage.set('tab_list', state.tabList);
    mutation.type === 'SET_AJAX_CONFIG' && storage.set('ajax_config', state.ajaxConfig);
    mutation.type === 'SET_HEADER_CURRENT' && storage.set('header_current', state.headerCurrent);
    mutation.type === 'SET_ASIDE_CURRENT' && storage.set('aside_current', state.asideCurrent);
    mutation.type === 'SET_WAREHOUSE_ID' && storage.set('warehouse_id', state.warehouseId);
    mutation.type === 'SET_SYSTEM_TYPE' && storage.set('system_type', state.systemType);
    mutation.type === 'SET_OPEN_KEYS' && storage.set('open_keys', state.openKeys);
  });
};
