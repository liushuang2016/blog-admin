import fetch from 'dva/fetch';
import { notification } from 'antd';
import hash from 'hash.js';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  444: '验证错误',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const checkStatus = body => {
  if (body.status >= 200 && body.status < 300) {
    if (body.msg) {
      notification.success({
        message: body.msg
      })
    }
    return body;
  }
  const errortext = body.msg || codeMessage[body.status];
  notification.error({
    message: `请求错误 ${body.status}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = body.status;
  error.body = body;
  throw error;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, option) {
  const options = {
    ...option,
    credentials: 'include'
  };

  options.headers = {
    'Accept': 'application/json'
  }

  if (options.body) {
    options.body = JSON.stringify(options.body)
    options.headers['Content-Type'] = 'application/json; charset=utf-8'
  }

  return fetch(url, options)
    .then(res => res.json())
    .then(checkStatus)
    .catch(e => {
      const status = e.name;
      if (status === 401) {
        // @HACK
        /* eslint-disable no-underscore-dangle */
        window.g_app._store.dispatch({
          type: 'login/logout',
        });
      }
      return e.body ? e.body : {}
    });
}
