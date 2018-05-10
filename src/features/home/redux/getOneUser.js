import {
  HOME_GET_ONE_USER_BEGIN,
  HOME_GET_ONE_USER_SUCCESS,
  HOME_GET_ONE_USER_FAILURE,
  HOME_GET_ONE_USER_DISMISS_ERROR,
} from './constants';

import userService from '.././services/user';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getOneUser(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_GET_ONE_USER_BEGIN,
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
      userServ.getOne(
        args.id,
        (res) => {
          dispatch({
            type: HOME_GET_ONE_USER_SUCCESS,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: HOME_GET_ONE_USER_FAILURE,
            error: err,
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
export function dismissGetOneUserError() {
  return {
    type: HOME_GET_ONE_USER_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_GET_ONE_USER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getOneUserPending: true,
        getOneUserError: null,
      };

    case HOME_GET_ONE_USER_SUCCESS:
      // The request is success
      return {
        ...state,
        getOneUserPending: false,
        getOneUserError: null,
      };

    case HOME_GET_ONE_USER_FAILURE:
      // The request is failed
      return {
        ...state,
        getOneUserPending: false,
        getOneUserError: action.error,
      };

    case HOME_GET_ONE_USER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getOneUserError: null,
      };

    default:
      return state;
  }
}
