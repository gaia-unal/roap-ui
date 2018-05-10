// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_LOGOUT_USER,
} from './constants';

export function logoutUser() {
  return {
    type: HOME_LOGOUT_USER,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_LOGOUT_USER:
      return {
        ...state,
        user: null
      };

    default:
      return state;
  }
}
