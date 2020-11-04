import request from '@/utils/request';

// 登录
export const login = (data) => request.send('/api/users/login', { method: 'POST', data });

// 查询数据显示列表表头
// export const queryPageUrl = (params) => request.send('/api/configWms/queryPageUrl', params);

// 权限控制接口
export const queryRoleMenu = () => request.send('/api/users/queryWarehouseRoleMenu', { method: 'POST' });

// 列表查询
export const queryPageUrl = (data) => request.send('/api/configWms/queryPageUrl', { method: 'POST', data });

// 获取字典列表
export const getDict = () => request.send('/api/users/getDict', { method: 'POST' });
