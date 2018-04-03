import {
  HOME_SIGNIN_USER_BEGIN,
  HOME_SIGNIN_USER_SUCCESS,
  HOME_SIGNIN_USER_FAILURE,
  HOME_SIGNIN_USER_DISMISS_ERROR,
} from './constants';

import userService from '.././services/user';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function signinUser(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_SIGNIN_USER_BEGIN,
    });
    const userServ = new userService();
    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      userServ.post(
        args.email,
        args.password,
        args.name,
        args.requestedRole,
        (res) => {
          dispatch({
            type: HOME_SIGNIN_USER_SUCCESS,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: HOME_SIGNIN_USER_FAILURE,
            signinUserError: err.response.body.description,
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
export function dismissSigninUserError() {
  return {
    type: HOME_SIGNIN_USER_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_SIGNIN_USER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        signinUserPending: true,
        signinUserError: null,
      };

    case HOME_SIGNIN_USER_SUCCESS:
      // The request is success
      return {
        ...state,
        signinUserPending: false,
        signinUserError: null,
      };

    case HOME_SIGNIN_USER_FAILURE:
      // The request is failed
      return {
        ...state,
        signinUserPending: false,
        signinUserError: action.signinUserError,
      };

    case HOME_SIGNIN_USER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        signinUserError: null,
      };

    default:
      return state;
  }
}
