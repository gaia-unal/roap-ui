import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_SIGNIN_USER_BEGIN,
  HOME_SIGNIN_USER_SUCCESS,
  HOME_SIGNIN_USER_FAILURE,
  HOME_SIGNIN_USER_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  signinUser,
  dismissSigninUserError,
  reducer,
} from 'src/features/home/redux/signinUser';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/signinUser', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when signinUser succeeds', () => {
    const store = mockStore({});

    return store.dispatch(signinUser())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_SIGNIN_USER_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_SIGNIN_USER_SUCCESS);
      });
  });

  it('dispatches failure action when signinUser fails', () => {
    const store = mockStore({});

    return store.dispatch(signinUser({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_SIGNIN_USER_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_SIGNIN_USER_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissSigninUserError', () => {
    const expectedAction = {
      type: HOME_SIGNIN_USER_DISMISS_ERROR,
    };
    expect(dismissSigninUserError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_SIGNIN_USER_BEGIN correctly', () => {
    const prevState = { signinUserPending: false };
    const state = reducer(
      prevState,
      { type: HOME_SIGNIN_USER_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.signinUserPending).to.be.true;
  });

  it('handles action type HOME_SIGNIN_USER_SUCCESS correctly', () => {
    const prevState = { signinUserPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SIGNIN_USER_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.signinUserPending).to.be.false;
  });

  it('handles action type HOME_SIGNIN_USER_FAILURE correctly', () => {
    const prevState = { signinUserPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SIGNIN_USER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.signinUserPending).to.be.false;
    expect(state.signinUserError).to.exist;
  });

  it('handles action type HOME_SIGNIN_USER_DISMISS_ERROR correctly', () => {
    const prevState = { signinUserError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_SIGNIN_USER_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.signinUserError).to.be.null;
  });
});
