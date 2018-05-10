import initialState from './initialState';
import { reducer as getLearningObjectListReducer } from './getLearningObjectList';
import { reducer as goToPreviousPageReducer } from './goToPreviousPage';
import { reducer as goToNextPageReducer } from './goToNextPage';
import { reducer as searchTextReducer } from './searchText';
import { reducer as loginUserReducer } from './loginUser';
import { reducer as signinUserReducer } from './signinUser';
import { reducer as getUserListReducer } from './getUserList';
import { reducer as userValidateReducer } from './userValidate';
import { reducer as getLearningObjectMetadataSchemaReducer } from './getLearningObjectMetadataSchema';
import { reducer as createLearningObjectReducer } from './createLearningObject';
import { reducer as getLearningObjectFilesReducer } from './getLearningObjectFiles';
import { reducer as logoutUserReducer } from './logoutUser';
import { reducer as ratingLearningObjectReducer } from './ratingLearningObject';
import { reducer as userSendEmailReducer } from './userSendEmail';
import { reducer as getOneUserReducer } from './getOneUser';

const reducers = [
  getLearningObjectListReducer,
  goToPreviousPageReducer,
  goToNextPageReducer,
  searchTextReducer,
  loginUserReducer,
  signinUserReducer,
  getUserListReducer,
  userValidateReducer,
  getLearningObjectMetadataSchemaReducer,
  createLearningObjectReducer,
  getLearningObjectFilesReducer,
  logoutUserReducer,
  ratingLearningObjectReducer,
  userSendEmailReducer,
  getOneUserReducer,
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
