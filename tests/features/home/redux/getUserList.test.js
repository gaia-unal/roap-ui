import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_GET_USER_LIST_BEGIN,
  HOME_GET_USER_LIST_SUCCESS,
  HOME_GET_USER_LIST_FAILURE,
  HOME_GET_USER_LIST_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  getUserList,
  dismissGetUserListError,
  reducer,
} from 'src/features/home/redux/getUserList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getUserList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getUserList succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getUserList())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_GET_USER_LIST_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_GET_USER_LIST_SUCCESS);
      });
  });

  it('dispatches failure action when getUserList fails', () => {
    const store = mockStore({});

    return store.dispatch(getUserList({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_GET_USER_LIST_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_GET_USER_LIST_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetUserListError', () => {
    const expectedAction = {
      type: HOME_GET_USER_LIST_DISMISS_ERROR,
    };
    expect(dismissGetUserListError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_GET_USER_LIST_BEGIN correctly', () => {
    const prevState = { getUserListPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_USER_LIST_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getUserListPending).to.be.true;
  });

  it('handles action type HOME_GET_USER_LIST_SUCCESS correctly', () => {
    const prevState = { getUserListPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_USER_LIST_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getUserListPending).to.be.false;
  });

  it('handles action type HOME_GET_USER_LIST_FAILURE correctly', () => {
    const prevState = { getUserListPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_USER_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getUserListPending).to.be.false;
    expect(state.getUserListError).to.exist;
  });

  it('handles action type HOME_GET_USER_LIST_DISMISS_ERROR correctly', () => {
    const prevState = { getUserListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_USER_LIST_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getUserListError).to.be.null;
  });
});
