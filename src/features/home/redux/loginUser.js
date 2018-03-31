import rs from 'jsrsasign';

import {
  HOME_LOGIN_USER_BEGIN,
  HOME_LOGIN_USER_SUCCESS,
  HOME_LOGIN_USER_FAILURE,
  HOME_LOGIN_USER_DISMISS_ERROR,
} from './constants';

import loginUserService from '.././services/loginUser';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function loginUser(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_LOGIN_USER_BEGIN,
    });
    const loginUserServ = new loginUserService();
    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      loginUserServ.post(
        args.email,
        args.password,
        (res) => {
          dispatch({
            type: HOME_LOGIN_USER_SUCCESS,
            user: {
              ...rs.KJUR.jws.JWS.readSafeJSONString(rs.b64utoutf8(res.body.token.split('.')[1])),
              token: res.body.token
            }
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: HOME_LOGIN_USER_FAILURE,
            loginUserError: err,
          });
          reject(err);
        }
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissLoginUserError() {
  return {
    type: HOME_LOGIN_USER_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_LOGIN_USER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loginUserPending: true,
        loginUserError: null,
      };

    case HOME_LOGIN_USER_SUCCESS:
      // The request is success
      return {
        ...state,
        loginUserPending: false,
        loginUserError: null,
        user: action.user,
      };

    case HOME_LOGIN_USER_FAILURE:
      // The request is failed
      return {
        ...state,
        loginUserPending: false,
        loginUserError: action.loginUserError,
      };

    case HOME_LOGIN_USER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loginUserError: null,
      };

    default:
      return state;
  }
}
