import request from '@/utils/request';

// 登录
export const login = (data) => request.send('/api/users/login', { method: 'POST', data }, { isLoading: true });

// 权限控制接口
export const queryRoleMenu = () => request.send('/api/users/queryWarehouseRoleMenu', { method: 'POST' });

// 列表配置查询
export const queryPageUrl = (data) => request.send('/api/configWms/queryPageUrl', { method: 'POST', data });

// 获取字典列表
export const getDict = () => request.send('/api/users/getDict', { method: 'POST' });

// 列表数据查询
export const getList = (config, data) => request.send(`${config}/queryList`, { method: 'POST', data });

// 列表操作功能
export const queryWareMenusButton = (data) => request.send('/api/users/queryWareMenusButton', { method: 'POST', data });

// 列表导出
export const exportList = (config, data, type) => request.send(`${config}/${type}`, { method: 'POST', data }, { isBlob: true });

// 列表更新
export const updateList = (config, data) => request.send(`${config}/update`, { method: 'POST', data });

// 列表添加
export const addList = (config, data) => request.send(`${config}/add`, { method: 'POST', data });
