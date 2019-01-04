import request from "@/utils/request";
import { BaseUrl } from "@/utils/constant";

export function fetchComments(params) {
  let query = `p=${params.page}`
  if (params.pid) {
    query += `&pid=${params.pid}`
  }
  if (params.uid) {
    query += `&uid=${params.uid}`
  }
  return request(`${BaseUrl}/admin/comments/all?${query}`)
}

// 删除评论
export function fetchDelComment(id) {
  return request(`${BaseUrl}/admin/comments/${id}/delete`)
}
