import {
  HOME_USER_VALIDATE_BEGIN,
  HOME_USER_VALIDATE_SUCCESS,
  HOME_USER_VALIDATE_FAILURE,
  HOME_USER_VALIDATE_DISMISS_ERROR,
} from './constants';

import userValidateService from '.././services/userValidate';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function userValidate(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_USER_VALIDATE_BEGIN,
    });
    const userValidateServ = new userValidateService();
    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      userValidateServ.get(
        args.token,
        (res) => {
          dispatch({
            type: HOME_USER_VALIDATE_SUCCESS,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: HOME_USER_VALIDATE_FAILURE,
            signinUserError: err,
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
export function dismissUserValidateError() {
  return {
    type: HOME_USER_VALIDATE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_USER_VALIDATE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        userValidatePending: true,
        userValidateError: null,
      };

    case HOME_USER_VALIDATE_SUCCESS:
      // The request is success
      return {
        ...state,
        userValidatePending: false,
        userValidateError: null,
      };

    case HOME_USER_VALIDATE_FAILURE:
      // The request is failed
      return {
        ...state,
        userValidatePending: false,
        userValidateError: action.data.error,
      };

    case HOME_USER_VALIDATE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        userValidateError: null,
      };

    default:
      return state;
  }
}
