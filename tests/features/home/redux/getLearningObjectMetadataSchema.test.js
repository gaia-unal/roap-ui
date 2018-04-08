import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_GET_LEARNING_OBJECT_METADATA_SCHEMA_BEGIN,
  HOME_GET_LEARNING_OBJECT_METADATA_SCHEMA_SUCCESS,
  HOME_GET_LEARNING_OBJECT_METADATA_SCHEMA_FAILURE,
  HOME_GET_LEARNING_OBJECT_METADATA_SCHEMA_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  getLearningObjectMetadataSchema,
  dismissGetLearningObjectMetadataSchemaError,
  reducer,
} from 'src/features/home/redux/getLearningObjectMetadataSchema';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getLearningObjectMetadataSchema', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getLearningObjectMetadataSchema succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getLearningObjectMetadataSchema())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_GET_LEARNING_OBJECT_METADATA_SCHEMA_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_GET_LEARNING_OBJECT_METADATA_SCHEMA_SUCCESS);
      });
  });

  it('dispatches failure action when getLearningObjectMetadataSchema fails', () => {
    const store = mockStore({});

    return store.dispatch(getLearningObjectMetadataSchema({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_GET_LEARNING_OBJECT_METADATA_SCHEMA_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_GET_LEARNING_OBJECT_METADATA_SCHEMA_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetLearningObjectMetadataSchemaError', () => {
    const expectedAction = {
      type: HOME_GET_LEARNING_OBJECT_METADATA_SCHEMA_DISMISS_ERROR,
    };
    expect(dismissGetLearningObjectMetadataSchemaError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_GET_LEARNING_OBJECT_METADATA_SCHEMA_BEGIN correctly', () => {
    const prevState = { getLearningObjectMetadataSchemaPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_LEARNING_OBJECT_METADATA_SCHEMA_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getLearningObjectMetadataSchemaPending).to.be.true;
  });

  it('handles action type HOME_GET_LEARNING_OBJECT_METADATA_SCHEMA_SUCCESS correctly', () => {
    const prevState = { getLearningObjectMetadataSchemaPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_LEARNING_OBJECT_METADATA_SCHEMA_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getLearningObjectMetadataSchemaPending).to.be.false;
  });

  it('handles action type HOME_GET_LEARNING_OBJECT_METADATA_SCHEMA_FAILURE correctly', () => {
    const prevState = { getLearningObjectMetadataSchemaPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_LEARNING_OBJECT_METADATA_SCHEMA_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getLearningObjectMetadataSchemaPending).to.be.false;
    expect(state.getLearningObjectMetadataSchemaError).to.exist;
  });

  it('handles action type HOME_GET_LEARNING_OBJECT_METADATA_SCHEMA_DISMISS_ERROR correctly', () => {
    const prevState = { getLearningObjectMetadataSchemaError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_LEARNING_OBJECT_METADATA_SCHEMA_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getLearningObjectMetadataSchemaError).to.be.null;
  });
});
