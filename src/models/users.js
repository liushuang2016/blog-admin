import { fetchUsers } from "@/services/users";

export default {
  namespace: 'users',
  state: {
    list: [],
    totalCount: 0
  },
  effects: {
    *getUsers({ payload: page }, { call, put }) {
      const body = yield call(fetchUsers, page)
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
        list: payload.users,
        totalCount: payload.totalCount
      }
    },
  }
}
