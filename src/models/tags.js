import { fetchTags } from "@/services/tags";

export default {
  namespace: 'tags',
  state: {
    list: [],
    totalCount: 0
  },
  effects: {
    *getTags({ payload: page }, { call, put }) {
      const body = yield call(fetchTags, page)
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
        list: payload.tags,
        totalCount: payload.totalCount
      }
    },
  }
}
