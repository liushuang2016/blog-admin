import request from '@/utils/request';
import { BaseUrl } from '@/utils/constant';

// 获取用户列表
export async function fetchUsers(page = 1) {
  return request(`${BaseUrl}/admin/users/all?p=${page}`);
}

// 获取当前用户
export async function fetchCurrentUser() {
  return request(`${BaseUrl}/admin/users/currentUser`);
}

// 登录
export async function fetchLogin(params) {
  return request(`${BaseUrl}/admin/users/login`, {
    method: 'POST',
    body: {
      ...params
    }
  })
}

// 登出
export async function fetchLogout() {
  return request(`${BaseUrl}/admin/users/logout`, {
    method: 'GET'
  })
}
