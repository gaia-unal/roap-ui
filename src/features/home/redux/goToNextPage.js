// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_GO_TO_NEXT_PAGE,
} from './constants';

export function goToNextPage() {
  return {
    type: HOME_GO_TO_NEXT_PAGE,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_GO_TO_NEXT_PAGE:
      return {
        ...state,
        offset: state.offset + state.count,
        page: state.page + 1,
      };

    default:
      return state;
  }
}
