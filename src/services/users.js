import request from "@/utils/request";
import { BaseUrl } from "@/utils/constant";

// 用户列表
export function fetchUsers(page) {
  return request(`${BaseUrl}/admin/users/all?p=${page}`)
}

// 删除用户
export function fetchDelUser(id) {
  return request(`${BaseUrl}/admin/users/${id}/delete`)
}
