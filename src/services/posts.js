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

// 获取文章详情
export function fetchPost(id) {
  return request(`${BaseUrl}/admin/posts/${id}/edit`)
}

// 编辑文章
export function fetchEditPost(params) {
  return request(`${BaseUrl}/admin/posts/${params.id}/edit`, {
    method: 'POST',
    body: {
      title: params.title,
      tags: params.tags,
      content: params.content
    }
  })
}
