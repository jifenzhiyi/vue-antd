export const NODE_ENV = process.env.NODE_ENV || 'dev';

export const API_LIST = {
  // dev: 'http://192.168.188.16:9230/malu-wms/', // config
  dev: 'http://192.168.188.16:9093/malu-wms/', // denso
  // dev: 'http://192.168.7.124:9230/malu-wms/', // 蒋本地
  prod: `${window.location.origin}/malu-wms/`,
};

export const END_POINT = API_LIST[NODE_ENV];
