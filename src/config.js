export const NODE_ENV = process.env.NODE_ENV || 'dev';

export const API_LIST = {
  dev: 'http://192.168.188.16:9230/malu-wms/', // config
  prod: `${window.location.origin}/malu-wms/`,
};

export const END_POINT = API_LIST[NODE_ENV];
