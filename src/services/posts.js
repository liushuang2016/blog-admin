import request from "@/utils/request";
import { BaseUrl } from "@/utils/constant";

// 获取文章列表
export async function fetchPosts(page) {
  return request(`${BaseUrl}/admin/posts/all?p=${page}`)
}

// 创建文章
export function fetchCreatePosts(params) {
  return request(`${BaseUrl}/admin/posts/create`, {
    method: 'POST',
    body: {
      ...params
    }
  })
}
