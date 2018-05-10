import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_GET_ONE_USER_BEGIN,
  HOME_GET_ONE_USER_SUCCESS,
  HOME_GET_ONE_USER_FAILURE,
  HOME_GET_ONE_USER_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  getOneUser,
  dismissGetOneUserError,
  reducer,
} from 'src/features/home/redux/getOneUser';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getOneUser', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getOneUser succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getOneUser())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_GET_ONE_USER_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_GET_ONE_USER_SUCCESS);
      });
  });

  it('dispatches failure action when getOneUser fails', () => {
    const store = mockStore({});

    return store.dispatch(getOneUser({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_GET_ONE_USER_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_GET_ONE_USER_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetOneUserError', () => {
    const expectedAction = {
      type: HOME_GET_ONE_USER_DISMISS_ERROR,
    };
    expect(dismissGetOneUserError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_GET_ONE_USER_BEGIN correctly', () => {
    const prevState = { getOneUserPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_ONE_USER_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getOneUserPending).to.be.true;
  });

  it('handles action type HOME_GET_ONE_USER_SUCCESS correctly', () => {
    const prevState = { getOneUserPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_ONE_USER_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getOneUserPending).to.be.false;
  });

  it('handles action type HOME_GET_ONE_USER_FAILURE correctly', () => {
    const prevState = { getOneUserPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_ONE_USER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getOneUserPending).to.be.false;
    expect(state.getOneUserError).to.exist;
  });

  it('handles action type HOME_GET_ONE_USER_DISMISS_ERROR correctly', () => {
    const prevState = { getOneUserError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_ONE_USER_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getOneUserError).to.be.null;
  });
});
