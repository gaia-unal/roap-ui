import { expect } from 'chai';

import {
  HOME_LOGOUT_USER,
} from 'src/features/home/redux/constants';

import {
  logoutUser,
  reducer,
} from 'src/features/home/redux/logoutUser';

describe('home/redux/logoutUser', () => {
  it('returns correct action by logoutUser', () => {
    expect(logoutUser()).to.have.property('type', HOME_LOGOUT_USER);
  });

  it('handles action type HOME_LOGOUT_USER correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_LOGOUT_USER }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
