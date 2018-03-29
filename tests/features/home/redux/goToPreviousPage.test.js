import { expect } from 'chai';

import {
  HOME_GO_TO_PREVIOUS_PAGE,
} from 'src/features/home/redux/constants';

import {
  goToPreviousPage,
  reducer,
} from 'src/features/home/redux/goToPreviousPage';

describe('home/redux/goToPreviousPage', () => {
  it('returns correct action by goToPreviousPage', () => {
    expect(goToPreviousPage()).to.have.property('type', HOME_GO_TO_PREVIOUS_PAGE);
  });

  it('handles action type HOME_GO_TO_PREVIOUS_PAGE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_GO_TO_PREVIOUS_PAGE }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
