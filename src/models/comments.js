import { fetchComments } from "@/services/comments";

export default {
  namespace: 'comments',
  state: {
    list: [],
    totalCount: 0
  },
  effects: {
    *getComments({ payload }, { call, put }) {
      const body = yield call(fetchComments, payload)
      if (body.status === 200) {
        yield put({
          type: 'changeList',
          payload: body.data
        })
      }
    },
  },
  reducers: {
    changeList(state, { payload }) {
      return {
        ...state,
        list: payload.comments,
        totalCount: payload.totalCount
      }
    },
  }
}
