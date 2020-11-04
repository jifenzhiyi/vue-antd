export const NODE_ENV = process.env.NODE_ENV || 'development';

export const API_LIST = {
  // dev: 'http://localhost:7070/',
  dev: 'http://192.168.188.16:9230/malu-wms/', // config
  // dev: 'http://192.168.188.11:9135/malu-wms/', // cdyq
  prod: `${window.location.origin}/malu-wms/`,
};

export const END_POINT = API_LIST[NODE_ENV];
