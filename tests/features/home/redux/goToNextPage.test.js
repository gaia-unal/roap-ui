import { expect } from 'chai';

import {
  HOME_GO_TO_NEXT_PAGE,
} from 'src/features/home/redux/constants';

import {
  goToNextPage,
  reducer,
} from 'src/features/home/redux/goToNextPage';

describe('home/redux/goToNextPage', () => {
  it('returns correct action by goToNextPage', () => {
    expect(goToNextPage()).to.have.property('type', HOME_GO_TO_NEXT_PAGE);
  });

  it('handles action type HOME_GO_TO_NEXT_PAGE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_GO_TO_NEXT_PAGE }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
