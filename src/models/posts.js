import { fetchPosts } from "@/services/posts";

export default {
  namespace: 'posts',
  state: {
    list: [],
    totalCount: 0
  },
  effects: {
    *getPosts({ payload: page }, { call, put }) {
      const body = yield call(fetchPosts, page)
      if (body.status === 200) {
        yield put({
          type: 'changeList',
          payload: body.data
        })
      }
    }
  },
  reducers: {
    changeList(state, { payload }) {
      return {
        ...state,
        list: payload.posts,
        totalCount: payload.totalCount
      }
    }
  }
}
