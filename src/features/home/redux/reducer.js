import initialState from './initialState';
import { reducer as getLearningObjectListReducer } from './getLearningObjectList';
import { reducer as goToPreviousPageReducer } from './goToPreviousPage';
import { reducer as goToNextPageReducer } from './goToNextPage';
import { reducer as searchTextReducer } from './searchText';
import { reducer as loginUserReducer } from './loginUser';
import { reducer as signinUserReducer } from './signinUser';
import { reducer as getUserListReducer } from './getUserList';
import { reducer as userValidateReducer } from './userValidate';

const reducers = [
  getLearningObjectListReducer,
  goToPreviousPageReducer,
  goToNextPageReducer,
  searchTextReducer,
  loginUserReducer,
  signinUserReducer,
  getUserListReducer,
  userValidateReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
