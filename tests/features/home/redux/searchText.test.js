import { expect } from 'chai';

import {
  HOME_SEARCH_TEXT,
} from 'src/features/home/redux/constants';

import {
  searchText,
  reducer,
} from 'src/features/home/redux/searchText';

describe('home/redux/searchText', () => {
  it('returns correct action by searchText', () => {
    expect(searchText()).to.have.property('type', HOME_SEARCH_TEXT);
  });

  it('handles action type HOME_SEARCH_TEXT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_SEARCH_TEXT }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
