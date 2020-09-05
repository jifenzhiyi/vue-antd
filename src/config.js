export const NODE_ENV = process.env.NODE_ENV || 'development';

export const API_LIST = {
  // dev: 'http://192.168.188.13:9050/',
  dev: 'http://192.168.188.16:9250/malu-wms/',
  prod: `${window.location.origin}/malu-wms`,
};

export const END_POINT = API_LIST[NODE_ENV];
