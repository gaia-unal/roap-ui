import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_USER_SEND_EMAIL_BEGIN,
  HOME_USER_SEND_EMAIL_SUCCESS,
  HOME_USER_SEND_EMAIL_FAILURE,
  HOME_USER_SEND_EMAIL_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  userSendEmail,
  dismissUserSendEmailError,
  reducer,
} from 'src/features/home/redux/userSendEmail';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/userSendEmail', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when userSendEmail succeeds', () => {
    const store = mockStore({});

    return store.dispatch(userSendEmail())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_USER_SEND_EMAIL_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_USER_SEND_EMAIL_SUCCESS);
      });
  });

  it('dispatches failure action when userSendEmail fails', () => {
    const store = mockStore({});

    return store.dispatch(userSendEmail({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_USER_SEND_EMAIL_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_USER_SEND_EMAIL_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissUserSendEmailError', () => {
    const expectedAction = {
      type: HOME_USER_SEND_EMAIL_DISMISS_ERROR,
    };
    expect(dismissUserSendEmailError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_USER_SEND_EMAIL_BEGIN correctly', () => {
    const prevState = { userSendEmailPending: false };
    const state = reducer(
      prevState,
      { type: HOME_USER_SEND_EMAIL_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.userSendEmailPending).to.be.true;
  });

  it('handles action type HOME_USER_SEND_EMAIL_SUCCESS correctly', () => {
    const prevState = { userSendEmailPending: true };
    const state = reducer(
      prevState,
      { type: HOME_USER_SEND_EMAIL_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.userSendEmailPending).to.be.false;
  });

  it('handles action type HOME_USER_SEND_EMAIL_FAILURE correctly', () => {
    const prevState = { userSendEmailPending: true };
    const state = reducer(
      prevState,
      { type: HOME_USER_SEND_EMAIL_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.userSendEmailPending).to.be.false;
    expect(state.userSendEmailError).to.exist;
  });

  it('handles action type HOME_USER_SEND_EMAIL_DISMISS_ERROR correctly', () => {
    const prevState = { userSendEmailError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_USER_SEND_EMAIL_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.userSendEmailError).to.be.null;
  });
});
