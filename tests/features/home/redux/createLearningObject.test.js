import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_CREATE_LEARNING_OBJECT_BEGIN,
  HOME_CREATE_LEARNING_OBJECT_SUCCESS,
  HOME_CREATE_LEARNING_OBJECT_FAILURE,
  HOME_CREATE_LEARNING_OBJECT_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  createLearningObject,
  dismissCreateLearningObjectError,
  reducer,
} from 'src/features/home/redux/createLearningObject';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/createLearningObject', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when createLearningObject succeeds', () => {
    const store = mockStore({});

    return store.dispatch(createLearningObject())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_CREATE_LEARNING_OBJECT_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_CREATE_LEARNING_OBJECT_SUCCESS);
      });
  });

  it('dispatches failure action when createLearningObject fails', () => {
    const store = mockStore({});

    return store.dispatch(createLearningObject({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_CREATE_LEARNING_OBJECT_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_CREATE_LEARNING_OBJECT_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissCreateLearningObjectError', () => {
    const expectedAction = {
      type: HOME_CREATE_LEARNING_OBJECT_DISMISS_ERROR,
    };
    expect(dismissCreateLearningObjectError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_CREATE_LEARNING_OBJECT_BEGIN correctly', () => {
    const prevState = { createLearningObjectPending: false };
    const state = reducer(
      prevState,
      { type: HOME_CREATE_LEARNING_OBJECT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createLearningObjectPending).to.be.true;
  });

  it('handles action type HOME_CREATE_LEARNING_OBJECT_SUCCESS correctly', () => {
    const prevState = { createLearningObjectPending: true };
    const state = reducer(
      prevState,
      { type: HOME_CREATE_LEARNING_OBJECT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createLearningObjectPending).to.be.false;
  });

  it('handles action type HOME_CREATE_LEARNING_OBJECT_FAILURE correctly', () => {
    const prevState = { createLearningObjectPending: true };
    const state = reducer(
      prevState,
      { type: HOME_CREATE_LEARNING_OBJECT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createLearningObjectPending).to.be.false;
    expect(state.createLearningObjectError).to.exist;
  });

  it('handles action type HOME_CREATE_LEARNING_OBJECT_DISMISS_ERROR correctly', () => {
    const prevState = { createLearningObjectError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_CREATE_LEARNING_OBJECT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createLearningObjectError).to.be.null;
  });
});
