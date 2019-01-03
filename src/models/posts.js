import { fetchPosts, fetchCreatePosts } from "@/services/posts";
import { routerRedux } from "dva/router";

export default {
  namespace: 'posts',
  state: {
    list: [],
    totalCount: 0,
    created: false,
    createdMsg: ''
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
    },
    *createPosts({ payload }, { call, put }) {
      const body = yield call(fetchCreatePosts, payload)
      yield put({
        type: 'changeCreated',
        payload: body
      })
      // 创建成功路由跳转
      if (body.status === 200) {
        yield put(routerRedux.push('/posts/list'))
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
    },
    changeCreated(state, { payload }) {
      return {
        ...state,
        created: payload.status === 200,
        createdMsg: payload.msg
      }
    }
  }
}
