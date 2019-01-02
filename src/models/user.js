import { query as queryUsers, queryCurrent, fetchCurrentUser, fetchUsers } from '@/services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    totalCount: 0
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const body = yield call(fetchUsers, payload);
      if (body.status === 200) {
        yield put({
          type: 'save',
          payload: body.data,
        });
      }
    },
    *fetchCurrent(_, { call, put }) {
      const body = yield call(fetchCurrentUser);
      if (body.status === 200) {
        yield put({
          type: 'saveCurrentUser',
          payload: body.data,
        });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        list: payload.users,
        totalCount: payload.totalCount
      };
    },
    saveCurrentUser(state, { payload }) {
      return {
        ...state,
        currentUser: payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
