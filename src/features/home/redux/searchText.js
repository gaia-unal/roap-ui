// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_SEARCH_TEXT,
} from './constants';

export function searchText(textSearch) {
  return {
    type: HOME_SEARCH_TEXT,
    textSearch,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_SEARCH_TEXT:
      return {
        ...state,
        textSearch: action.textSearch,
        offset: 0,
        page: 1,
      };

    default:
      return state;
  }
}
