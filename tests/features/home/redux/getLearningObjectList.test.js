import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_GET_LEARNING_OBJECT_LIST_BEGIN,
  HOME_GET_LEARNING_OBJECT_LIST_SUCCESS,
  HOME_GET_LEARNING_OBJECT_LIST_FAILURE,
  HOME_GET_LEARNING_OBJECT_LIST_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  getLearningObjectList,
  dismissGetLearningObjectListError,
  reducer,
} from 'src/features/home/redux/getLearningObjectList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getLearningObjectList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getLearningObjectList succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getLearningObjectList())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_GET_LEARNING_OBJECT_LIST_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_GET_LEARNING_OBJECT_LIST_SUCCESS);
      });
  });

  it('dispatches failure action when getLearningObjectList fails', () => {
    const store = mockStore({});

    return store.dispatch(getLearningObjectList({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_GET_LEARNING_OBJECT_LIST_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_GET_LEARNING_OBJECT_LIST_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetLearningObjectListError', () => {
    const expectedAction = {
      type: HOME_GET_LEARNING_OBJECT_LIST_DISMISS_ERROR,
    };
    expect(dismissGetLearningObjectListError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_GET_LEARNING_OBJECT_LIST_BEGIN correctly', () => {
    const prevState = { getLearningObjectListPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_LEARNING_OBJECT_LIST_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getLearningObjectListPending).to.be.true;
  });

  it('handles action type HOME_GET_LEARNING_OBJECT_LIST_SUCCESS correctly', () => {
    const prevState = { getLearningObjectListPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_LEARNING_OBJECT_LIST_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getLearningObjectListPending).to.be.false;
  });

  it('handles action type HOME_GET_LEARNING_OBJECT_LIST_FAILURE correctly', () => {
    const prevState = { getLearningObjectListPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_LEARNING_OBJECT_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getLearningObjectListPending).to.be.false;
    expect(state.getLearningObjectListError).to.exist;
  });

  it('handles action type HOME_GET_LEARNING_OBJECT_LIST_DISMISS_ERROR correctly', () => {
    const prevState = { getLearningObjectListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_LEARNING_OBJECT_LIST_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getLearningObjectListError).to.be.null;
  });
});
