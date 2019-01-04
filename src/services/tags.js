import request from "@/utils/request";
import { BaseUrl } from "@/utils/constant";

export function fetchTags(page) {
  return request(`${BaseUrl}/admin/tags/all?p=${page}`)
}

// 删除
export function fetchDelTags(id) {
  return request(`${BaseUrl}/admin/tags/${id}/delete`)
}
