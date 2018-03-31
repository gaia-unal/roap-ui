import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_USER_VALIDATE_BEGIN,
  HOME_USER_VALIDATE_SUCCESS,
  HOME_USER_VALIDATE_FAILURE,
  HOME_USER_VALIDATE_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  userValidate,
  dismissUserValidateError,
  reducer,
} from 'src/features/home/redux/userValidate';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/userValidate', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when userValidate succeeds', () => {
    const store = mockStore({});

    return store.dispatch(userValidate())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_USER_VALIDATE_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_USER_VALIDATE_SUCCESS);
      });
  });

  it('dispatches failure action when userValidate fails', () => {
    const store = mockStore({});

    return store.dispatch(userValidate({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_USER_VALIDATE_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_USER_VALIDATE_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissUserValidateError', () => {
    const expectedAction = {
      type: HOME_USER_VALIDATE_DISMISS_ERROR,
    };
    expect(dismissUserValidateError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_USER_VALIDATE_BEGIN correctly', () => {
    const prevState = { userValidatePending: false };
    const state = reducer(
      prevState,
      { type: HOME_USER_VALIDATE_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.userValidatePending).to.be.true;
  });

  it('handles action type HOME_USER_VALIDATE_SUCCESS correctly', () => {
    const prevState = { userValidatePending: true };
    const state = reducer(
      prevState,
      { type: HOME_USER_VALIDATE_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.userValidatePending).to.be.false;
  });

  it('handles action type HOME_USER_VALIDATE_FAILURE correctly', () => {
    const prevState = { userValidatePending: true };
    const state = reducer(
      prevState,
      { type: HOME_USER_VALIDATE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.userValidatePending).to.be.false;
    expect(state.userValidateError).to.exist;
  });

  it('handles action type HOME_USER_VALIDATE_DISMISS_ERROR correctly', () => {
    const prevState = { userValidateError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_USER_VALIDATE_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.userValidateError).to.be.null;
  });
});
