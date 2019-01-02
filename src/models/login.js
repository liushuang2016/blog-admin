import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { fetchLogin, fetchLogout } from '@/services/user';

export default {
  namespace: 'login',

  state: {
    status: false,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const body = yield call(fetchLogin, payload);
      // Login successfully
      if (body.status === 200) {
        yield put({
          type: 'changeLoginStatus',
          payload: body,
        });
        reloadAuthorized();
        yield put(routerRedux.replace('/'));
      }
    },

    *logout(_, { call, put }) {
      const body = yield call(fetchLogout)
      if (body.status === 200) {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false
          },
        });
        reloadAuthorized();
        yield put(
          routerRedux.push('/user/login')
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      if (payload.status === 200) {
        setAuthority('admin');
      } else {
        setAuthority('guest')
      }

      return {
        ...state,
        status: !!payload.status
      };
    },
  },
};
