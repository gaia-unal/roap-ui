import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_GET_LEARNING_OBJECT_FILES_BEGIN,
  HOME_GET_LEARNING_OBJECT_FILES_SUCCESS,
  HOME_GET_LEARNING_OBJECT_FILES_FAILURE,
  HOME_GET_LEARNING_OBJECT_FILES_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  getLearningObjectFiles,
  dismissGetLearningObjectFilesError,
  reducer,
} from 'src/features/home/redux/getLearningObjectFiles';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getLearningObjectFiles', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getLearningObjectFiles succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getLearningObjectFiles())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_GET_LEARNING_OBJECT_FILES_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_GET_LEARNING_OBJECT_FILES_SUCCESS);
      });
  });

  it('dispatches failure action when getLearningObjectFiles fails', () => {
    const store = mockStore({});

    return store.dispatch(getLearningObjectFiles({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_GET_LEARNING_OBJECT_FILES_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_GET_LEARNING_OBJECT_FILES_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetLearningObjectFilesError', () => {
    const expectedAction = {
      type: HOME_GET_LEARNING_OBJECT_FILES_DISMISS_ERROR,
    };
    expect(dismissGetLearningObjectFilesError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_GET_LEARNING_OBJECT_FILES_BEGIN correctly', () => {
    const prevState = { getLearningObjectFilesPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_LEARNING_OBJECT_FILES_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getLearningObjectFilesPending).to.be.true;
  });

  it('handles action type HOME_GET_LEARNING_OBJECT_FILES_SUCCESS correctly', () => {
    const prevState = { getLearningObjectFilesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_LEARNING_OBJECT_FILES_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getLearningObjectFilesPending).to.be.false;
  });

  it('handles action type HOME_GET_LEARNING_OBJECT_FILES_FAILURE correctly', () => {
    const prevState = { getLearningObjectFilesPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_LEARNING_OBJECT_FILES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getLearningObjectFilesPending).to.be.false;
    expect(state.getLearningObjectFilesError).to.exist;
  });

  it('handles action type HOME_GET_LEARNING_OBJECT_FILES_DISMISS_ERROR correctly', () => {
    const prevState = { getLearningObjectFilesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_LEARNING_OBJECT_FILES_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getLearningObjectFilesError).to.be.null;
  });
});
