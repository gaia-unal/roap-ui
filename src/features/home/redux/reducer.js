import initialState from './initialState';
import { reducer as getLearningObjectListReducer } from './getLearningObjectList';
import { reducer as goToPreviousPageReducer } from './goToPreviousPage';
import { reducer as goToNextPageReducer } from './goToNextPage';
import { reducer as searchTextReducer } from './searchText';

const reducers = [
  getLearningObjectListReducer,
  goToPreviousPageReducer,
  goToNextPageReducer,
  searchTextReducer,
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
